import {
  Interview,
  InterviewedApplicantRecordDTO,
  InterviewStatus,
} from "../../types";

interface IInterviewedApplicantRecordsService {
  /**
   * Gets a single interviewed applicant record by ID
   * @Param id the ID of the interviewed applicant record to get
   */
  getInterviewedApplicantRecordById(
    id: string,
  ): Promise<InterviewedApplicantRecordDTO>;

  /**
   * Creates a single interviewed applicant record
   * @Param applicantRecordId applicant record ID of the application being interviewed
   * @Param score the score calculated from the submitted interview
   * @Param interviewJSON interviewer scores and comments
   * @Param status e.g. to-do, in-progress, done, conflict-reported, etc.
   * @Param interviewNotesId FK to FirebaseFile storing uploaded interview notes
   * @Param schedulingLink Calendaly/LettuceMeet link used for scheduling. This will be sent to the applicant
   * @Param interviewDate the interview date
   */
  createInterviewedApplicantRecord(
    applicantRecordId: string,
    score?: number,
    interviewJSON?: Interview,
    status?: InterviewStatus,
    interviewNotesId?: string,
    schedulingLink?: string,
    interviewDate?: Date,
  ): Promise<InterviewedApplicantRecordDTO>;

  /**
   * Updates a single interviewed applicant record
   * @Param id the ID of the interviewed applicant record to update
   * @Param score the score calculated from the submitted interview
   * @Param interviewJSON interviewer scores and comments
   * @Param status e.g. to-do, in-progress, done, conflict-reported, etc.
   * @Param interviewNotesId FK to FirebaseFile storing uploaded interview notes
   * @Param schedulingLink Calendaly/LettuceMeet link used for scheduling. This will be sent to the applicant
   * @Param interviewDate the interview date
   */
  updateInterviewedApplicantRecord(
    id: string,
    score?: number,
    interviewJSON?: Interview,
    status?: InterviewStatus,
    interviewNotesId?: string,
    schedulingLink?: string,
    interviewDate?: Date,
  ): Promise<InterviewedApplicantRecordDTO>;

  /**
   * Deletes a single interviewed applicant record
   * @Param id the ID of the interviewed applicant record to delete
   */
  deleteInterviewedApplicantRecordById(
    id: string,
  ): Promise<InterviewedApplicantRecordDTO>;
}

export default IInterviewedApplicantRecordsService;
