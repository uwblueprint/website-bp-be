import ApplicantRecord from "../../models/applicantRecord.model";
import { PositionTitle } from "../../types";

interface IApplicantRecordService {
  /**
   * Retrieve full applicant records by positions.
   */
  getApplicantRecords(positions: PositionTitle[]): Promise<ApplicantRecord[]>;

  /**
   * Retrieve a full applicant record by id.
   */
  getApplicantRecordById(id: string): Promise<ApplicantRecord>;
}

export default IApplicantRecordService;
