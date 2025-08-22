import { Op } from "sequelize";
import { PositionTitle } from "../../types";
import IApplicantRecordService from "../interfaces/applicantRecordService";
import logger from "../../utilities/logger";
import ApplicantRecord from "../../models/applicantRecord.model";
import { getErrorMessage } from "../../utilities/errorUtils";
import Applicant from "../../models/applicant.model";
import ReviewedApplicantRecord from "../../models/reviewedApplicantRecord.model";
import User from "../../models/user.model";

const Logger = logger(__filename);

class ApplicantRecordService implements IApplicantRecordService {
  /* eslint-disable class-methods-use-this */

  async getApplicantRecords(
    positions: PositionTitle[],
  ): Promise<ApplicantRecord[]> {
    try {
      return await ApplicantRecord.findAll({
        where: {
          position: { [Op.in]: positions },
        },
        include: [
          {
            model: Applicant,
            as: "applicant",
          },
          {
            model: ReviewedApplicantRecord,
            as: "reviews",
            include: [
              {
                model: User,
                as: "reviewer",
              },
            ],
          },
        ],
      });
    } catch (error: unknown) {
      Logger.error(
        `Failed to get applicant records. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async getApplicantRecordById(id: string): Promise<ApplicantRecord> {
    try {
      const applicantRecord = await ApplicantRecord.findByPk(id, {
        include: [
          {
            model: Applicant,
            as: "applicant",
          },
        ],
      });
      if (!applicantRecord) {
        throw new Error(`Applicant record with id ${id} not found.`);
      }
      return applicantRecord;
    } catch (error: unknown) {
      Logger.error(
        `Failed to get applicant record. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default ApplicantRecordService;
