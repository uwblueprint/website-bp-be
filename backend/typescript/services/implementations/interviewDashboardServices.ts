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

class InterviewDashboardServices implements IInterviewDashboardServices {
  /* eslint-disable class-methods-use-this */
  async delegateInterviewers(
    positions: string[],
  ): Promise<InterviewDelegationDTO[]> {
    try {
      const delegations = Array<CreateInterviewDelegationDTO>();

      // Get users and group by position
      const groups = (
        await User.findAll({
          attributes: { exclude: ["createdAt", "updatedAt"] },
          where: {
            position: {
              [Op.in]: positions,
            },
          },
        })
      ).reduce((map, user) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const pos = user.position!;
        const arr = map.get(pos) ?? [];
        arr.push(user.id);
        map.set(pos, arr);
        return map;
      }, new Map<string, number[]>());

      // 1. build the FSM
      const FSM = new Map<string, [number, (number | undefined)[]]>(
        positions.map((title) => [title, [0, groups.get(title) ?? []]]),
      );

      // validate fsm
      Array.from(FSM.entries()).forEach(([title, [, userIds]]) => {
        if (userIds.length === 0) {
          // no users with this position
          throw new Error(`No users found for position ${title}`);
        }
        if (userIds.length % 2 !== 0) {
          // sentinel value of undefined at the end
          userIds.push(undefined);
        }
      });

      // 2. create one interview group per interviewer pair (one per every 2 userIds per position)
      const groupCountsPerPosition = Array.from(FSM.entries()).map(
        ([position, [, userIds]]) => ({
          position,
          numPairs: Math.ceil(userIds.length / 2),
        }),
      );

      const createdGroups =
        await interviewGroupService.bulkCreateInterviewGroups(
          groupCountsPerPosition.flatMap(({ numPairs }) =>
            Array.from({ length: numPairs }, () => ({
              status: InterviewGroupStatusEnum.AVAILABILITY_PENDING,
            })),
          ),
        );

      // map each position to its slice of created group IDs
      const positionPairGroups = new Map<string, string[]>();
      let groupIdx = 0;
      groupCountsPerPosition.forEach(({ position, numPairs }) => {
        positionPairGroups.set(
          position,
          createdGroups.slice(groupIdx, groupIdx + numPairs).map((g) => g.id),
        );
        groupIdx += numPairs;
      });

      // 3. round robin via the FSM
      const interviewedApplicantRecords =
        await InterviewedApplicantRecord.findAll({
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              association: "applicantRecord",
              attributes: ["position"],
              where: {
                position: { [Op.in]: positions },
              },
            },
          ],
        });

      interviewedApplicantRecords.forEach((record) => {
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        const [count, userIds] = FSM.get(record.applicantRecord!.position)!;
        let newCount = count;

        const assignedReviewer1 = userIds[newCount];
        newCount++;
        newCount %= userIds.length;

        const assignedReviewer2 = userIds[newCount];
        newCount++;
        newCount %= userIds.length;

        FSM.set(record.applicantRecord!.position, [newCount, userIds]);

        const groupId = positionPairGroups.get(
          record.applicantRecord!.position,
        )![Math.floor(count / 2)];

        if (assignedReviewer1 !== undefined) {
          delegations.push({
            interviewedApplicantRecordId: record.id,
            interviewerId: assignedReviewer1,
            groupId,
          });
        }
        if (assignedReviewer2 !== undefined) {
          delegations.push({
            interviewedApplicantRecordId: record.id,
            interviewerId: assignedReviewer2,
            groupId,
          });
        }
      });

      // 4. persist the delegations

      const res =
        await interviewDelegationsService.bulkCreateInterviewDelegations(
          delegations,
        );
      return res;
    } catch (error: unknown) {
      Logger.error(
        `Failed to delegate interviewers. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default InterviewDashboardServices;
