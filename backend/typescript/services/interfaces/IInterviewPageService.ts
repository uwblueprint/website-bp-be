import { InterviewedApplicantsDTO, InterviewPairingsDTO } from "../../types";

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
}

export default IInterviewPageService;
