import { ReviewDashboardRowDTO, ReviewDashboardFilter } from "../../types";

interface IReviewDashboardService {
  /**
   * Pagination-supporting viewing of the virtual review dashboard
   * @Param page the page the viewer is on
   * @Param resultsPerPage the number of results per page
   * @param filters the filters for the review dashboard results
   */
  getReviewDashboard(
    page: number,
    resultsPerPage: number,
    filters?: ReviewDashboardFilter,
  ): Promise<ReviewDashboardRowDTO[]>;
}

export default IReviewDashboardService;
