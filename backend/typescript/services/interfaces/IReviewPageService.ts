import { ApplicationDTO } from "../../types";

interface IReviewPageService {
  /**
   * Fetch data from the Applicant and ApplicantRecord table to return an ApplicationDTO object
   * @Param applicantRecordId the id of the applicant record that the viewer is interested in
   */
  getReviewPage(applicantRecordId: string): Promise<ApplicationDTO>;
}

export default IReviewPageService;
