import { ReviewedApplicantRecordDTO, ReviewStatus } from "../../types";

interface IReviewedApplicantRecordService {
  updateReviewStatus(
    applicantRecordId: string,
    reviewerId: number,
    status: ReviewStatus
  ): Promise<ReviewedApplicantRecordDTO>;
}

export default IReviewedApplicantRecordService;
