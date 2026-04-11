import InterviewReviewPageService from "../../services/implementations/interviewReviewPageService";
import IInterviewReviewPageService from "../../services/interfaces/IInterviewReviewPageService";
import { InterviewedApplicantDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

const interviewReviewPageService: IInterviewReviewPageService =
  new InterviewReviewPageService();

const interviewReviewPageResolvers = {
  Query: {
    getInterviewedApplicantsByGroupId: async (
      _parent: undefined,
      args: { groupId: string },
    ): Promise<InterviewedApplicantDTO[]> => {
      try {
        return await interviewReviewPageService.getInterviewedApplicantsByGroupId(
          args.groupId,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
};

export default interviewReviewPageResolvers;
