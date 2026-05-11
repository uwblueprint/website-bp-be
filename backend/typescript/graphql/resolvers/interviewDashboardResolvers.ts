import InterviewDashboardService from "../../services/implementations/interviewDashboardService";
import IInterviewDashboardService from "../../services/interfaces/IInterviewDasboardService";
import { InterviewDelegationDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

const interviewDashboardService: IInterviewDashboardService =
  new InterviewDashboardService();

const interviewDashboardResolvers = {
  Mutation: {
    delegateInterviewers: async (
      _parent: undefined,
      args: { positions: string[] },
    ): Promise<InterviewDelegationDTO[]> => {
      try {
        return await interviewDashboardService.delegateInterviewers(
          args.positions,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
};

export default interviewDashboardResolvers;
