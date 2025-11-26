import { ReviewedApplicantRecordDTO, ReviewStatus } from "../../types";

interface IReviewedApplicantRecordService {
  /**
   * Creates a single reviewed applicant record entry
   * @Param createReviewedApplicantRecordDTO data to create reviewed applicant record
   */
  createReviewedApplicantRecord(
    createReviewedApplicantRecordDTO: CreateReviewedApplicantRecordDTO,
  ): Promise<ReviewedApplicantRecordDTO>;

  /**
   * Creates multiple reviewed applicant record entries in bulk
   * @Param createReviewedApplicantRecordDTOs array of data to create reviewed applicant records
   */
  bulkCreateReviewedApplicantRecord(
    createReviewedApplicantRecordDTOs: CreateReviewedApplicantRecordDTO[],
  ): Promise<ReviewedApplicantRecordDTO[]>;

  /**
   * Deletes a single reviewed applicant record entry
   * @Param applicantRecordId the ID of applicant record to delete
   * @Param reviewerId the ID of the reviewer
   */
  deleteReviewedApplicantRecord(
    deleteReviewedApplicantRecord: DeleteReviewedApplicantRecordDTO,
  ): Promise<ReviewedApplicantRecordDTO>;

  /**
   * Deletes multiple reviewed applicant record entries in bulk
   * @Param deleteReviewedApplicantRecord array of data to delete reviewed applicant records
   */
  bulkDeleteReviewedApplicantRecord(
    deleteReviewedApplicantRecords: DeleteReviewedApplicantRecordDTO[],
  ): Promise<ReviewedApplicantRecordDTO[]>;

  /**
   * Updates the review status of a reviewed applicant record
   * @Param applicantRecordId the ID of the applicant record to update
   * @Param reviewerId the ID of the reviewer
   * @Param status the new review status to set
   */
  updateReviewStatus(
    applicantRecordId: string,
    reviewerId: number,
    status: ReviewStatus
  ): Promise<ReviewedApplicantRecordDTO>;
}

export default IReviewedApplicantRecordService;
