import TeamMemberService from "../../services/implementations/TeamMemberService";
import { CreateTeamMemberDTO, TeamMemberDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

const teamMemberService = new TeamMemberService();

const teamMemberResolvers = {
  Query: {
    teamMembers: async (): Promise<TeamMemberDTO[]> => {
      try {
        return await teamMemberService.getTeamMembers();
      } catch (e) {
        throw new Error(getErrorMessage(e));
      }
    },
  },
  Mutation: {
    createTeamMember: async (
      _: undefined,
      { input }: { input: CreateTeamMemberDTO },
    ): Promise<TeamMemberDTO> => {
      try {
        return await teamMemberService.createTeamMember(input);
      } catch (e) {
        throw new Error(getErrorMessage(e));
      }
    },
  },
};

export default teamMemberResolvers;
