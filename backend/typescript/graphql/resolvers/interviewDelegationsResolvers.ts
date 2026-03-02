import InterviewDelegationsService from "../../services/implementations/interviewDelegationsService";
import IInterviewDelegationsService from "../../services/interfaces/IInterviewDelegationsService";
import {
  CreateInterviewDelegationDTO,
  DeleteInterviewDelegationDTO,
  InterviewDelegationDTO,
} from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

const interviewDelegationsService: IInterviewDelegationsService =
  new InterviewDelegationsService();

const interviewDelegationsResolvers = {
  Query: {
    getInterviewDelegation: async (
      _parent: undefined,
      args: { interviewedApplicantRecordId: string; interviewerId: number },
    ): Promise<InterviewDelegationDTO> => {
      try {
        return await interviewDelegationsService.getInterviewDelegation(
          args.interviewedApplicantRecordId,
          args.interviewerId,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
  Mutation: {
    createInterviewDelegation: async (
      _parent: undefined,
      args: { interviewedApplicantRecordId: string; interviewerId: number },
    ): Promise<InterviewDelegationDTO> => {
      try {
        return await interviewDelegationsService.createInterviewDelegation(
          args.interviewedApplicantRecordId,
          args.interviewerId,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    updateInterviewDelegation: async (
      _parent: undefined,
      args: {
        interviewedApplicantRecordId: string;
        prevInterviewerId: number;
        newInterviewerId: number;
      },
    ): Promise<InterviewDelegationDTO> => {
      try {
        return await interviewDelegationsService.updateInterviewDelegation(
          args.interviewedApplicantRecordId,
          args.prevInterviewerId,
          args.newInterviewerId,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    deleteInterviewDelegation: async (
      _parent: undefined,
      args: { interviewedApplicantRecordId: string; interviewerId: number },
    ): Promise<InterviewDelegationDTO> => {
      try {
        return await interviewDelegationsService.deleteInterviewDelegation(
          args.interviewedApplicantRecordId,
          args.interviewerId,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    bulkCreateInterviewDelegations: async (
      _parent: undefined,
      args: { delegations: CreateInterviewDelegationDTO[] },
    ): Promise<InterviewDelegationDTO[]> => {
      try {
        return await interviewDelegationsService.bulkCreateInterviewDelegations(
          args.delegations,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    bulkDeleteInterviewDelegations: async (
      _parent: undefined,
      args: { delegations: DeleteInterviewDelegationDTO[] },
    ): Promise<InterviewDelegationDTO[]> => {
      try {
        return await interviewDelegationsService.bulkDeleteInterviewDelegations(
          args.delegations,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
};

export default interviewDelegationsResolvers;
