import { ApplicationStatus, ApplicantRecordDTO } from "../../types";

interface IApplicantRecordService {
  updateApplicantStatus(
    applicantRecordId: string,
    status: ApplicationStatus,
  ): Promise<ApplicantRecordDTO>;
  bulkUpdateApplicantStatus(
    applicantRecordIds: string[],
    status: ApplicationStatus,
  ): Promise<ApplicantRecordDTO[]>;
  setApplicantRecordFlag(
    applicantRecordId: string,
    flagValue: boolean,
  ): Promise<ApplicantRecordDTO>;
}

export default IApplicantRecordService;
