import InterviewedApplicantRecordsService from "../../services/implementations/interviewedApplicantRecordsService";
import IInterviewedApplicantRecordsService from "../../services/interfaces/IInterviewedApplicantRecordsService";
import {
  Interview,
  InterviewedApplicantRecordDTO,
  InterviewStatus,
} from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

const interviewedApplicantRecordsService: IInterviewedApplicantRecordsService =
  new InterviewedApplicantRecordsService();

const interviewedApplicantRecordsResolvers = {
  Query: {
    getInterviewedApplicantRecordById: async (
      _parent: undefined,
      args: { id: string },
    ): Promise<InterviewedApplicantRecordDTO> => {
      try {
        return await interviewedApplicantRecordsService.getInterviewedApplicantRecordById(
          args.id,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
  Mutation: {
    createInterviewedApplicantRecord: async (
      _parent: undefined,
      args: {
        applicantRecordId: string;
        score?: number;
        interviewJSON?: Interview;
        status?: InterviewStatus;
        interviewNotesId?: string;
        schedulingLink?: string;
        interviewDate?: Date;
      },
    ): Promise<InterviewedApplicantRecordDTO> => {
      try {
        return await interviewedApplicantRecordsService.createInterviewedApplicantRecord(
          args.applicantRecordId,
          args.score,
          args.interviewJSON,
          args.status,
          args.interviewNotesId,
          args.schedulingLink,
          args.interviewDate,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    updateInterviewedApplicantRecord: async (
      _parent: undefined,
      args: {
        id: string;
        score?: number;
        interviewJSON?: Interview;
        status?: InterviewStatus;
        interviewNotesId?: string;
        schedulingLink?: string;
        interviewDate?: Date;
      },
    ): Promise<InterviewedApplicantRecordDTO> => {
      try {
        return await interviewedApplicantRecordsService.updateInterviewedApplicantRecord(
          args.id,
          args.score,
          args.interviewJSON,
          args.status,
          args.interviewNotesId,
          args.schedulingLink,
          args.interviewDate,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },

    deleteInterviewedApplicantRecordById: async (
      _parent: undefined,
      args: { id: string },
    ): Promise<InterviewedApplicantRecordDTO> => {
      try {
        return await interviewedApplicantRecordsService.deleteInterviewedApplicantRecordById(
          args.id,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
};

export default interviewedApplicantRecordsResolvers;
