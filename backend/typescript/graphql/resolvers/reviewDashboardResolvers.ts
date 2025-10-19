import ReviewDashboardService from "../../services/implementations/reviewDashboardService";
import { ReviewDashoardRowDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

const reviewDashboardService = new ReviewDashboardService();

const reviewDashboardResolvers = {
  Query: {
    reviewDashboard: async (
      _parent: undefined,
      args: { pageNumber: number; resultsPerPage: number },
    ): Promise<ReviewDashoardRowDTO[]> => {
      try {
        return await reviewDashboardService.getReviewDashboard(
          args.pageNumber,
          args.resultsPerPage,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
};

export default reviewDashboardResolvers;
