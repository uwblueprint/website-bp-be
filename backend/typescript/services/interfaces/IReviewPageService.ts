import {
  ApplicationDTO,
  ReviewedApplicantRecordDTO,
  ReviewedApplicantsDTO,
} from "../../types";

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

  /**
   * Update the reviewerHasConflict column of a ReviewedApplicantRecord entry to indicate a conflict.
   * @param applicantRecordId the id of the applicant record that the reviewer is interested in
   * @param reviewerId the id of the reviewer that is reporting the conflict
   */
  reportReviewConflict(
    applicantRecordId: string,
    reviewerId: number,
  ): Promise<ReviewedApplicantRecordDTO>;
}

export default IReviewPageService;
