import InterviewGroupService from "../../services/implementations/interviewGroupService";
import IInterviewGroupService from "../../services/interfaces/IInterviewGroupService";
import {
  CreateInterviewGroupDTO,
  InterviewGroupDTO,
  InterviewGroupStatus,
} from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

const interviewGroupService: IInterviewGroupService =
  new InterviewGroupService();

const interviewGroupResolvers = {
  Query: {
    getInterviewGroup: async (
      _parent: undefined,
      args: { id: string },
    ): Promise<InterviewGroupDTO> => {
      try {
        return await interviewGroupService.getInterviewGroup(args.id);
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },

  Mutation: {
    createInterviewGroup: async (
      _parent: undefined,
      args: { schedulingLink?: string; status: InterviewGroupStatus },
    ): Promise<InterviewGroupDTO> => {
      try {
        return await interviewGroupService.createInterviewGroup(
          args.status,
          args.schedulingLink,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    updateInterviewGroup: async (
      _parent: undefined,
      args: {
        id: string;
        schedulingLink?: string;
        status: InterviewGroupStatus;
      },
    ): Promise<InterviewGroupDTO> => {
      try {
        return await interviewGroupService.updateInterviewGroup(
          args.id,
          args.status,
          args.schedulingLink,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    deleteInterviewGroup: async (
      _parent: undefined,
      args: { id: string },
    ): Promise<InterviewGroupDTO> => {
      try {
        return await interviewGroupService.deleteInterviewGroup(args.id);
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    bulkCreateInterviewGroups: async (
      _parent: undefined,
      args: { groups: CreateInterviewGroupDTO[] },
    ): Promise<InterviewGroupDTO[]> => {
      try {
        return await interviewGroupService.bulkCreateInterviewGroups(
          args.groups,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    bulkDeleteInterviewGroups: async (
      _parent: undefined,
      args: { ids: string[] },
    ): Promise<InterviewGroupDTO[]> => {
      try {
        return await interviewGroupService.bulkDeleteInterviewGroups(args.ids);
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
};

export default interviewGroupResolvers;
