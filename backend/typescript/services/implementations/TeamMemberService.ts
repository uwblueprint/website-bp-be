import PgTeamMember from "../../models/teamMember.model";
import ITeamMemberService from "../interfaces/ITeamMemberService";
import { CreateTeamMemberDTO, TeamMemberDTO, TeamRole } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import teamMemberType from "../../graphql/types/teamMemberType";

const Logger = logger(__filename);

class TeamMemberService implements ITeamMemberService {
  async getTeamMembers(): Promise<TeamMemberDTO[]> {
    try {
      const teamMembers: Array<PgTeamMember> = await PgTeamMember.findAll();
      return teamMembers.map((teamMember) => ({
        id: String(teamMember.id),
        firstName: teamMember.firstName,
        lastName: teamMember.lastName,
        teamRole: teamMember.teamRole as TeamRole,
      }));
    } catch (error: unknown) {
      Logger.error(
        `Failed to get TeamMembers. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async createTeamMember(
    teamMember: CreateTeamMemberDTO,
  ): Promise<TeamMemberDTO> {
    let newTeamMember: PgTeamMember | null;
    try {
      newTeamMember = await PgTeamMember.create({
        firstName: teamMember.firstName,
        lastName: teamMember.lastName,
        teamRole: teamMember.teamRole,
      });
    } catch (error: unknown) {
      Logger.error(
        `Failed to create entity. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
    return {
      id: String(newTeamMember.id),
      firstName: newTeamMember.firstName,
      lastName: newTeamMember.lastName,
      teamRole: newTeamMember.teamRole as TeamRole,
    };
  }
}

export default TeamMemberService;
