import ReviewedApplicantRecordService from "../../services/implementations/reviewedApplicantRecordService";
import { ReviewedApplicantRecordDTO, CreateReviewedApplicantRecordDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

const reviewedApplicantRecordService = new ReviewedApplicantRecordService();

const reviewedApplicantRecordResolvers = {
  Mutation: {
    createReviewedApplicantRecord: async (
      _parent: undefined,
      args: { input: CreateReviewedApplicantRecordDTO },
    ): Promise<ReviewedApplicantRecordDTO> => {
      try {
        return await reviewedApplicantRecordService.createReviewedApplicantRecord(args.input);
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    bulkCreateReviewedApplicantRecord: async (
      _parent: undefined,
      args: { inputs: CreateReviewedApplicantRecordDTO[] },
    ): Promise<ReviewedApplicantRecordDTO[]> => {
      try {
        return await reviewedApplicantRecordService.bulkCreateReviewedApplicantRecord(args.inputs);
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    deleteReviewedApplicantRecord: async (
      _parent: undefined,
      args: { applicantRecordId: string; reviewerId: number },
    ): Promise<ReviewedApplicantRecordDTO> => {
      try {
        return await reviewedApplicantRecordService.deleteReviewedApplicantRecord(
          args.applicantRecordId,
          args.reviewerId,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    bulkDeleteReviewedApplicantRecord: async (
      _parent: undefined,
      args: { applicantRecordIds: string[]; reviewerId: number },
    ): Promise<ReviewedApplicantRecordDTO[]> => {
      try {
        return await reviewedApplicantRecordService.bulkDeleteReviewedApplicantRecord(
          args.applicantRecordIds,
          args.reviewerId,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
};

export default reviewedApplicantRecordResolvers;
