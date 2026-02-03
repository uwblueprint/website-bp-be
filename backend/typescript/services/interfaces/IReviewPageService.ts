import { ApplicationDTO, ReviewedApplicantsDTO } from "../../types";

interface IReviewPageService {
  /**
   * Fetch data from the Applicant and ApplicantRecord table to return an ApplicationDTO object
   * @Param applicantRecordId the id of the applicant record that the viewer is interested in
   */
  getReviewPage(applicantRecordId: string): Promise<ApplicationDTO>;

  /**
   * Fetches information about all the applicants assigned to a user to review
   * @param userId the id of the user that the viewer is interested in
   */
  getReviewedApplicantsByUserId(
    userId: number,
  ): Promise<ReviewedApplicantsDTO[]>;
}

export default IReviewPageService;
