import { ApplicantRecordDTO, PositionTitle } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import ApplicantRecord from "../../models/applicantRecord.model";
import IApplicantRecordService from "../interfaces/applicantRecordService";

const Logger = logger(__filename);

class ApplicantRecordService implements IApplicantRecordService {
  /* eslint-disable class-methods-use-this */
  async setApplicantRecordFlag(
    applicantRecordId: string,
    flagValue: boolean,
  ): Promise<ApplicantRecordDTO> {
    try {
      const applicantRecord = await ApplicantRecord.findByPk(applicantRecordId);
      if (!applicantRecord) {
        throw new Error(
          `ApplicantRecord with id ${applicantRecordId} not found.`,
        );
      }
      applicantRecord.isApplicantFlagged = flagValue;
      await applicantRecord.save();
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
