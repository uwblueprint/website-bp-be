import { Op } from "sequelize";
import User from "../../models/user.model";
import InterviewedApplicantRecord from "../../models/interviewedApplicantRecord.model";
import {
  CreateInterviewDelegationDTO,
  InterviewDelegationDTO,
  InterviewGroupStatusEnum,
} from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import IInterviewDashboardServices from "../interfaces/IInterviewDashboardServices";
import InterviewDelegationsService from "./interviewDelegationsService";
import IInterviewDelegationsService from "../interfaces/IInterviewDelegationsService";
import InterviewGroupService from "./interviewGroupService";
import IInterviewGroupService from "../interfaces/IInterviewGroupService";

const Logger = logger(__filename);

const interviewDelegationsService: IInterviewDelegationsService =
  new InterviewDelegationsService();

const interviewGroupService: IInterviewGroupService =
  new InterviewGroupService();

type InterviewerPool = {
  nextIndex: number;
  interviewerIds: number[];
  groupIds: string[];
};

class InterviewDashboardServices implements IInterviewDashboardServices {
  /* eslint-disable class-methods-use-this */
  async delegateInterviewers(
    positions: string[],
  ): Promise<InterviewDelegationDTO[]> {
    try {
      // 1. Fetch users and group IDs by position
      const users = await User.findAll({
        attributes: ["id", "position"],
        where: { position: { [Op.in]: positions } },
      });

      const interviewerIdsByPosition: Record<string, number[]> = users.reduce<
        Record<string, number[]>
      >((acc, user) => {
        if (user.position) {
          (acc[user.position] ??= []).push(user.id);
        }
        return acc;
      }, {});

      // Validate every requested position has at least one interviewer
      positions.forEach((position) => {
        if (!interviewerIdsByPosition[position]?.length) {
          throw new Error(`No users found for position ${position}`);
        }
      });

      // 2. Create one interview group per interviewer pair
      const pairsPerPosition: Record<string, number> = Object.fromEntries(
        positions.map((position) => [
          position,
          Math.ceil(interviewerIdsByPosition[position].length / 2),
        ]),
      );

      const totalGroups = Object.values(pairsPerPosition).reduce(
        (sum, n) => sum + n,
        0,
      );
      const createdGroups =
        await interviewGroupService.bulkCreateInterviewGroups(
          Array.from({ length: totalGroups }, () => ({
            status: InterviewGroupStatusEnum.AVAILABILITY_PENDING,
          })),
        );

      // Slice created groups into per-position pools
      // bulkCreateInterviewGroups returns a flat array, so we use a running
      // offset to slice each position's share of groups out of that array.
      const pools: Record<string, InterviewerPool> = positions.reduce<{
        offset: number;
        result: Record<string, InterviewerPool>;
      }>(
        ({ offset, result }, position) => {
          const numPairs = pairsPerPosition[position];
          return {
            offset: offset + numPairs,
            result: {
              ...result,
              [position]: {
                nextIndex: 0,
                interviewerIds: interviewerIdsByPosition[position],
                groupIds: createdGroups
                  .slice(offset, offset + numPairs)
                  .map((g) => g.id),
              },
            },
          };
        },
        { offset: 0, result: {} },
      ).result;

      // 3. Round-robin assign applicants to interviewer pairs
      const interviewedApplicantRecords =
        await InterviewedApplicantRecord.findAll({
          attributes: ["id"],
          include: [
            {
              association: "applicantRecord",
              attributes: ["position"],
              where: { position: { [Op.in]: positions } },
            },
          ],
        });

      const delegations: CreateInterviewDelegationDTO[] =
        interviewedApplicantRecords
          .filter(
            (
              record,
            ): record is typeof record & {
              applicantRecord: { position: string };
            } => !!record.applicantRecord?.position,
          )
          .flatMap((record) => {
            const { position } = record.applicantRecord;
            const pool = pools[position];
            const { interviewerIds, groupIds } = pool;
            const pairIndex = Math.floor(pool.nextIndex / 2) % groupIds.length;
            const groupId = groupIds[pairIndex];

            const first: CreateInterviewDelegationDTO = {
              interviewedApplicantRecordId: record.id,
              interviewerId: interviewerIds[pool.nextIndex],
              groupId,
            };
            pool.nextIndex = (pool.nextIndex + 1) % interviewerIds.length;

            if (interviewerIds.length <= 1) {
              return [first];
            }

            // Assign second interviewer
            const second: CreateInterviewDelegationDTO = {
              interviewedApplicantRecordId: record.id,
              interviewerId: interviewerIds[pool.nextIndex],
              groupId,
            };
            pool.nextIndex = (pool.nextIndex + 1) % interviewerIds.length;

            return [first, second];
          });

      // 4. Persist
      return await interviewDelegationsService.bulkCreateInterviewDelegations(
        delegations,
      );
    } catch (error: unknown) {
      Logger.error(
        `Failed to delegate interviewers. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default InterviewDashboardServices;
