import { AdminCommentDTO, CreateAdminCommentDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import AdminComment from "../../models/adminComment.model";
import IAdminCommentService from "../interfaces/adminCommentService";

const Logger = logger(__filename);

const grabAdminComment = async (commentId: string): Promise<AdminComment> => {
  try {
    const adminComment = await AdminComment.findByPk(commentId);
    if (!adminComment) {
      throw new Error(`adminCommentId ${commentId} not found.`);
    }
    return adminComment;
  } catch (error: unknown) {
    Logger.error(
      `Failed to get admin comment. Reason = ${getErrorMessage(error)}`,
    );
    throw error;
  }
};

class AdminCommentService implements IAdminCommentService {
  /* eslint-disable class-methods-use-this */

  async getAdminCommentsByApplicantRecordId(
    reviewedApplicantRecordId: string,
  ): Promise<AdminCommentDTO[]> {
    let adminComments: AdminComment[] = [];
    let adminCommentDTOs: Array<AdminCommentDTO> = [];
    try {
      adminComments = await AdminComment.findAll({
        where: { reviewedApplicantRecordId },
      });
      adminCommentDTOs = await adminComments.map((adminComment) => {
        return {
          id: adminComment.id;
          userId: adminComment.userId;
          applicantRecordId: adminComment.applicantRecordId;
          comment: adminComment.comment;
          createdAt: adminComment.createdAt;
          updatedAt: adminComment.updatedAt;
        };
      });
    } catch (error: unknown) {
      Logger.error(
        `Failed to get admin comments by reviewedApplicantRecordId = ${reviewedApplicantRecordId}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
    return adminCommentDTOs;
  }

  async getAdminCommentById(id: string): Promise<AdminCommentDTO> {
    try {
      const adminComment = await grabAdminComment(id);
      return {
        id: String(adminComment.id),
        userId: adminComment.userId,
        applicantRecordId: String(adminComment.applicantRecordId),
        comment: adminComment.comment,
        createdAt: adminComment.createdAt.toISOString(),
        updatedAt: adminComment.updatedAt.toISOString(),
      };
    } catch (error: unknown) {
      Logger.error(
        `Failed to get admin comment by id = ${id}. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async createAdminComment(
    content: CreateAdminCommentDTO,
  ): Promise<AdminCommentDTO> {
    try {
      const adminComment = await AdminComment.create({
        userId: content.userId,
        applicantRecordId: content.applicantRecordId,
        comment: content.comment,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return {
        id: String(adminComment.id),
        userId: adminComment.userId,
        applicantRecordId: String(adminComment.applicantRecordId),
        comment: adminComment.comment,
        createdAt: adminComment.createdAt.toISOString(),
        updatedAt: adminComment.updatedAt.toISOString(),
      };
    } catch (error: unknown) {
      Logger.error(
        `Failed to create admin comment. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async updateAdminComment(
    commentId: string,
    content: CreateAdminCommentDTO,
  ): Promise<AdminCommentDTO> {
    const adminComment = await grabAdminComment(commentId);
    try {
      adminComment.comment = content.comment;
      adminComment.updatedAt = new Date();
      await adminComment.save();
      return {
        id: String(adminComment.id),
        userId: adminComment.userId,
        applicantRecordId: String(adminComment.applicantRecordId),
        comment: adminComment.comment,
        createdAt: adminComment.createdAt.toISOString(),
        updatedAt: adminComment.updatedAt.toISOString(),
      };
    } catch (error: unknown) {
      Logger.error(
        `Failed to update admin comment. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async deleteAdminCommentById(id: string): Promise<AdminCommentDTO> {
    const adminComment = await grabAdminComment(id);
    try {
      await adminComment.destroy();
      return {
        id: String(adminComment.id),
        userId: adminComment.userId,
        applicantRecordId: String(adminComment.applicantRecordId),
        comment: adminComment.comment,
        createdAt: adminComment.createdAt.toISOString(),
        updatedAt: adminComment.updatedAt.toISOString(),
      };
    } catch (error: unknown) {
      Logger.error(
        `Failed to delete admin comment. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default AdminCommentService;
