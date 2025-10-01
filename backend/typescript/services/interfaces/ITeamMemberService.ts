import { TeamMemberDTO, CreateTeamMemberDTO } from "../../types";

export interface ITeamMemberService {
  /**
   * retrieve the Team Member with the given id
   * @param id team member id
   * @returns requested Team Member
   * @throws Error if retrieval fails
   */
  getTeamMembers(): Promise<TeamMemberDTO[]>;

  /**
   * create a Team Member with the fields given in the DTO, return created Team Member
   * @param teamMember new Team Member
   * @returns the created Team Member
   * @throws Error if creation fails
   */
  createTeamMember(teamMember: CreateTeamMemberDTO): Promise<TeamMemberDTO>;
}
