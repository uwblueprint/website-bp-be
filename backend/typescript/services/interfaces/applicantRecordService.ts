import { ApplicantRecordDTO } from "../../types";

interface IApplicantRecordService {
  setApplicantRecordFlag(
    applicantRecordId: string,
    flagValue: boolean,
  ): Promise<ApplicantRecordDTO>;
}

export default IApplicantRecordService;
