import { sequelize } from "../../models";
import InterviewDelegation from "../../models/interviewDelegation.model";
import {
  CreateInterviewDelegationDTO,
  DeleteInterviewDelegationDTO,
  InterviewDelegationDTO,
} from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import IInterviewDelegationsService from "../interfaces/IInterviewDelegationsService";

const Logger = logger(__filename);

function toInterviewDelegationDTO(
  delegation: InterviewDelegation,
): InterviewDelegationDTO {
  return {
    interviewedApplicantRecordId: delegation.interviewedApplicantRecordId,
    interviewerId: delegation.interviewerId,
    interviewHasConflict: delegation.interviewHasConflict,
  };
}

class InterviewDelegationsService implements IInterviewDelegationsService {
  /* eslint-disable class-methods-use-this */
  async createInterviewDelegation(
    interviewedApplicantRecordId: string,
    interviewerId: number,
  ): Promise<InterviewDelegationDTO> {
    try {
      const newDelegation = await InterviewDelegation.create({
        interviewedApplicantRecordId,
        interviewerId,
      });
      return toInterviewDelegationDTO(newDelegation);
    } catch (error: unknown) {
      Logger.error(
        `Failed to create interview delegation. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  // Note: endpoint should delete existing record and create new record in one transaction.
  async updateInterviewDelegation(
    interviewedApplicantRecordId: string,
    prevInterviewerId: number,
    newInterviewerId: number,
  ): Promise<InterviewDelegationDTO> {
    try {
      const updatedDelegation = await sequelize.transaction(async (t) => {
        const existingDelegation = await InterviewDelegation.findOne({
          where: {
            interviewedApplicantRecordId,
            interviewerId: prevInterviewerId,
          },
          transaction: t,
        });
        if (!existingDelegation) {
          throw new Error(
            `Interview delegation not found for interviewedApplicantRecordId: ${interviewedApplicantRecordId} and interviewerId: ${prevInterviewerId}`,
          );
        }
        await existingDelegation.destroy({ transaction: t });
        return InterviewDelegation.create(
          {
            interviewedApplicantRecordId,
            interviewerId: newInterviewerId,
          },
          { transaction: t },
        );
      });
      return toInterviewDelegationDTO(updatedDelegation);
    } catch (error: unknown) {
      Logger.error(
        `Failed to update interview delegation. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async getInterviewDelegation(
    interviewedApplicantRecordId: string,
    interviewerId: number,
  ): Promise<InterviewDelegationDTO> {
    try {
      const delegation = await InterviewDelegation.findOne({
        where: { interviewedApplicantRecordId, interviewerId },
      });
      if (!delegation) {
        throw new Error(
          `No interview delegation found for interviewedApplicantRecordId: ${interviewedApplicantRecordId} and interviewerId: ${interviewerId}`,
        );
      }
      return toInterviewDelegationDTO(delegation);
    } catch (error: unknown) {
      Logger.error(
        `Failed to fetch interview delegation. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async deleteInterviewDelegation(
    interviewedApplicantRecordId: string,
    interviewerId: number,
  ): Promise<InterviewDelegationDTO> {
    try {
      const delegation = await InterviewDelegation.findOne({
        where: { interviewedApplicantRecordId, interviewerId },
      });
      if (!delegation) {
        throw new Error(
          `No interview delegation found for interviewedApplicantRecordId: ${interviewedApplicantRecordId} and interviewerId: ${interviewerId}`,
        );
      }
      await delegation.destroy();
      return toInterviewDelegationDTO(delegation);
    } catch (error: unknown) {
      Logger.error(
        `Failed to delete interview delegation. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async bulkCreateInterviewDelegations(
    delegations: CreateInterviewDelegationDTO[],
  ): Promise<InterviewDelegationDTO[]> {
    try {
      const createdDelegations = await sequelize.transaction(async (t) => {
        const delegationRows = await InterviewDelegation.bulkCreate(
          delegations,
          { transaction: t },
        );
        return delegationRows;
      });
      return createdDelegations.map(toInterviewDelegationDTO);
    } catch (error: unknown) {
      Logger.error(
        `Failed to bulk create interview delegations. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async bulkDeleteInterviewDelegations(
    delegations: DeleteInterviewDelegationDTO[],
  ): Promise<InterviewDelegationDTO[]> {
    try {
      const deletedDelegations = await sequelize.transaction(async (t) => {
        const foundDelegations = await Promise.all(
          delegations.map(({ interviewedApplicantRecordId, interviewerId }) =>
            InterviewDelegation.findOne({
              where: { interviewedApplicantRecordId, interviewerId },
              transaction: t,
            }),
          ),
        );

        if (foundDelegations.some((d) => !d)) {
          throw new Error("Not all delegations were found, bulk delete failed");
        }

        const existingDelegations = foundDelegations as InterviewDelegation[];
        await Promise.all(
          existingDelegations.map((d) => d.destroy({ transaction: t })),
        );

        return existingDelegations;
      });

      return deletedDelegations.map(toInterviewDelegationDTO);
    } catch (error: unknown) {
      Logger.error(
        `Failed to bulk delete interview delegations. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }
}

export default InterviewDelegationsService;
