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
import IInterviewDashboardService from "../interfaces/IInterviewDasboardService";
import InterviewDelegationsService from "./interviewDelegationsService";
import IInterviewDelegationsService from "../interfaces/IInterviewDelegationsService";
import InterviewGroupService from "./interviewGroupService";
import IInterviewGroupService from "../interfaces/IInterviewGroupService";

const Logger = logger(__filename);

const interviewDelegationsService: IInterviewDelegationsService =
  new InterviewDelegationsService();

const interviewGroupService: IInterviewGroupService =
  new InterviewGroupService();

type InterviewerAssignment = {
  interviewedApplicantRecordId: string;
  interviewer1?: number;
  interviewer2?: number;
};

/** Assign a unique key to each interviewer group - this should be indifferent to ordering of the interviewers. */
function interviewerTeamKey(a: InterviewerAssignment): string {
  const ids = [a.interviewer1, a.interviewer2].filter(
    (x): x is number => x !== undefined,
  );
  if (ids.length === 0) {
    throw new Error("No interviewers assigned to this interviewed applicant record.");
  }
  if (ids.length === 1) {
    return `solo:${ids[0]}`;
  }

  // Order the interviewers so that the smaller ID is first.
  const [x, y] = ids[0] <= ids[1] ? [ids[0], ids[1]] : [ids[1], ids[0]];
  return `pair:${x}|${y}`;
}

class InterviewDashboardServices implements IInterviewDashboardService {
  /* eslint-disable class-methods-use-this */
  /**
   * Assignment logic matches {@link ReviewDashboardService.delegateReviewers}:
   * per position, circular user list with `undefined` sentinel when count is odd;
   * each record consumes two consecutive FSM slots for its two interviewers.
   * Interview groups are deduped by interviewer team so identical pairs share `groupId`.
   */
  async delegateInterviewers(
    positions: string[],
  ): Promise<InterviewDelegationDTO[]> {
    try {

      // Get all users by position.
      const groups = (
        await User.findAll({
          attributes: { exclude: ["createdAt", "updatedAt"] },
          where: { position: { [Op.in]: positions } },
        })
      ).reduce((map, user) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const pos = user.position!;
        const arr = map.get(pos) ?? [];
        arr.push(user.id);
        map.set(pos, arr);
        return map;
      }, new Map<string, number[]>());

      // Build the FSM.
      const FSM = new Map<string, [number, (number | undefined)[]]>(
        positions.map((title) => [title, [0, groups.get(title) ?? []]]),
      );

      Array.from(FSM.entries()).forEach(([title, [, userIds]]) => {
        if (userIds.length === 0) {
          throw new Error(`Invalid amount of users with position ${title}.`);
        }
        if (userIds.length % 2 !== 0) {
          userIds.push(undefined);
        }
      });

      // Get all interviewer assignments for the given positions.
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

      
      // Round robin the interviewers for each interviewed applicant record.
      const assignments: InterviewerAssignment[] = [];

      interviewedApplicantRecords.forEach((record) => {
        const position = record.applicantRecord?.position;
        if (!position || !FSM.has(position)) {
          return;
        }

        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        const [count, userIds] = FSM.get(position)!;
        let newCount = count;
        const assigned1 = FSM.get(position)![1][newCount];
        newCount++;
        newCount %= FSM.get(position)![1].length;
        const assigned2 = FSM.get(position)![1][newCount];
        newCount++;
        newCount %= FSM.get(position)![1].length;
        FSM.set(position, [newCount, userIds]);

        if (assigned1 === undefined && assigned2 === undefined) {
          return;
        }

        assignments.push({
          interviewedApplicantRecordId: record.id,
          interviewer1: assigned1,
          interviewer2: assigned2,
        });
      });

      if (assignments.length === 0) {
        return [];
      }

      // Dedupe the team keys to avoid creating duplicate interview groups.
      const dedupedTeamKeys = [...new Set(assignments.map(interviewerTeamKey))];

      // Create the interview groups.
      const createdGroups =
        await interviewGroupService.bulkCreateInterviewGroups(
          dedupedTeamKeys.map(() => ({
            status: InterviewGroupStatusEnum.AVAILABILITY_PENDING,
          })),
        );

      // Map delegated assignments to a singular group ID.
      const groupIdByTeamKey = dedupedTeamKeys.reduce<Record<string, string>>(
        (acc, teamKey, i) => {
          acc[teamKey] = createdGroups[i].id;
          return acc;
        },
        {},
      );

      // Create the interview delegations.
      const delegations: CreateInterviewDelegationDTO[] =
        assignments.flatMap((a) => {
          const groupId = groupIdByTeamKey[interviewerTeamKey(a)];
          const row: CreateInterviewDelegationDTO[] = [];
          if (a.interviewer1 !== undefined) {
            row.push({
              interviewedApplicantRecordId: a.interviewedApplicantRecordId,
              interviewerId: a.interviewer1,
              groupId,
            });
          }
          if (a.interviewer2 !== undefined) {
            row.push({
              interviewedApplicantRecordId: a.interviewedApplicantRecordId,
              interviewerId: a.interviewer2,
              groupId,
            });
          }
          return row;
        });

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
