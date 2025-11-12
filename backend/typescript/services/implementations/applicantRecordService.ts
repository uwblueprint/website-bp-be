import { ApplicantRecordDTO, PositionTitle, ApplicationStatus } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import ApplicantRecord from "../../models/applicantRecord.model";
import IApplicantRecordService from "../interfaces/applicantRecordService";
import { sequelize } from "../../models";
const Logger = logger(__filename);

function toDTO(applicantRecord: ApplicantRecord): ApplicantRecordDTO {
  return {
    id: String(applicantRecord.id),
    applicantId: String(applicantRecord.applicantId),
    position: applicantRecord.position as PositionTitle,
    roleSpecificQuestions: applicantRecord.roleSpecificQuestions,
    choice: applicantRecord.choice,
    status: applicantRecord.status,
    skillCategory: applicantRecord.skillCategory,
    combined_score: applicantRecord.combined_score,
    isApplicantFlagged: applicantRecord.isApplicantFlagged,
  };
}

export const getApplicantRecord = async (applicantRecordId: string): Promise<ApplicantRecord> => {
  const applicantRecord = await ApplicantRecord.findByPk(applicantRecordId);
  if (!applicantRecord) {
    throw new Error(`ApplicantRecord with id ${applicantRecordId} not found.`);
  }
  return applicantRecord;
};

class ApplicantRecordService implements IApplicantRecordService {
  /* eslint-disable class-methods-use-this */

  async updateApplicantStatus(
    applicantRecordId: string,
    status: ApplicationStatus,
  ): Promise<ApplicantRecordDTO> {
    try {
      const applicantRecord = await getApplicantRecord(applicantRecordId);
      applicantRecord.status = status;
      await applicantRecord.save();
      return toDTO(applicantRecord);
    } catch (error: unknown) {
      Logger.error(
        `Failed to update applicant record status. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async bulkUpdateApplicantStatus(
    applicantRecordIds: string[],
    status: ApplicationStatus,
  ): Promise<ApplicantRecordDTO[]> {
    const transaction = await sequelize.transaction();
    try {
      const updatedRecords: ApplicantRecordDTO[] = [];
      for (const id of applicantRecordIds) {
        const applicantRecord = await getApplicantRecord(id);
        applicantRecord.status = status;
        await applicantRecord.save({ transaction });
        updatedRecords.push(toDTO(applicantRecord));
      }
      await transaction.commit();
      return updatedRecords;
    } catch (error: unknown) {
      await transaction.rollback();
      Logger.error(
        `Failed to update applicant record statuses. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async setApplicantRecordFlag(
    applicantRecordId: string,
    flagValue: boolean,
  ): Promise<ApplicantRecordDTO> {
    try {
      const applicantRecord = await getApplicantRecord(applicantRecordId);
      applicantRecord.isApplicantFlagged = flagValue;
      await applicantRecord.save();
      return toDTO(applicantRecord);
    } catch (error: unknown) {
      Logger.error(
        `Failed to set applicant record flag. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }
}

export default ApplicantRecordService;
