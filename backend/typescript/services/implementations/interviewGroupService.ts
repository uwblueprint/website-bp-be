import InterviewGroup from "../../models/interviewGroup.model";
import { InterviewGroupDTO, InterviewGroupStatus } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import IInterviewGroupService from "../interfaces/IInterviewGroupService";

const Logger = logger(__filename);

function toInterviewGroupDTO(
  interviewGroup: InterviewGroup,
): InterviewGroupDTO {
  return {
    id: interviewGroup.id,
    schedulingLink: interviewGroup.schedulingLink,
    status: interviewGroup.status,
  };
}

class InterviewGroupService implements IInterviewGroupService {
  /* eslint-disable class-methods-use-this */
  async getInterviewGroup(id: string): Promise<InterviewGroupDTO> {
    try {
      const interviewGroup = await InterviewGroup.findByPk(id);
      if (!interviewGroup) {
        throw new Error(`No interview group found for id: ${id}`);
      }
      return toInterviewGroupDTO(interviewGroup);
    } catch (error: unknown) {
      Logger.error(
        `Failed to fetch interview group. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async createInterviewGroup(
    status: InterviewGroupStatus,
    schedulingLink?: string,
  ): Promise<InterviewGroupDTO> {
    try {
      const newInterviewGroup = await InterviewGroup.create({
        schedulingLink,
        status,
      });
      return toInterviewGroupDTO(newInterviewGroup);
    } catch (error: unknown) {
      Logger.error(
        `Failed to create interview group. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async updateInterviewGroup(
    id: string,
    status: InterviewGroupStatus,
    schedulingLink?: string,
  ): Promise<InterviewGroupDTO> {
    try {
      const interviewGroup = await InterviewGroup.findByPk(id);
      if (!interviewGroup) {
        throw new Error(`No interview group found for id: ${id}`);
      }
      if (schedulingLink) {
        interviewGroup.schedulingLink = schedulingLink;
      }
      interviewGroup.status = status;
      await interviewGroup.save();
      return toInterviewGroupDTO(interviewGroup);
    } catch (error: unknown) {
      Logger.error(
        `Failed to update interview group. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async deleteInterviewGroup(id: string): Promise<InterviewGroupDTO> {
    try {
      const interviewGroup = await InterviewGroup.findByPk(id);
      if (!interviewGroup) {
        throw new Error(`No interview group found for id: ${id}`);
      }
      await interviewGroup.destroy();
      return toInterviewGroupDTO(interviewGroup);
    } catch (error: unknown) {
      Logger.error(
        `Failed to delete interview group. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default InterviewGroupService;
