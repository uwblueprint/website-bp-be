import AdminCommentService from "../../services/implementations/adminCommentService";
import IAdminCommentService from "../../services/interfaces/adminCommentService";
import { CreateAdminCommentDTO, AdminCommentDTO } from "../../types";

const adminCommentService: IAdminCommentService = new AdminCommentService();

const adminCommentResolvers = {
  Mutation: {
    createAdminComment: async (
      _parent: undefined,
      { adminComment }: { adminComment: CreateAdminCommentDTO },
    ): Promise<AdminCommentDTO> => {
      const newAdminComment = await adminCommentService.createAdminComment(
        adminComment,
      );
      return newAdminComment;
    },
    updateAdminComment: async (
      _parent: undefined,
      { id, content }: { id: string; content: CreateAdminCommentDTO },
    ): Promise<AdminCommentDTO> => {
      const adminComment = await adminCommentService.updateAdminComment(
        id,
        content,
      );
      return adminComment;
    },
    deleteAdminCommentById: async (
      _parent: undefined,
      { id }: { id: string },
    ): Promise<AdminCommentDTO> => {
      const adminComment = await adminCommentService.deleteAdminCommentById(id);
      return adminComment;
    },
  },
};

export default adminCommentResolvers;
