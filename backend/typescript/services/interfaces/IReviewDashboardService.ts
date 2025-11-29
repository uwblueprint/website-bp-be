import {
  ReviewDashboardRowDTO,
  ReviewDashboardSidePanelDTO,
  ReviewedApplicantRecordDTO,
} from "../../types";

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

  /**
   * Assigns each user to an applicant record to review, and
   * returns the newly created ReviewedApplicantRecords
   * @Param positions the list of positions the algorithm should run on
   */
  delegateReviewers(positions: string[]): Promise<ReviewedApplicantRecordDTO[]>;

  /**
   * Fetch data that can fill out the review dashboard side panel for an applicant
   * @Param applicantId the ID of the applicant
   */
  getReviewDashboardSidePanel(
    applicantId: string,
  ): Promise<ReviewDashboardSidePanelDTO>;
}

export default IReviewDashboardService;
