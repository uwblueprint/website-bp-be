import InterviewGroupService from "../../services/implementations/interviewGroupService";
import IInterviewGroupService from "../../services/interfaces/IInterviewGroupService";
import {
  CreateInterviewGroupDTO,
  InterviewGroupDTO,
  UpdateInterviewGroupDTO,
} from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

const interviewGroupService: IInterviewGroupService =
  new InterviewGroupService();

const interviewGroupResolvers = {
  Query: {
    getInterviewGroupById: async (
      _parent: undefined,
      args: { id: string },
    ): Promise<InterviewGroupDTO> => {
      try {
        return await interviewGroupService.getInterviewGroupById(args.id);
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },

  Mutation: {
    createInterviewGroup: async (
      _parent: undefined,
      args: {
        interviewGroup: CreateInterviewGroupDTO;
      },
    ): Promise<InterviewGroupDTO> => {
      try {
        return await interviewGroupService.createInterviewGroup(
          args.interviewGroup,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    updateInterviewGroup: async (
      _parent: undefined,
      args: {
        id: string;
        interviewGroup: UpdateInterviewGroupDTO;
      },
    ): Promise<InterviewGroupDTO> => {
      try {
        return await interviewGroupService.updateInterviewGroup(
          args.id,
          args.interviewGroup,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    deleteInterviewGroupById: async (
      _parent: undefined,
      args: { id: string },
    ): Promise<InterviewGroupDTO> => {
      try {
        return await interviewGroupService.deleteInterviewGroupById(args.id);
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    bulkCreateInterviewGroups: async (
      _parent: undefined,
      args: { interviewGroups: CreateInterviewGroupDTO[] },
    ): Promise<InterviewGroupDTO[]> => {
      try {
        return await interviewGroupService.bulkCreateInterviewGroups(
          args.interviewGroups,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    bulkDeleteInterviewGroupsByIds: async (
      _parent: undefined,
      args: { interviewGroupIds: string[] },
    ): Promise<InterviewGroupDTO[]> => {
      try {
        return await interviewGroupService.bulkDeleteInterviewGroupsByIds(
          args.interviewGroupIds,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
};

export default interviewGroupResolvers;
