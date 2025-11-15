import { sequelize } from "../../models";
import ReviewedApplicantRecord from "../../models/reviewedApplicantRecord.model";
import {
  ReviewedApplicantRecordDTO,
  CreateReviewedApplicantRecordDTO,
  DeleteReviewedApplicantRecordDTO,
} from "../../types";

import IReviewApplicantRecordService from "../interfaces/IReviewedApplicantRecordService";

class ReviewedApplicantRecordService implements IReviewApplicantRecordService {
  async createReviewedApplicantRecord(
    dto: CreateReviewedApplicantRecordDTO,
  ): Promise<ReviewedApplicantRecordDTO> {
    const record = await ReviewedApplicantRecord.create(dto);
    return record.toJSON() as ReviewedApplicantRecordDTO;
  }

  async bulkCreateReviewedApplicantRecord(
    createReviewedApplicantRecordDTOs: CreateReviewedApplicantRecordDTO[],
  ): Promise<ReviewedApplicantRecordDTO[]> {
    const reviewedApplicantRecords = await sequelize.transaction(async (t) => {
      const records = await ReviewedApplicantRecord.bulkCreate(
        createReviewedApplicantRecordDTOs,
        { transaction: t },
      );
      return records;
    });

    return reviewedApplicantRecords.map(
      (record) => record.toJSON() as ReviewedApplicantRecordDTO,
    );
  }

  async deleteReviewedApplicantRecord(
    deleteReviewedApplicantRecord: DeleteReviewedApplicantRecordDTO,
  ): Promise<ReviewedApplicantRecordDTO> {
    const { applicantRecordId, reviewerId } = deleteReviewedApplicantRecord;
    const record = await ReviewedApplicantRecord.findOne({
      where: { applicantRecordId, reviewerId },
    });

    if (!record) {
      throw new Error("ReviewedApplicantRecord not found, delete failed");
    }

    await record.destroy();
    return record.toJSON() as ReviewedApplicantRecordDTO;
  }

  async bulkDeleteReviewedApplicantRecord(
    deleteReviewedApplicantRecords: DeleteReviewedApplicantRecordDTO[],
  ): Promise<ReviewedApplicantRecordDTO[]> {
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

    return deletedRecords.map((r) => r.toJSON() as ReviewedApplicantRecordDTO);
  }
}

export default ReviewedApplicantRecordService;
