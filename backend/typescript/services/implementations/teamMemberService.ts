import ITeamMemberService from "../interfaces/ITeamMemberService";
import logger from "../../utilities/logger";
import TeamMember from "../../models/teamMember.model";
import { CreateTeamMemberDTO, TeamMemberDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

const Logger = logger(__filename);

function toDTO(model: TeamMember): TeamMemberDTO {
  return {
    id: String(model.id),
    firstName: model.firstName,
    lastName: model.lastName,
    teamRole: model.teamRole,
  };
}

class TeamMemberService implements ITeamMemberService {
  /* eslint-disable class-methods-use-this */
  async getTeamMembers(): Promise<TeamMemberDTO[]> {
    let teamMembers: TeamMember[] | null;
    try {
      teamMembers = await TeamMember.findAll();
    } catch (error) {
      Logger.error(
        `Failed to get team members. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }

    return teamMembers.map(toDTO);
  }

  async createTeamMember(
    teamMember: CreateTeamMemberDTO,
  ): Promise<TeamMemberDTO> {
    let newTeamMember: TeamMember | null;
    try {
      newTeamMember = await TeamMember.create(teamMember);
    } catch (error) {
      Logger.error(`Failed to create team member. Reason = ${error}`);
      throw error;
    }

    return toDTO(newTeamMember);
  }
}

export default TeamMemberService;
