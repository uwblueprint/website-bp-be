import ReviewedApplicantRecordService from "../../services/implementations/reviewedApplicantRecordService";
import IReviewedApplicantRecordService from "../../services/interfaces/reviewedApplicantRecordService";
import {
  ReviewedApplicantRecordDTO,
  CreateReviewedApplicantRecordDTO,
  DeleteReviewedApplicantRecordDTO,
  ReviewStatus,
} from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

const reviewedApplicantRecordService: IReviewedApplicantRecordService =
  new ReviewedApplicantRecordService();

const reviewedApplicantRecordResolvers = {
  Mutation: {
    createReviewedApplicantRecord: async (
      _parent: undefined,
      args: { input: CreateReviewedApplicantRecordDTO },
    ): Promise<ReviewedApplicantRecordDTO> => {
      try {
        return await reviewedApplicantRecordService.createReviewedApplicantRecord(
          args.input,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    bulkCreateReviewedApplicantRecord: async (
      _parent: undefined,
      args: { inputs: CreateReviewedApplicantRecordDTO[] },
    ): Promise<ReviewedApplicantRecordDTO[]> => {
      try {
        return await reviewedApplicantRecordService.bulkCreateReviewedApplicantRecord(
          args.inputs,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    deleteReviewedApplicantRecord: async (
      _parent: undefined,
      args: { input: DeleteReviewedApplicantRecordDTO },
    ): Promise<ReviewedApplicantRecordDTO> => {
      try {
        return await reviewedApplicantRecordService.deleteReviewedApplicantRecord(
          args.input,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    bulkDeleteReviewedApplicantRecord: async (
      _parent: undefined,
      args: { inputs: DeleteReviewedApplicantRecordDTO[] },
    ): Promise<ReviewedApplicantRecordDTO[]> => {
      try {
        return await reviewedApplicantRecordService.bulkDeleteReviewedApplicantRecord(
          args.inputs,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    updateReviewStatus: async (
      _parent: undefined,
      {
        applicantRecordId,
        reviewerId,
        status,
      }: {
        applicantRecordId: string;
        reviewerId: number;
        status: ReviewStatus;
      },
    ): Promise<ReviewedApplicantRecordDTO> => {
      return reviewedApplicantRecordService.updateReviewStatus(
        applicantRecordId,
        reviewerId,
        status,
      );
    },
  },
};

export default reviewedApplicantRecordResolvers;
