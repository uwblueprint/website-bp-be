import { Op } from "sequelize";
import User from "../../models/user.model";
import InterviewedApplicantRecord from "../../models/interviewedApplicantRecord.model";
import {
  CreateInterviewDelegationDTO,
  InterviewDelegationDTO,
} from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import IInterviewDashboardServices from "../interfaces/IInterviewDashboardServices";
import InterviewDelegationsService from "./interviewDelegationsService";
import IInterviewDelegationsService from "../interfaces/IInterviewDelegationsService";

const Logger = logger(__filename);

const interviewDelegationsService: IInterviewDelegationsService =
  new InterviewDelegationsService();

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

      // 2. round robin via the FSM
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

        if (assignedReviewer1 !== undefined) {
          delegations.push({
            interviewedApplicantRecordId: record.id,
            interviewerId: assignedReviewer1,
          });
        }
        if (assignedReviewer2 !== undefined) {
          delegations.push({
            interviewedApplicantRecordId: record.id,
            interviewerId: assignedReviewer2,
          });
        }
      });

      // 3. persist the delegations

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
