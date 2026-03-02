import {
  CreateInterviewDelegationDTO,
  DeleteInterviewDelegationDTO,
  InterviewDelegationDTO,
} from "../../types";

interface IInterviewDelegationsService {
  /**
   * Creates a new interview delegation record assigning an interviewer to an interviewed applicant.
   * @param interviewedApplicantRecordId FK to the interviewed applicant record
   * @param interviewerId FK to the user assigned as interviewer
   */
  createInterviewDelegation(
    interviewedApplicantRecordId: string,
    interviewerId: number,
  ): Promise<InterviewDelegationDTO>;

  /**
   * Updates an existing interview delegation by deleting the old record and creating a new one in a single transaction.
   * @param interviewedApplicantRecordId FK to the interviewed applicant record
   * @param prevInterviewerId FK to the interviewer being replaced
   * @param newInterviewerId FK to the new interviewer being assigned
   */
  updateInterviewDelegation(
    interviewedApplicantRecordId: string,
    prevInterviewerId: number,
    newInterviewerId: number,
  ): Promise<InterviewDelegationDTO>;

  /**
   * Fetches a single interview delegation record.
   * @param interviewedApplicantRecordId FK to the interviewed applicant record
   * @param interviewerId FK to the interviewer
   */
  getInterviewDelegation(
    interviewedApplicantRecordId: string,
    interviewerId: number,
  ): Promise<InterviewDelegationDTO>;

  /**
   * Deletes a single interview delegation record.
   * @param interviewedApplicantRecordId FK to the interviewed applicant record
   * @param interviewerId FK to the interviewer
   */
  deleteInterviewDelegation(
    interviewedApplicantRecordId: string,
    interviewerId: number,
  ): Promise<InterviewDelegationDTO>;

  /**
   * Bulk creates interview delegation records, used when running the delegations algorithm.
   * @param delegations Array of interviewedApplicantRecordId and interviewerId tuples
   */
  bulkCreateInterviewDelegations(
    delegations: CreateInterviewDelegationDTO[],
  ): Promise<InterviewDelegationDTO[]>;

  /**
   * Bulk deletes interview delegation records.
   * @param delegations Array of interviewedApplicantRecordId and interviewerId tuples
   */
  bulkDeleteInterviewDelegations(
    delegations: DeleteInterviewDelegationDTO[],
  ): Promise<InterviewDelegationDTO[]>;
}

export default IInterviewDelegationsService;
