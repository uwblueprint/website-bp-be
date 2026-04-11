import { InterviewedApplicantDTO, UserDTO } from "../../types";

interface IInterviewReviewPageService {
  /**
   * Gets all applicants belonging to an interview group
   * @param groupId the ID of the interview group
   */
  getInterviewedApplicantsByGroupId(
    groupId: string,
  ): Promise<InterviewedApplicantDTO[]>;

  /**
   * Gets all interviewers belonging to an interview group
   * @param groupId the ID of the interview group
   */
  getInterviewersByGroupId(groupId: string): Promise<UserDTO[]>;
}

export default IInterviewReviewPageService;
