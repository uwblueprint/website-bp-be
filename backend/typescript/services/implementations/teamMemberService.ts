import ITeamMemberService from "../interfaces/teamMemberService";
import logger from "../../utilities/logger";
import { CreateTeamMemberDTO, TeamMemberDTO } from "../../types";
import TeamMember from "../../models/teamMember.model"; // <- Sequelize model
import { getErrorMessage } from "../../utilities/errorUtils";

const Logger = logger(__filename);

function toDTO(model: TeamMember): TeamMemberDTO {
  return {
    id: model.id,
    firstName: model.firstName,
    lastName: model.lastName,
    teamRole: model.teamRole,
  };
}

class TeamMemberService implements ITeamMemberService {
  getTeamMembers = async (): Promise<TeamMemberDTO[]> => {
    try {
      const teamMembers = await TeamMember.findAll();
      return teamMembers.map(toDTO);
    } catch (error: unknown) {
      Logger.error(
        `Failed to get team members. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  };

  createTeamMember = async (
    teamMember: CreateTeamMemberDTO,
  ): Promise<TeamMemberDTO> => {
    try {
      const newTeamMember = await TeamMember.create(teamMember);
      return toDTO(newTeamMember);
    } catch (error: unknown) {
      Logger.error(
        `Failed to create team member. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  };
}

export default TeamMemberService;
