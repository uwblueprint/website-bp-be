import {
  Interview,
  InterviewedApplicantRecordDTO,
  InterviewStatus,
} from "../../types";
import IInterviewedApplicantRecordsService from "../interfaces/IInterviewedApplicantRecordsService";
import InterviewedApplicantRecord from "../../models/interviewedApplicantRecord.model";
import InterviewDelegation from "../../models/interviewDelegation.model";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";

const Logger = logger(__filename);

function toInterviewedApplicantRecordDTO(
  model: InterviewedApplicantRecord,
): InterviewedApplicantRecordDTO {
  return {
    id: model.id,
    applicantRecordId: model.applicantRecordId,
    score: model.score,
    interviewJson: model.interviewJson,
    status: model.status,
    interviewNotesId: model.interviewNotesId,
    interviewDate: model.interviewDate,
  };
}

class InterviewedApplicantRecordsService
  implements IInterviewedApplicantRecordsService
{
  /* eslint-disable class-methods-use-this */
  async getInterviewedApplicantRecordById(
    id: string,
  ): Promise<InterviewedApplicantRecordDTO> {
    try {
      const record: InterviewedApplicantRecord | null =
        await InterviewedApplicantRecord.findByPk(id);
      if (!record) {
        throw new Error(`No interviewed applicant record with id ${id} found.`);
      }
      return toInterviewedApplicantRecordDTO(record);
    } catch (error: unknown) {
      Logger.error(
        `Failed to fetch interviewed applicant record. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async getInterviewedApplicantsByGroupId(
    groupId: string,
  ): Promise<InterviewedApplicantRecordDTO[]> {
    try {
      const delegations = await InterviewDelegation.findAll({
        where: { groupId },
        include: [
          {
            model: InterviewedApplicantRecord,
            as: "interviewedApplicantRecord",
          },
        ],
      });
      const records = delegations
        .map((d) => d.interviewedApplicantRecord)
        .filter((r): r is InterviewedApplicantRecord => r !== undefined);
      const unique = Array.from(
        new Map(records.map((r) => [r.id, r])).values(),
      );
      return unique.map(toInterviewedApplicantRecordDTO);
    } catch (error: unknown) {
      Logger.error(
        `Failed to fetch interviewed applicants by group. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async createInterviewedApplicantRecord(
    applicantRecordId: string,
    score?: number,
    interviewJSON?: Interview,
    status?: InterviewStatus,
    interviewNotesId?: string,
    interviewDate?: Date,
  ): Promise<InterviewedApplicantRecordDTO> {
    try {
      const record: InterviewedApplicantRecord =
        await InterviewedApplicantRecord.create({
          applicantRecordId,
          score,
          interviewJson: interviewJSON,
          status,
          interviewNotesId,
          interviewDate,
        });
      return toInterviewedApplicantRecordDTO(record);
    } catch (error: unknown) {
      Logger.error(
        `Failed to create interviewed applicant record. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async updateInterviewedApplicantRecord(
    id: string,
    score?: number,
    interviewJSON?: Interview,
    status?: InterviewStatus,
    interviewNotesId?: string,
    interviewDate?: Date,
  ): Promise<InterviewedApplicantRecordDTO> {
    try {
      const record: InterviewedApplicantRecord | null =
        await InterviewedApplicantRecord.findByPk(id);
      if (!record) {
        throw new Error(`No interviewed applicant record with id ${id} found.`);
      }
      const fieldMapping: Partial<InterviewedApplicantRecord> = {
        score,
        interviewJson: interviewJSON,
        status,
        interviewNotesId,
        interviewDate,
      };
      const updates = Object.fromEntries(
        Object.entries(fieldMapping).filter(([, v]) => v !== undefined),
      );
      record.set(updates);
      await record.save();
      return toInterviewedApplicantRecordDTO(record);
    } catch (error: unknown) {
      Logger.error(
        `Failed to update interviewed applicant record. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async deleteInterviewedApplicantRecordById(
    id: string,
  ): Promise<InterviewedApplicantRecordDTO> {
    try {
      const record: InterviewedApplicantRecord | null =
        await InterviewedApplicantRecord.findByPk(id);
      if (!record) {
        throw new Error(`No interviewed applicant record with id ${id} found.`);
      }
      await record.destroy();
      return toInterviewedApplicantRecordDTO(record);
    } catch (error: unknown) {
      Logger.error(
        `Failed to delete interviewed applicant record. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }
}

export default InterviewedApplicantRecordsService;
