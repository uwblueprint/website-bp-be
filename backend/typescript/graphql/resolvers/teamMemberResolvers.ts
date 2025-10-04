import TeamMemberService from "../../services/implementations/teamMemberService";
import { CreateTeamMemberDTO, TeamMemberDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

const teamMemberService = new TeamMemberService();

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
      _: unknown,
      { input }: { input: CreateTeamMemberDTO },
    ): Promise<TeamMemberDTO> => {
      try {
        return await teamMemberService.createTeamMember(input);
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
};

export default teamMemberResolvers;
