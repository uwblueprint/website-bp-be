import { sequelize } from "../../models";
import ReviewedApplicantRecord from "../../models/reviewedApplicantRecord.model";
import {
  ReviewedApplicantRecordDTO,
  CreateReviewedApplicantRecordDTO,
  DeleteReviewedApplicantRecordDTO,
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

  async reassignReviewedApplicantRecord(
    applicantRecordId: string,
    oldReviewerId: number,
    newReviewerId: number,
  ): Promise<ReviewedApplicantRecordDTO> {
    try {
      return await sequelize.transaction(async (t) => {
        const oldRecord = await ReviewedApplicantRecord.findOne({
          where: { applicantRecordId, reviewerId: oldReviewerId },
          transaction: t,
        });

        if (!oldRecord) {
          throw new Error(
            `ReviewedApplicantRecord not found for applicantRecordId: ${applicantRecordId} and reviewerId: ${oldReviewerId}`,
          );
        }

        const oldRecordData = oldRecord.toJSON() as ReviewedApplicantRecordDTO;

        await oldRecord.destroy({ transaction: t });

        const newRecord = await ReviewedApplicantRecord.create(
          {
            applicantRecordId,
            reviewerId: newReviewerId,
            review: oldRecordData.review,
            status: oldRecordData.status,
            reviewerHasConflict: false,
          },
          { transaction: t },
        );

        return newRecord.toJSON() as ReviewedApplicantRecordDTO;
      });
    } catch (error: unknown) {
      Logger.error(
        `Failed to reassign reviewed applicant record. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }
}

export default ReviewedApplicantRecordService;
