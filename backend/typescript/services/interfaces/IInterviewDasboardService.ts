import { InterviewDelegationDTO } from "../../types";

interface IInterviewDashboardService {
  /**
   * Delegates interviewers to interview applicants.
   */
  delegateInterviewers(positions: string[]): Promise<InterviewDelegationDTO[]>;
}

export default IInterviewDashboardService;
