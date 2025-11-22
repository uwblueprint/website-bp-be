import ReviewDashboardService from "../../services/implementations/reviewDashboardService";
import { ReviewDashboardRowDTO, ReviewDashboardFilter } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

const reviewDashboardService = new ReviewDashboardService();

const reviewDashboardResolvers = {
  Query: {
    reviewDashboard: async (
      _parent: undefined,
      args: {
        pageNumber: number;
        resultsPerPage: number;
        filter?: ReviewDashboardFilter;
      },
    ): Promise<ReviewDashboardRowDTO[]> => {
      try {
        return await reviewDashboardService.getReviewDashboard(
          args.pageNumber,
          args.resultsPerPage,
          args.filter,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
};

export default reviewDashboardResolvers;
