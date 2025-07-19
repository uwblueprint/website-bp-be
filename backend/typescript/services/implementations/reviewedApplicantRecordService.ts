import ReviewedApplicantRecord from "../../models/reviewedApplicantRecord.model";
import {
  Review,
  ReviewedApplicantRecordDTO,
  ReviewedApplicantRecordPK,
  ReviewStatus,
  ReviewStatusEnum,
  SkillCategoryEnum,
} from "../../types";
import { IReviewedApplicantRecordService } from "../interfaces/reviewedApplicantRecordService";
import { sequelize } from "../../models";
import logger from "../../utilities/logger";
import { getErrorMessage } from "../../utilities/errorUtils";

const Logger = logger(__filename);

class ReviewedApplicantRecordService
  implements IReviewedApplicantRecordService
{
  createReviewedApplicantRecord = async (
    reviewedApplicantRecordPK: ReviewedApplicantRecordPK,
  ): Promise<ReviewedApplicantRecordDTO> => {
    const { reviewerId, applicantRecordId } = reviewedApplicantRecordPK;
    try {
      const createdRecord = await sequelize.transaction(async (transaction) =>
        ReviewedApplicantRecord.create(
          {
            reviewerId,
            applicantRecordId,
            status: ReviewStatusEnum.TODO,
          },
          { transaction },
        ),
      );

      return {
        applicantRecordId: createdRecord.applicantRecordId,
        reviewerId: createdRecord.reviewerId,
        review: createdRecord.review,
        status: createdRecord.status,
      } as ReviewedApplicantRecordDTO;
    } catch (error) {
      Logger.error(
        `Error in createReviewedApplicantRecord: ${getErrorMessage(error)}`,
      );
      throw error;
    }
  };

  bulkCreateReviewedApplicantRecords = async (
    reviewedApplicantRecordPKs: ReviewedApplicantRecordPK[],
  ): Promise<ReviewedApplicantRecordDTO[]> => {
    try {
      const recordsToCreate = reviewedApplicantRecordPKs.map(
        ({ reviewerId, applicantRecordId }) => ({
          reviewerId,
          applicantRecordId,
          status: ReviewStatusEnum.TODO,
        }),
      );

      const createdRecords = await sequelize.transaction(async (transaction) =>
        ReviewedApplicantRecord.bulkCreate(recordsToCreate, {
          transaction,
          returning: true,
        }),
      );

      return createdRecords.map(
        (record) =>
          ({
            applicantRecordId: record.applicantRecordId,
            reviewerId: record.reviewerId,
            review: record.review,
            status: record.status,
          } as ReviewedApplicantRecordDTO),
      );
    } catch (error) {
      Logger.error(
        `Error in bulkCreateReviewedApplicantRecords: ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  };

  updateReviewedApplicantRecordReview = async (
    reviewedApplicantRecordPK: ReviewedApplicantRecordPK,
    review: Review,
  ): Promise<ReviewedApplicantRecordDTO> => {
    const { reviewerId, applicantRecordId } = reviewedApplicantRecordPK;
    try {
      if (
        review.skillCategory &&
        !Object.values(SkillCategoryEnum).includes(
          review.skillCategory as SkillCategoryEnum,
        )
      ) {
        throw new Error("Review has invalid skill category");
      }

      const updatedReviewedApplicantRecord = await sequelize.transaction(
        async (transaction) => {
          const reviewedApplicantRecord = await ReviewedApplicantRecord.findOne(
            {
              where: { reviewerId, applicantRecordId },
              transaction,
            },
          );

          if (!reviewedApplicantRecord) {
            throw new Error(
              `Reviewed applicant record with reviewerId ${reviewerId} and applicantRecordId ${applicantRecordId} not found`,
            );
          }

          reviewedApplicantRecord.review = review;
          await reviewedApplicantRecord.save({ transaction });

          return {
            applicantRecordId: reviewedApplicantRecord.applicantRecordId,
            reviewerId: reviewedApplicantRecord.reviewerId,
            review: reviewedApplicantRecord.review,
            status: reviewedApplicantRecord.status,
          } as ReviewedApplicantRecordDTO;
        },
      );

      return updatedReviewedApplicantRecord;
    } catch (error) {
      Logger.error(
        `Unable to update the status of reviewed applicant record (reviewerId=${reviewerId}, applicantRecordId=${applicantRecordId}). Reason: ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  };

  updateReviewedApplicantRecordStatus = async (
    reviewedApplicantRecordPK: ReviewedApplicantRecordPK,
    status: ReviewStatus,
  ): Promise<ReviewedApplicantRecordDTO> => {
    const { reviewerId, applicantRecordId } = reviewedApplicantRecordPK;

    try {
      if (
        !Object.values(ReviewStatusEnum).includes(status as ReviewStatusEnum)
      ) {
        throw new Error("Invalid review status");
      }
      const updatedReviewedApplicantRecord = await sequelize.transaction(
        async (transaction) => {
          const reviewedApplicantRecord = await ReviewedApplicantRecord.findOne(
            {
              where: { reviewerId, applicantRecordId },
              transaction,
            },
          );

          if (!reviewedApplicantRecord) {
            throw new Error(
              `Reviewed applicant record with reviewerId ${reviewerId} and applicantRecordId ${applicantRecordId} not found`,
            );
          }

          reviewedApplicantRecord.status = status;
          await reviewedApplicantRecord.save({ transaction });

          return {
            applicantRecordId: reviewedApplicantRecord.applicantRecordId,
            reviewerId: reviewedApplicantRecord.reviewerId,
            review: reviewedApplicantRecord.review,
            status: reviewedApplicantRecord.status,
          } as ReviewedApplicantRecordDTO;
        },
      );

      return updatedReviewedApplicantRecord;
    } catch (error) {
      Logger.error(
        `Unable to update the status of reviewed applicant record (reviewerId=${reviewerId}, applicantRecordId=${applicantRecordId}). Reason: ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  };
}
export default ReviewedApplicantRecordService;
