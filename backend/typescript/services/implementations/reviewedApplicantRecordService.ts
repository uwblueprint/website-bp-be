import { sequelize } from "../../models";
import ReviewedApplicantRecord from "../../models/reviewedApplicantRecord.model";
import ApplicantRecord from "../../models/applicantRecord.model";
import {
  ReviewedApplicantRecordDTO,
  CreateReviewedApplicantRecordDTO,
  DeleteReviewedApplicantRecordDTO,
  UpdateReviewedApplicantRecordDTO,
} from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import IReviewApplicantRecordService from "../interfaces/IReviewedApplicantRecordService";

const Logger = logger(__filename);

class ReviewedApplicantRecordService implements IReviewApplicantRecordService {
  /* eslint-disable class-methods-use-this */
  async createReviewedApplicantRecord(
    dto: CreateReviewedApplicantRecordDTO,
  ): Promise<ReviewedApplicantRecordDTO> {
    try {
      const record = await ReviewedApplicantRecord.create(dto);
      return record.toJSON() as ReviewedApplicantRecordDTO;
    } catch (error: unknown) {
      Logger.error(
        `Failed to create reviewed applicant record. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async bulkCreateReviewedApplicantRecord(
    createReviewedApplicantRecordDTOs: CreateReviewedApplicantRecordDTO[],
  ): Promise<ReviewedApplicantRecordDTO[]> {
    try {
      const reviewedApplicantRecords = await sequelize.transaction(
        async (t) => {
          const records = await ReviewedApplicantRecord.bulkCreate(
            createReviewedApplicantRecordDTOs,
            { transaction: t },
          );
          return records;
        },
      );

      return reviewedApplicantRecords.map(
        (record) => record.toJSON() as ReviewedApplicantRecordDTO,
      );
    } catch (error: unknown) {
      Logger.error(
        `Failed to bulk create reviewed applicant records. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async deleteReviewedApplicantRecord(
    deleteReviewedApplicantRecord: DeleteReviewedApplicantRecordDTO,
  ): Promise<ReviewedApplicantRecordDTO> {
    try {
      const { applicantRecordId } = deleteReviewedApplicantRecord;
      const { reviewerId } = deleteReviewedApplicantRecord;
      const record = await ReviewedApplicantRecord.findOne({
        where: { applicantRecordId, reviewerId },
      });

      if (!record) {
        throw new Error("ReviewedApplicantRecord not found, delete failed");
      }

      await record.destroy();
      return record.toJSON() as ReviewedApplicantRecordDTO;
    } catch (error: unknown) {
      Logger.error(
        `Failed to delete reviewed applicant records. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async bulkDeleteReviewedApplicantRecord(
    deleteReviewedApplicantRecords: DeleteReviewedApplicantRecordDTO[],
  ): Promise<ReviewedApplicantRecordDTO[]> {
    try {
      const deletedRecords = await sequelize.transaction(async (t) => {
        const records = await Promise.all(
          deleteReviewedApplicantRecords.map(
            ({ applicantRecordId, reviewerId }) =>
              ReviewedApplicantRecord.findOne({
                where: { applicantRecordId, reviewerId },
                transaction: t,
              }),
          ),
        );

        if (records.some((r) => !r)) {
          throw new Error("Not all records were found, bulk delete failed");
        }

        const existingRecords = records as ReviewedApplicantRecord[];
        await Promise.all(
          existingRecords.map((r) => r.destroy({ transaction: t })),
        );

        return existingRecords;
      });

      return deletedRecords.map(
        (r) => r.toJSON() as ReviewedApplicantRecordDTO,
      );
    } catch (error: unknown) {
      Logger.error(
        `Failed to bulk delete reviewed applicant records. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  /* eslint-disable class-methods-use-this */
  async updateReviewedApplicantRecord({
    applicantRecordId,
    reviewerId,
    review,
    status,
  }: UpdateReviewedApplicantRecordDTO): Promise<ReviewedApplicantRecordDTO> {
    const updatedRecord = await sequelize.transaction(async (t) => {
      const reviewedRecord = await ReviewedApplicantRecord.findOne({
        where: { applicantRecordId, reviewerId },
        transaction: t,
      });

      if (!reviewedRecord) {
        throw new Error(
          `ReviewedApplicantRecord not found for applicantRecordId: ${applicantRecordId} and reviewerId: ${reviewerId}`,
        );
      }

      const oldReviewedScore = reviewedRecord.score || 0;

      if (review !== undefined) {
        reviewedRecord.review = {
          ...reviewedRecord.review,
          ...review,
        };

        const { passionFSG, teamPlayer, desireToLearn, skill } =
          reviewedRecord.review;

        if (
          passionFSG === undefined ||
          teamPlayer === undefined ||
          desireToLearn === undefined ||
          skill === undefined
        ) {
          throw new Error(
            "Invalid review update: All four score fields (passionFSG, teamPlayer, desireToLearn, skill) must be present after the update",
          );
        }

        reviewedRecord.score = passionFSG + teamPlayer + desireToLearn + skill;

        if (review.skillCategory !== undefined) {
          reviewedRecord.skillCategory = review.skillCategory;
        }
      }

      if (status !== undefined) {
        reviewedRecord.status = status;
      }

      await reviewedRecord.save({ transaction: t });

      const newReviewedScore = reviewedRecord.score || 0;

      const applicantRecord = await ApplicantRecord.findOne({
        where: { id: applicantRecordId },
        transaction: t,
      });

      if (!applicantRecord) {
        throw new Error(
          `ApplicantRecord not found for applicantRecordId: ${applicantRecordId}`,
        );
      }

      const oldCombinedScore = applicantRecord.combined_score || 0;
      applicantRecord.combined_score =
        oldCombinedScore - oldReviewedScore + newReviewedScore;

      await applicantRecord.save({ transaction: t });

      return reviewedRecord;
    });

    return updatedRecord.toJSON() as ReviewedApplicantRecordDTO;
  }
}

export default ReviewedApplicantRecordService;
