import { ApplicationDTO } from "../../types";
import IReviewPageService from "../interfaces/IReviewPageService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import ApplicantRecord from "../../models/applicantRecord.model";
import ReviewedApplicantRecord from "../../models/reviewedApplicantRecord.model";
import Applicant from "../../models/applicant.model";

const Logger = logger(__filename);

function toDTO(model: Applicant): ApplicationDTO {
  const firstChoice = model.applicantRecords!.find((ar) => ar.choice === 1);
  const secondChoice = model.applicantRecords!.find((ar) => ar.choice === 2);

  return {
    id: model.id,
    academicOrCoop: model.academicOrCoop,
    academicYear: model.academicYear,
    email: model.email,
    firstChoiceRole: firstChoice!.position,
    firstName: model.firstName,
    lastName: model.lastName,
    heardFrom: model.heardFrom,
    locationPreference: model.locationPreference,
    program: model.program,
    timesApplied: model.timesApplied.toString(),
    pronouns: model.pronouns,
    pronounsSpecified: model.pronouns,
    resumeUrl: model.resumeUrl,
    roleSpecificQuestions: firstChoice!.roleSpecificQuestions,
    secondChoiceRole: secondChoice ? secondChoice.position : "",
    shortAnswerQuestions: model.shortAnswerQuestions,
    status: firstChoice!.status,
    term: model.term,
    secondChoiceStatus: secondChoice ? secondChoice.status : "",
    /* timestamp: model.submittedAt.getSeconds(), */
  };
}

class ReviewPageService implements IReviewPageService {
  /* eslint-disable class-methods-use-this */
  async getReviewPage(
    reviewedApplicantRecordId: string,
  ): Promise<ApplicationDTO> {
    try {
      const applicantRecord: ApplicantRecord | null =
        await ApplicantRecord.findOne({
          where: { id: reviewedApplicantRecordId },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });
      if (!applicantRecord)
        throw new Error(`Database integrity has been violated`);

      const applicant: Applicant | null = await Applicant.findOne({
        where: { id: applicantRecord.applicantId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            attributes: { exclude: ["createdAt", "updatedAt"] },
            association: "applicantRecords",
          },
        ],
      });
      if (!applicant) throw new Error(`Database integrity has been violated`);

      return toDTO(applicant);
    } catch (error: unknown) {
      Logger.error(`Failed to fetch. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }
}

export default ReviewPageService;
