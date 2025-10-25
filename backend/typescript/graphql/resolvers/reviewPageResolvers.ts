import { ApplicationDTO } from "../../types";
import ReviewPageService from "../../services/implementations/reviewPageService";
import { getErrorMessage } from "../../utilities/errorUtils";

const reviewPageService = new ReviewPageService();

const reviewPageResolvers = {
  Query: {
    reviewApplicantPage: async (
      _parent: undefined,
      args: { reviewedApplicantRecordId: number },
    ): Promise<ApplicationDTO[]> => {
      try {
        return await reviewPageService.getReviewPage(
          args.reviewedApplicantRecordId,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
};

export default reviewPageResolvers;
