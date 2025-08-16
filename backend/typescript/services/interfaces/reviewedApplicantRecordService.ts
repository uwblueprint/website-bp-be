import {
  Review,
  ReviewedApplicantRecordDTO,
  ReviewedApplicantRecordPK,
  ReviewStatus,
} from "../../types";

export interface IReviewedApplicantRecordService {
  /**
   * Create a reviewed applicant record
   * @param reviewedApplicantRecordPK the primary key of the reviewed applicant record to create
   * @returns a ReviewedApplicantRecordDTO with the created reviewed applicant record's information
   * @throws Error if creation fails
   */
  createReviewedApplicantRecord(
    reviewedApplicantRecordPK: ReviewedApplicantRecordPK,
  ): Promise<ReviewedApplicantRecordDTO>;

  /**
   * Bulk create reviewed applicant records
   * @param reviewedApplicantRecordPKs An array of primary keys identifying the reviewed applicant records to create.
   * For each primary key, a new reviewed applicant record will be created using data associated with that key.
   * @returns a ReviewedApplicantRecordDTO array with the created reviewed applicant records' information
   * @throws Error if creation fails
   */
  bulkCreateReviewedApplicantRecords(
    reviewedApplicantRecordPKs: ReviewedApplicantRecordPK[],
  ): Promise<ReviewedApplicantRecordDTO[]>;

  /**
   * Get a reviewed applicant record by its primary key
   * @param reviewedApplicantRecordPK the primary key of the reviewed applicant record
   * @returns a ReviewedApplicantRecordDTO with the reviewed applicant record's information
   * @throws Error if retrieval fails
   */
  updateReviewedApplicantRecordReview(
    reviewedApplicantRecordPK: ReviewedApplicantRecordPK,
    review: Review,
  ): Promise<ReviewedApplicantRecordDTO>;

  /**
   * Update the status of a reviewed applicant record
   * @param reviewedApplicantRecordPK the primary key of the reviewed applicant record
   * @param status the new status to set
   * @returns a ReviewedApplicantRecordDTO with the updated status
   * @throws Error if update fails
   */
  updateReviewedApplicantRecordStatus(
    reviewedApplicantRecordPK: ReviewedApplicantRecordPK,
    status: ReviewStatus,
  ): Promise<ReviewedApplicantRecordDTO>;
}
