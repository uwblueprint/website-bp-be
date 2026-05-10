import {
  CreateInterviewGroupDTO,
  InterviewGroupDTO,
  UpdateInterviewGroupDTO,
} from "../../types";

interface IInterviewGroupService {
  /**
   * Fetches a single interview group by id.
   * @param id PK of the interview group
   */
  getInterviewGroupById(id: string): Promise<InterviewGroupDTO>;

  /**
   * Creates a new interview group.
   * @param status initial status
   * @param schedulingLink scheduling link, or undefined if not yet set
   */
  createInterviewGroup(
    interviewGroup: CreateInterviewGroupDTO,
  ): Promise<InterviewGroupDTO>;

  /**
   * Updates an existing interview group.
   * @param id PK of the interview group to update
   * @param status updated status
   * @param schedulingLink updated scheduling link, or undefined to clear it
   */
  updateInterviewGroup(
    id: string,
    interviewGroup: UpdateInterviewGroupDTO,
  ): Promise<InterviewGroupDTO>;

  /**
   * Deletes an interview group by id.
   * @param id PK of the interview group to delete
   */
  deleteInterviewGroupById(id: string): Promise<InterviewGroupDTO>;
}

export default IInterviewGroupService;
