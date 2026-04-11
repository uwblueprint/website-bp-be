import { InterviewedApplicantDTO } from "../../types";
import IInterviewReviewPageService from "../interfaces/IInterviewReviewPageService";
import InterviewDelegation from "../../models/interviewDelegation.model";
import InterviewedApplicantRecord from "../../models/interviewedApplicantRecord.model";
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
}

export default InterviewReviewPageService;
