import InterviewDashboardServices from "../../services/implementations/interviewDashboardServices";
import IInterviewDashboardServices from "../../services/interfaces/IInterviewDashboardServices";
import { InterviewDelegationDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

const interviewDashboardService: IInterviewDashboardServices =
  new InterviewDashboardServices();

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
