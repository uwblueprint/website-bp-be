import { ApplicationDTO, ReviewedApplicantRecordDTO, ReviewedApplicantsDTO } from "../../types";
import IReviewPageService from "../interfaces/IReviewPageService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import ApplicantRecord from "../../models/applicantRecord.model";
import ReviewedApplicantRecord from "../../models/reviewedApplicantRecord.model";
import Applicant from "../../models/applicant.model";
import User from "../../models/user.model";

const Logger = logger(__filename);

function toApplicationDTO(model: Applicant): ApplicationDTO {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
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

function toReviewedApplicantsDTO(
  model: ReviewedApplicantRecord,
): ReviewedApplicantsDTO {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  return {
    applicantRecordId: model.applicantRecordId,
    reviewStatus: model.status,
    applicantFirstName: model.applicantRecord!.applicant!.firstName,
    applicantLastName: model.applicantRecord!.applicant!.lastName,
  };
}

function toReviewedApplicantRecordDTO(
  model: ReviewedApplicantRecord,
): ReviewedApplicantRecordDTO {
  return {
    applicantRecordId: model.applicantRecordId,
    reviewerId: model.reviewerId,
    review: model.review,
    status: model.status,
    reviewerHasConflict: model.reviewerHasConflict,
  };
}

class ReviewPageService implements IReviewPageService {
  /* eslint-disable class-methods-use-this */
  async getReviewPage(applicantRecordId: string): Promise<ApplicationDTO> {
    try {
      const applicantRecord: ApplicantRecord | null =
        await ApplicantRecord.findOne({
          where: { id: applicantRecordId },
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

      return toApplicationDTO(applicant);
    } catch (error: unknown) {
      Logger.error(`Failed to fetch. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async getReviewedApplicantsByUserId(
    userId: number,
  ): Promise<ReviewedApplicantsDTO[]> {
    try {
      const user: User | null = await User.findOne({
        where: { id: userId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            attributes: { exclude: ["createdAt", "updatedAt"] },
            association: "reviewedApplicantRecords",
            include: [
              {
                attributes: { exclude: ["createdAt", "updatedAt"] },
                association: "applicantRecord",
                include: [
                  {
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    association: "applicant",
                  },
                ],
              },
            ],
          },
        ],
      });
      if (!user) throw new Error(`No user with ${userId} found.`);
      if (!user.reviewedApplicantRecords) return [];
      return user.reviewedApplicantRecords.map(toReviewedApplicantsDTO);
    } catch (error: unknown) {
      Logger.error(`Failed to fetch. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async reportReviewConflict(applicantRecordId: string, reviewerId: number): Promise<ReviewedApplicantRecordDTO> {
    try {
      const reviewedApplicantRecord: ReviewedApplicantRecord | null = await ReviewedApplicantRecord.findOne({
        where: { applicantRecordId, reviewerId },
      });
      if (!reviewedApplicantRecord) throw new Error(`No reviewed applicant record with ${applicantRecordId} and ${reviewerId} found.`);
      reviewedApplicantRecord.reviewerHasConflict = true;
      await reviewedApplicantRecord.save();
      return toReviewedApplicantRecordDTO(reviewedApplicantRecord);
    }
    catch (error: unknown) {
      Logger.error(`Failed to report conflict. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }
}

export default ReviewPageService;
