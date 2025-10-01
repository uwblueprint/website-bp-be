import { TeamMemberDTO, CreateTeamMemberDTO } from "../../types";
import logger from "../../utilities/logger";
import { ITeamMemberService } from "../interfaces/ITeamMemberService";
import PgTeamMembers from "../../models/teamMember.model";

const Logger = logger(__filename);

class TeamMemberService implements ITeamMemberService {
  // eslint-disable-next-line class-methods-use-this
  async getTeamMembers(): Promise<TeamMemberDTO[]> {
    try {
      const teamMembers: Array<PgTeamMembers> = await PgTeamMembers.findAll({
        raw: true,
      });
      return teamMembers.map((member) => ({
        id: member.id,
        firstName: member.firstName,
        lastName: member.lastName,
        teamRole: member.teamRole,
      }));
    } catch (error: unknown) {
      Logger.error(`Failed to get team members ${error}`);
      throw error;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async createTeamMember(
    teamMember: CreateTeamMemberDTO,
  ): Promise<TeamMemberDTO> {
    try {
      const member = await PgTeamMembers.create(teamMember);
      return {
        id: member.id,
        firstName: member.firstName,
        lastName: member.lastName,
        teamRole: member.teamRole,
      };
    } catch (error: unknown) {
      Logger.error(`Failed to create team member: ${error}`);
      throw error;
    }
  }
}

export default TeamMemberService;
