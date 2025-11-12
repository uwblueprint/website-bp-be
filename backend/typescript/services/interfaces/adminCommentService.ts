import { AdminCommentDTO, CreateAdminCommentDTO } from "../../types";

interface IAdminCommentService {
  createAdminComment(content: CreateAdminCommentDTO): Promise<AdminCommentDTO>;
  updateAdminComment(
    commentId: string,
    content: CreateAdminCommentDTO,
  ): Promise<AdminCommentDTO>;
  deleteAdminCommentById(id: string): Promise<AdminCommentDTO>;
}

export default IAdminCommentService;
