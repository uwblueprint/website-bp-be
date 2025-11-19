import { ReviewedApplicantRecordDTO, ReviewStatus } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import ReviewedApplicantRecord from "../../models/reviewedApplicantRecord.model";
import IReviewedApplicantRecordService from "../interfaces/reviewedApplicantRecordService";

const Logger = logger(__filename);

class ReviewedApplicantRecordService implements IReviewedApplicantRecordService {
  /* eslint-disable class-methods-use-this */

  async updateReviewStatus(
    applicantRecordId: string,
    reviewerId: number,
    status: ReviewStatus
  ): Promise<ReviewedApplicantRecordDTO> {
    const applicantRecord = await ReviewedApplicantRecord.findOne({
      where: { applicantRecordId, reviewerId },
    });
    if (!applicantRecord) {
      throw new Error(
        `ReviewedApplicantRecord with applicantRecordId ${applicantRecordId} and reviewerId ${reviewerId} not found.`
      );
    }
    try {
      applicantRecord.status = status;
      await applicantRecord.save();
      return {
        applicantRecordId: applicantRecord.applicantRecordId,
        reviewerId: applicantRecord.reviewerId,
        review: applicantRecord.review,
        status: applicantRecord.status,
        score: applicantRecord.score,
        reviewerHasConflict: applicantRecord.reviewerHasConflict,
      };
    } catch (error: unknown) {
      Logger.error(
        `Failed to update review status. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default ReviewedApplicantRecordService;
