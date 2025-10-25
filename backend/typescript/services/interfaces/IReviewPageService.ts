import { ApplicationDTO } from "../../types";

interface IReviewPageService {
  /**
   * Fetch data from the Applicant and ApplicantRecord table to return an ApplicationDTO object
   * @Param reviewedApplicantRecordId the id of the applicant record that the viewer is interested in
   */
  getReviewPage(reviewedApplicantRecordId: string): Promise<ApplicationDTO>;
}

export default IReviewPageService;
