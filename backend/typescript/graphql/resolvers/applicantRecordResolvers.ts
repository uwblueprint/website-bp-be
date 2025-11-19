import ApplicantRecordService from "../../services/implementations/applicantRecordService";
import IApplicantRecordService from "../../services/interfaces/applicantRecordService";
import { ApplicantRecordDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

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
