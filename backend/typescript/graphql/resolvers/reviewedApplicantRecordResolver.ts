import ReviewedApplicantRecordService from "../../services/implementations/reviewedApplicantRecordService";
import { IReviewedApplicantRecordService } from "../../services/interfaces/reviewedApplicantRecordService";
import {
  Review,
  ReviewedApplicantRecordDTO,
  ReviewedApplicantRecordPK,
  ReviewStatus,
} from "../../types";

const reviewedApplicantRecordService: IReviewedApplicantRecordService =
  new ReviewedApplicantRecordService();

const reviewedApplicantRecordResolvers = {
  Mutation: {
    createReviewedApplicantRecord: async (
      _parent: undefined,
      {
        reviewedApplicantRecordPK,
      }: { reviewedApplicantRecordPK: ReviewedApplicantRecordPK },
    ): Promise<ReviewedApplicantRecordDTO> => {
      return reviewedApplicantRecordService.createReviewedApplicantRecord(
        reviewedApplicantRecordPK,
      );
    },

    bulkCreateReviewedApplicantRecords: async (
      _parent: undefined,
      {
        reviewedApplicantRecordPKs,
      }: { reviewedApplicantRecordPKs: ReviewedApplicantRecordPK[] },
    ): Promise<ReviewedApplicantRecordDTO[]> => {
      return reviewedApplicantRecordService.bulkCreateReviewedApplicantRecords(
        reviewedApplicantRecordPKs,
      );
    },

    updateReviewedApplicantRecordReview: async (
      _parent: undefined,
      {
        reviewedApplicantRecordPK,
        review,
      }: {
        reviewedApplicantRecordPK: ReviewedApplicantRecordPK;
        review: Review;
      },
    ): Promise<ReviewedApplicantRecordDTO> => {
      return reviewedApplicantRecordService.updateReviewedApplicantRecordReview(
        reviewedApplicantRecordPK,
        review,
      );
    },

    updateReviewedApplicantRecordStatus: async (
      _parent: undefined,
      {
        reviewedApplicantRecordPK,
        status,
      }: {
        reviewedApplicantRecordPK: ReviewedApplicantRecordPK;
        status: ReviewStatus;
      },
    ): Promise<ReviewedApplicantRecordDTO> => {
      return reviewedApplicantRecordService.updateReviewedApplicantRecordStatus(
        reviewedApplicantRecordPK,
        status,
      );
    },
  },
};

export default reviewedApplicantRecordResolvers;
