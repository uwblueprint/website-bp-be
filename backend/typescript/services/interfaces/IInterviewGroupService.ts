import {
  CreateInterviewGroupDTO,
  InterviewGroupDTO,
  InterviewGroupStatus,
} from "../../types";

interface IInterviewGroupService {
  /**
   * Fetches a single interview group by id.
   * @param id PK of the interview group
   */
  getInterviewGroup(id: string): Promise<InterviewGroupDTO>;

  /**
   * Creates a new interview group.
   * @param status initial status
   * @param schedulingLink scheduling link, or undefined if not yet set
   */
  createInterviewGroup(
    status: InterviewGroupStatus,
    schedulingLink?: string,
  ): Promise<InterviewGroupDTO>;

  /**
   * Updates an existing interview group.
   * @param id PK of the interview group to update
   * @param status updated status
   * @param schedulingLink updated scheduling link, or undefined to clear it
   */
  updateInterviewGroup(
    id: string,
    status: InterviewGroupStatus,
    schedulingLink?: string,
  ): Promise<InterviewGroupDTO>;

  /**
   * Deletes an interview group by id.
   * @param id PK of the interview group to delete
   */
  deleteInterviewGroup(id: string): Promise<InterviewGroupDTO>;

  /**
   * Bulk creates interview groups.
   * @param groups list of groups to create
   */
  bulkCreateInterviewGroups(
    groups: CreateInterviewGroupDTO[],
  ): Promise<InterviewGroupDTO[]>;

  /**
   * Bulk deletes interview groups.
   * @param ids list of group ids to delete
   */
  bulkDeleteInterviewGroups(ids: string[]): Promise<InterviewGroupDTO[]>;
}

export default IInterviewGroupService;
