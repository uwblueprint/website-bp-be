import { InterviewDelegationDTO } from "../../types";

interface IInterviewDashboardServices {
  /**
   * Delegates interviewers to interview applicants.
   */
  delegateInterviewers(positions: string[]): Promise<InterviewDelegationDTO[]>;
}

export default IInterviewDashboardServices;
