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
    pronounsSpecified: "",
    resumeUrl: model.resumeUrl,
    roleSpecificQuestions: firstChoice!.roleSpecificQuestions,
    secondChoiceRole: secondChoice ? secondChoice.position : "",
    shortAnswerQuestions: model.shortAnswerQuestions,
    status: firstChoice!.status,
    term: model.term,
    secondChoiceStatus: secondChoice ? secondChoice.status : "",
    timestamp: BigInt(1728673405),
  };
}

class ReviewPageService implements IReviewPageService {
  /* eslint-disable class-methods-use-this */
  async getReviewPage(
    reviewedApplicantRecordId: number,
  ): Promise<ApplicationDTO[]> {
    try {
      // get applicant ids first
      const rARs: Array<ReviewedApplicantRecord> =
        await ReviewedApplicantRecord.findAll({
          where: { applicantRecordId: reviewedApplicantRecordId },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });
      if (rARs.length === 0)
        throw new Error(
          `ReviewedApplicantRecords with ID ${reviewedApplicantRecordId} not found.`,
        );

      const aRIds: Array<number> = [
        ...new Set(rARs.map((r) => r.applicantRecordId)),
      ];
      const aRs: Array<ApplicantRecord> = await ApplicantRecord.findAll({
        where: { id: aRIds },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (aRs.length === 0)
        throw new Error(`Database integrity has been violated`);

      const aIds: Array<number> = [...new Set(aRs.map((a) => a.applicantId))];
      const as: Array<Applicant> = await Applicant.findAll({
        where: { id: aIds },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            attributes: { exclude: ["createdAt", "updatedAt"] },
            association: "applicantRecords",
          },
        ],
      });
      if (as.length === 0)
        throw new Error(`Database integrity has been violated`);

      return as.map(toDTO);
    } catch (error: unknown) {
      Logger.error(`Failed to fetch. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }
}

export default ReviewPageService;
