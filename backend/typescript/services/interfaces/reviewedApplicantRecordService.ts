import { 
    ReviewedApplicantRecordDTO, 
    CreateReviewedApplicantRecordDTO 
} from "../../types";

interface IReviewApplicantRecordService {
  /**
   * Creates a single reviewed applicant record entry
   * @Param createReviewedApplicantRecordDTO data to create reviewed applicant record
   */
  createReviewedApplicantRecord(
    createReviewedApplicantRecordDTO: CreateReviewedApplicantRecordDTO
  ): Promise<ReviewedApplicantRecordDTO>;

  /**
   * Creates multiple reviewed applicant record entries in bulk
   * @Param createReviewedApplicantRecordDTOs array of data to create reviewed applicant records
   */
  bulkCreateReviewedApplicantRecord(
    createReviewedApplicantRecordDTOs: CreateReviewedApplicantRecordDTO[]
  ): Promise<ReviewedApplicantRecordDTO[]>;

  /**
   * Deletes a single reviewed applicant record entry
   * @Param applicantRecordId the ID of applicant record to delete
   * @Param reviewerId the ID of the reviewer
   */
  deleteReviewedApplicantRecord(
    applicantRecordId: string,
    reviewerId: number
  ): Promise<ReviewedApplicantRecordDTO>;

  /**
   * Deletes multiple reviewed applicant record entries in bulk
   * @Param applicantRecordIds array of applicant record IDs to delete
   * @Param reviewerId the ID of the reviewer
   */
  bulkDeleteReviewedApplicantRecord(
    applicantRecordIds: string[],
    reviewerId: number
  ): Promise<ReviewedApplicantRecordDTO[]>;
}

export default IReviewApplicantRecordService;