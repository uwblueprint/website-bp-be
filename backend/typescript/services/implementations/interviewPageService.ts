import { Op } from "sequelize";
import Applicant from "../../models/applicant.model";
import ApplicantRecord from "../../models/applicantRecord.model";
import InterviewDelegation from "../../models/interviewDelegation.model";
import InterviewedApplicantRecord from "../../models/interviewedApplicantRecord.model";
import InterviewGroup from "../../models/interviewGroup.model";
import User from "../../models/user.model";
import {
  InterviewedApplicantsDTO,
  InterviewPairingsDTO,
  UserDTO,
} from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import IInterviewPageService from "../interfaces/IInterviewPageService";

const Logger = logger(__filename);

function toUserDTO(model: User): UserDTO {
  return {
    id: String(model.id),
    firstName: model.first_name,
    lastName: model.last_name,
    email: model.email,
    position: model.position,
    role: model.role,
  };
}

class InterviewPageService implements IInterviewPageService {
  /* eslint-disable class-methods-use-this */

  async getInterviewedApplicantsByUserId(
    userId: number,
  ): Promise<InterviewedApplicantsDTO[]> {
    try {
      const assignedDelegations = await InterviewDelegation.findAll({
        where: { interviewerId: userId },
        include: [
          {
            model: InterviewedApplicantRecord,
            attributes: ["applicantRecordId", "status"],
            include: [
              {
                model: ApplicantRecord,
                include: [
                  {
                    model: Applicant,
                    attributes: ["firstName", "lastName"],
                  },
                ],
              },
            ],
          },
        ],
      });

      return assignedDelegations.map((delegation) => {
        const { applicantRecordId, status: interviewStatus } =
          delegation.interviewedApplicantRecord;

        const { firstName: applicantFirstName, lastName: applicantLastName } =
          delegation.interviewedApplicantRecord.applicantRecord.applicant;
        return {
          applicantRecordId,
          interviewStatus,
          applicantFirstName,
          applicantLastName,
        };
      });
    } catch (error: unknown) {
      Logger.error(`Failed to fetch. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async getInterviewedPairingsByUserId(
    userId: number,
  ): Promise<InterviewPairingsDTO[]> {
    try {
      const userGroupRows = await InterviewDelegation.findAll({
        where: { interviewerId: userId },
        attributes: ["groupId"],
      });

      if (userGroupRows.length === 0) {
        return [];
      }

      // dedupe groupIds, although each groupId should have a unique set of interviewers, the database design does not guarantee this.
      const groupIds = [...new Set(userGroupRows.map((row) => row.groupId))];

      const interviewGroups = await InterviewGroup.findAll({
        where: { id: { [Op.in]: groupIds } },
        attributes: ["id", "status"],
        include: [
          {
            model: InterviewDelegation,
            required: true,
            include: [{ model: User }],
          },
        ],
      });

      return interviewGroups.map((group) => ({
        interviewedGroupId: group.id,
        interviewGroupStatus: group.status,
        groupMembers: (group.interviewDelegations ?? []).map((d) =>
          toUserDTO(d.interviewer),
        ),
      }));
    } catch (error: unknown) {
      Logger.error(`Failed to fetch. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async getInterviewersByGroupId(groupId: string): Promise<UserDTO[]> {
    try {
      const delegations = await InterviewDelegation.findAll({
        where: { groupId },
        include: {
          model: User,
          as: "interviewer",
        },
      });

      const interviewers = delegations.map(
        (delegation) => delegation.interviewer,
      );
      if (interviewers.length === 0) {
        return [];
      }

      const uniqueByInterviewerId = new Set<number>();
      const uniqueInterviewers = interviewers.filter((interviewer) => {
        if (uniqueByInterviewerId.has(interviewer.id)) {
          return false;
        }
        uniqueByInterviewerId.add(interviewer.id);
        return true;
      });

      return uniqueInterviewers.map((interviewer) => toUserDTO(interviewer));
    } catch (error: unknown) {
      Logger.error(
        `Failed to get interview delegations by groupId. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }
}

export default InterviewPageService;
