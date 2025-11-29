import {
  ReviewDashboardRowDTO,
  ReviewDashboardFilter,
  ReviewDashboardSidePanelDTO,
} from "../../types";

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

  /**
   * Fetch data that can fill out the review dashboard side panel for an applicant
   * @Param applicantId the ID of the applicant
   */
  getReviewDashboardSidePanel(
    applicantId: string,
  ): Promise<ReviewDashboardSidePanelDTO>;
}

export default IReviewDashboardService;
