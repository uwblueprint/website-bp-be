import { ApplicationDTO, ReviewedApplicantRecordDTO, ReviewedApplicantsDTO } from "../../types";
import ReviewPageService from "../../services/implementations/reviewPageService";
import { getErrorMessage } from "../../utilities/errorUtils";

const reviewPageService = new ReviewPageService();

const reviewPageResolvers = {
  Query: {
    reviewApplicantPage: async (
      _parent: undefined,
      args: { applicantRecordId: string },
    ): Promise<ApplicationDTO> => {
      try {
        return await reviewPageService.getReviewPage(args.applicantRecordId);
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
    getReviewedApplicantsByUserId: async (
      _parent: undefined,
      args: { userId: number },
    ): Promise<ReviewedApplicantsDTO[]> => {
      try {
        return await reviewPageService.getReviewedApplicantsByUserId(
          args.userId,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
  Mutation: {
    reportReviewConflict: async (
      _parent: undefined,
      args: { applicantRecordId: string, reviewerId: number },
    ): Promise<ReviewedApplicantRecordDTO> => {
      try {
        return await reviewPageService.reportReviewConflict(args.applicantRecordId, args.reviewerId);
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
};

export default reviewPageResolvers;
