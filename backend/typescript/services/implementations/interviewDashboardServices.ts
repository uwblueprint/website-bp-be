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

type InterviewerPair = [number] | [number, number];

function buildPairs(ids: number[]): InterviewerPair[] {
  const pairs: InterviewerPair[] = [];
  for (let i = 0; i < ids.length; i += 2) {
    if (i + 1 < ids.length) {
      pairs.push([ids[i], ids[i + 1]]);
    } else if (ids.length > 1) {
      // Odd count: wrap last interviewer with the first so no one is solo
      pairs.push([ids[i], ids[0]]);
    } else {
      pairs.push([ids[i]]);
    }
  }
  return pairs;
}

class InterviewDashboardServices implements IInterviewDashboardServices {
  /* eslint-disable class-methods-use-this */
  async delegateInterviewers(
    positions: string[],
  ): Promise<InterviewDelegationDTO[]> {
    try {
      // 1. Fetch users by position
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

      positions.forEach((position) => {
        if (!interviewerIdsByPosition[position]?.length) {
          throw new Error(`No users found for position ${position}`);
        }
      });

      // 2. Build static pairs per position, one group per pair
      const pairsByPosition: Record<string, InterviewerPair[]> =
        Object.fromEntries(
          positions.map((position) => [
            position,
            buildPairs(interviewerIdsByPosition[position]),
          ]),
        );

      const totalGroups = positions.reduce(
        (sum, position) => sum + pairsByPosition[position].length,
        0,
      );
      const createdGroups =
        await interviewGroupService.bulkCreateInterviewGroups(
          Array.from({ length: totalGroups }, () => ({
            status: InterviewGroupStatusEnum.AVAILABILITY_PENDING,
          })),
        );

      const groupIdsByPosition: Record<string, string[]> = positions.reduce<{
        offset: number;
        result: Record<string, string[]>;
      }>(
        ({ offset, result }, position) => {
          const numPairs = pairsByPosition[position].length;
          return {
            offset: offset + numPairs,
            result: {
              ...result,
              [position]: createdGroups
                .slice(offset, offset + numPairs)
                .map((g) => g.id),
            },
          };
        },
        { offset: 0, result: {} },
      ).result;

      // 3. Round-robin applicants across pairs
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

      const counterByPosition: Record<string, number> = Object.fromEntries(
        positions.map((p) => [p, 0]),
      );

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
            const pairs = pairsByPosition[position];
            const groupIds = groupIdsByPosition[position];
            const pairIndex = counterByPosition[position] % pairs.length;
            counterByPosition[position] += 1;

            return pairs[pairIndex].map((interviewerId) => ({
              interviewedApplicantRecordId: record.id,
              interviewerId,
              groupId: groupIds[pairIndex],
            }));
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
