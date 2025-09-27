import { CreateTeamMemberDTO, TeamMemberDTO } from "../../types";

export default interface ITeamMemberService {
  /**
   * Get all team member information
   * @returns array of TeamMemberDTO
   * @throws Error if team member retrieval fails
   */
  getTeamMembers(): Promise<TeamMemberDTO[]>;

  /**
   * create an TeamMember with the fields given in the DTO, return created TeamMember
   * @param teamMember new TeamMember
   * @returns the created TeamMember
   * @throws Error if creation fails
   */
  createTeamMember(teamMember: CreateTeamMemberDTO): Promise<TeamMemberDTO>;
}
