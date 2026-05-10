import {
  InterviewedApplicantsDTO,
  InterviewPairingsDTO,
  UserDTO,
} from "../../types";

interface IInterviewPageService {
  /**
   * Fetches information about all the applicants assigned to a user to interview.
   * @param userId the id of the interviewer
   */
  getInterviewedApplicantsByUserId(
    userId: number,
  ): Promise<InterviewedApplicantsDTO[]>;

  /**
   * Fetches interview pairing group information for an interviewer.
   * @param userId the id of the interviewer
   */
  getInterviewedPairingsByUserId(
    userId: number,
  ): Promise<InterviewPairingsDTO[]>;

  /**
   * Returns distinct interviewers assigned to an interview group (by delegation rows).
   * @param groupId the interview group id
   */
  getInterviewersByGroupId(groupId: string): Promise<UserDTO[]>;
}

export default IInterviewPageService;
