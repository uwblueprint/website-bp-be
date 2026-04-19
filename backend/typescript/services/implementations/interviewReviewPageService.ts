import { InterviewedApplicantDTO, UserDTO } from "../../types";
import IInterviewReviewPageService from "../interfaces/IInterviewReviewPageService";
import InterviewDelegation from "../../models/interviewDelegation.model";
import InterviewedApplicantRecord from "../../models/interviewedApplicantRecord.model";
import User from "../../models/user.model";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";

const Logger = logger(__filename);

function toInterviewedApplicantDTO(
  model: InterviewedApplicantRecord,
): InterviewedApplicantDTO {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  return {
    applicantRecordId: model.applicantRecordId,
    firstName: model.applicantRecord!.applicant!.firstName,
    lastName: model.applicantRecord!.applicant!.lastName,
  };
}

function toInterviewerDTO(model: User): UserDTO {
  return {
    id: String(model.id),
    firstName: model.first_name,
    lastName: model.last_name,
    email: model.email,
    role: model.role,
    position: model.position ?? undefined,
    profilePictureFileId: model.profilePictureFileId ?? undefined,
  };
}

class InterviewReviewPageService implements IInterviewReviewPageService {
  /* eslint-disable class-methods-use-this */
  async getInterviewedApplicantsByGroupId(
    groupId: string,
  ): Promise<InterviewedApplicantDTO[]> {
    try {
      const delegations = await InterviewDelegation.findAll({
        where: { groupId },
        include: [
          {
            association: "interviewedApplicantRecord",
            include: [
              {
                association: "applicantRecord",
                include: [{ association: "applicant" }],
              },
            ],
          },
        ],
      });

      const unique = Array.from(
        new Map(
          delegations
            .map((d) => d.interviewedApplicantRecord)
            .filter((r): r is InterviewedApplicantRecord => r !== undefined)
            .map((r) => [r.id, r]),
        ).values(),
      );

      return unique.map(toInterviewedApplicantDTO);
    } catch (error: unknown) {
      Logger.error(
        `Failed to fetch applicants by group. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async getInterviewersByGroupId(groupId: string): Promise<UserDTO[]> {
    try {
      const delegations = await InterviewDelegation.findAll({
        where: { groupId },
        include: [{ association: "interviewer" }],
      });

      const unique = Array.from(
        new Map(
          delegations
            .map((d) => d.interviewer)
            .filter((u): u is User => u !== undefined)
            .map((u) => [u.id, u]),
        ).values(),
      );

      return unique.map(toInterviewerDTO);
    } catch (error: unknown) {
      Logger.error(
        `Failed to fetch interviewers by group. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }
}

export default InterviewReviewPageService;
