import ApplicantRecordService from "../../services/implementations/applicantRecordService";
import IApplicantRecordService from "../../services/interfaces/applicantRecordService";
import { ApplicantRecordDTO } from "../../types";

const applicantRecordService: IApplicantRecordService =
  new ApplicantRecordService();

const applicantRecordResolvers = {
  Mutation: {
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
