import { InterviewedApplicantDTO } from "../../types";

interface IInterviewReviewPageService {
  /**
   * Gets all applicants belonging to an interview group
   * @param groupId the ID of the interview group
   */
  getInterviewedApplicantsByGroupId(
    groupId: string,
  ): Promise<InterviewedApplicantDTO[]>;
}

export default IInterviewReviewPageService;
