import ApplicantRecord from "../../models/applicantRecord.model";
import ApplicantRecordService from "../../services/implementations/applicantRecordService";
import { PositionTitle } from "../../types";

const applicantRecordService = new ApplicantRecordService();

const applicantRecordResolvers = {
  Query: {
    getApplicantRecords: async (
      _parent: undefined,
      { positions }: { positions: PositionTitle[] },
    ): Promise<ApplicantRecord[]> => {
      return applicantRecordService.getApplicantRecords(positions);
    },
    getApplicantRecordById: (
      _parent: undefined,
      { id }: { id: string },
    ): Promise<ApplicantRecord> => {
      return applicantRecordService.getApplicantRecordById(id);
    },
  },
};

export default applicantRecordResolvers;
