import { TeamMemberDTO, CreateTeamMemberDTO } from "../../types";

interface ITeamMemberService {
  /**
   * Get all team members
   * @returns an array of TeamMemberDTOs
   * @throws Error if team member retrieval fails
   */
  getTeamMembers(): Promise<TeamMemberDTO[]>;

  /**
   * Create a team member
   * @param teamMember the team member data to create
   * @returns the created TeamMemberDTO
   * @throws Error if team member creation fails
   */
  createTeamMember(teamMember: CreateTeamMemberDTO): Promise<TeamMemberDTO>;
}

export default ITeamMemberService;
