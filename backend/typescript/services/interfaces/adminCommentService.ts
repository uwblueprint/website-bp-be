import { AdminCommentDTO, CreateAdminCommentDTO } from "../../types";

interface IAdminCommentService {
  getAdminCommentsByApplicantRecordId(reviewedApplicantRecordId: string): Promise<AdminCommentDTO[]>;
  getAdminCommentById(id: string): Promise<AdminCommentDTO>;
  createAdminComment(content: CreateAdminCommentDTO): Promise<AdminCommentDTO>;
  updateAdminComment(
    commentId: string,
    content: CreateAdminCommentDTO,
  ): Promise<AdminCommentDTO>;
  deleteAdminCommentById(id: string): Promise<AdminCommentDTO>;
}

export default IAdminCommentService;
