import InterviewPageService from "../../services/implementations/interviewPageService";
import {
  InterviewedApplicantsDTO,
  InterviewPairingsDTO,
  UserDTO,
} from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

const interviewPageService = new InterviewPageService();

const interviewPageResolvers = {
  Query: {
    getInterviewedApplicantsByUserId: async (
      _parent: undefined,
      args: { userId: number },
    ): Promise<InterviewedApplicantsDTO[]> => {
      const { userId } = args;
      try {
        return await interviewPageService.getInterviewedApplicantsByUserId(
          userId,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
    getInterviewedPairingsByUserId: async (
      _parent: undefined,
      args: { userId: number },
    ): Promise<InterviewPairingsDTO[]> => {
      const { userId } = args;
      try {
        return await interviewPageService.getInterviewedPairingsByUserId(
          userId,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
    getInterviewersByGroupId: async (
      _parent: undefined,
      args: { groupId: string },
    ): Promise<UserDTO[]> => {
      const { groupId } = args;
      try {
        return await interviewPageService.getInterviewersByGroupId(groupId);
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
  Mutation: {},
};

export default interviewPageResolvers;
