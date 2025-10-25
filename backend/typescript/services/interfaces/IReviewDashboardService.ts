import { ReviewDashboardRowDTO } from "../../types";

interface IReviewDashboardService {
  /**
   * Pagination-supporting viewing of the virtual review dashboard
   * @Param page the page the viewer is on
   * @Param resultsPerPage the number of results per page
   */
  getReviewDashboard(
    page: number,
    resultsPerPage: number,
  ): Promise<ReviewDashboardRowDTO[]>;
}

export default IReviewDashboardService;
