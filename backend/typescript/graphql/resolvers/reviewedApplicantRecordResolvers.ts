import ReviewedApplicantRecordService from "../../services/implementations/reviewedApplicantRecordService";
import IReviewedApplicantRecordService from "../../services/interfaces/reviewedApplicantRecordService";
import { ReviewedApplicantRecordDTO, ReviewStatus } from "../../types";

const reviewedApplicantRecordService: IReviewedApplicantRecordService = new ReviewedApplicantRecordService();

const reviewedApplicantRecordResolvers = {
  Mutation: {
    updateReviewStatus: async (
      _parent: undefined,
      { applicantRecordId, reviewerId, status }: { applicantRecordId: string; reviewerId: number; status: ReviewStatus },
    ): Promise<ReviewedApplicantRecordDTO> => {
      return reviewedApplicantRecordService.updateReviewStatus(
        applicantRecordId,
        reviewerId,
        status,
      );
    },
  },
};

export default reviewedApplicantRecordResolvers;
