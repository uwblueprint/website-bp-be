import TeamMemberService from "../../services/implementations/teamMemberService";
import ITeamMemberService from "../../services/interfaces/ITeamMemberService";
import { CreateTeamMemberDTO, TeamMemberDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

const teamMemberService: ITeamMemberService = new TeamMemberService();

const teamMemberResolvers = {
  Query: {
    teamMembers: async (): Promise<TeamMemberDTO[]> => {
      try {
        return await teamMemberService.getTeamMembers();
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
  Mutation: {
    createTeamMember: async (
      _parent: unknown,
      { teamMember }: { teamMember: CreateTeamMemberDTO },
    ): Promise<TeamMemberDTO> => {
      try {
        return await teamMemberService.createTeamMember(teamMember);
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
};

export default teamMemberResolvers;
