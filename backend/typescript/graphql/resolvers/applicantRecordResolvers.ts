import ApplicantRecordService from "../../services/implementations/applicantRecordService";
import IApplicantRecordService from "../../services/interfaces/applicantRecordService";
import { ApplicantRecordDTO, ApplicationStatus } from "../../types";

const applicantRecordService: IApplicantRecordService =
  new ApplicantRecordService();

const applicantRecordResolvers = {
  Mutation: {
    updateApplicantStatus: async (
      _parent: undefined,
      {
        applicantRecordId,
        status,
      }: { applicantRecordId: string; status: ApplicationStatus },
    ): Promise<ApplicantRecordDTO> => {
      const applicantRecord =
        await applicantRecordService.updateApplicantStatus(
          applicantRecordId,
          status,
        );
      return applicantRecord;
    },
    bulkUpdateApplicantStatus: async (
      _parent: undefined,
      {
        applicantRecordIds,
        status,
      }: { applicantRecordIds: string[]; status: ApplicationStatus },
    ): Promise<ApplicantRecordDTO[]> => {
      const applicantRecords =
        await applicantRecordService.bulkUpdateApplicantStatus(
          applicantRecordIds,
          status,
        );
      return applicantRecords;
    },
    setApplicantRecordFlag: async (
      _parent: undefined,
      {
        applicantRecordId,
        flagValue,
      }: { applicantRecordId: string; flagValue: boolean },
    ): Promise<ApplicantRecordDTO> => {
      const applicantRecord =
        await applicantRecordService.setApplicantRecordFlag(
          applicantRecordId,
          flagValue,
        );
      return applicantRecord;
    },
  },
};

export default applicantRecordResolvers;
