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
   * @param interviewGroup initial interview group
   */
  createInterviewGroup(
    interviewGroup: CreateInterviewGroupDTO,
  ): Promise<InterviewGroupDTO>;

  /**
   * Updates an existing interview group.
   * @param id PK of the interview group to update
   * @param interviewGroup updated interview group
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

  /**
   * Bulk creates interview groups.
   * @param interviewGroups list of interview groups to create
   */
  bulkCreateInterviewGroups(
    interviewGroups: CreateInterviewGroupDTO[],
  ): Promise<InterviewGroupDTO[]>;

  /**
   * Bulk deletes interview groups by ids.
   * @param interviewGroupIds list of interview group ids to delete
   */
  bulkDeleteInterviewGroupsByIds(
    interviewGroupIds: string[],
  ): Promise<InterviewGroupDTO[]>;
}

export default IInterviewGroupService;
