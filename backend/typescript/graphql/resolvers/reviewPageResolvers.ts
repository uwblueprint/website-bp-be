import { ApplicationDTO, ReviewedApplicantsDTO } from "../../types";
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
};

export default reviewPageResolvers;
