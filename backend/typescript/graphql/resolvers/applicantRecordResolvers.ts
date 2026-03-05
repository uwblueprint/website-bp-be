import ApplicantRecordService from "../../services/implementations/applicantRecordService";
import IApplicantRecordService from "../../services/interfaces/applicantRecordService";
import { ApplicantRecordDTO, ApplicationStatus } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

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
      try {
        const applicantRecord =
          await applicantRecordService.setApplicantRecordFlag(
            applicantRecordId,
            flagValue,
          );
        return applicantRecord;
      } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
};

export default applicantRecordResolvers;
