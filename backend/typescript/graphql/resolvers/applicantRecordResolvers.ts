import ApplicantRecordService from "../../services/implementations/applicantRecordService";
import { getErrorMessage } from "../../utilities/errorUtils";

const applicantRecordService = new ApplicantRecordService();

const applicantRecordResolvers = {
  Mutation: {
    populateApplicantRecord: async (
      _parent: undefined,
      args: { term: string },
    ): Promise<void> => {
      try {
        await applicantRecordService.populateApplicantRecord(args.term);
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
};

export default applicantRecordResolvers;
