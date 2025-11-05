import { sequelize } from "../../models";
import ReviewedApplicantRecord from "../../models/reviewedApplicantRecord.model";
import { 
    ReviewedApplicantRecordDTO, 
    CreateReviewedApplicantRecordDTO 
} from "../../types";

import IReviewApplicantRecordService from "../interfaces/reviewedApplicantRecordService";

class ReviewedApplicantRecordService implements IReviewApplicantRecordService {

    async createReviewedApplicantRecord(
        dto: CreateReviewedApplicantRecordDTO
    ): Promise<ReviewedApplicantRecordDTO> {
        const record = await ReviewedApplicantRecord.create(dto);
        return record.toJSON() as ReviewedApplicantRecordDTO;
    }

    async bulkCreateReviewedApplicantRecord(
        createReviewedApplicantRecordDTOs: CreateReviewedApplicantRecordDTO[]
    ): Promise<ReviewedApplicantRecordDTO[]> {
        const reviewedApplicantRecords = await sequelize.transaction(async (t) => {
            const records = await ReviewedApplicantRecord.bulkCreate(
                createReviewedApplicantRecordDTOs,
                { transaction: t }
            );
            return records;
        });

        return reviewedApplicantRecords.map((record) =>
            record.toJSON() as ReviewedApplicantRecordDTO
        );
    }

    // Methods deleteReviewedApplicantRecord and bulkDeleteReviewedApplicantRecord would be implemented here
    async deleteReviewedApplicantRecord(applicantRecordId: string, reviewerId: number): Promise<ReviewedApplicantRecordDTO> {
        const record = await ReviewedApplicantRecord.findOne({ where: { applicantRecordId, reviewerId } });

        if (!record) {
            throw new Error("ReviewedApplicantRecord not found");
        }

        await record.destroy();
        return record.toJSON() as ReviewedApplicantRecordDTO;   
    }

    async bulkDeleteReviewedApplicantRecord(applicantRecordIds: string[], reviewerId: number): Promise<ReviewedApplicantRecordDTO[]> {
        const deletedRecords = await sequelize.transaction(async (t) => {
            const records = await ReviewedApplicantRecord.findAll({
                where: { applicantRecordId: applicantRecordIds, reviewerId },
                transaction: t,
            });

            if (records.length === 0) return [];

            await Promise.all(records.map((r) => r.destroy({ transaction: t })));
            return records;
        });

        return deletedRecords.map((r) => r.toJSON() as ReviewedApplicantRecordDTO);
    }
}

export default ReviewedApplicantRecordService;