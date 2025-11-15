import {
  PositionTitle,
  ReviewDashboardRowDTO,
  ReviewDashboardSidePanelDTO,
} from "../../types";
import IReviewDashboardService from "../interfaces/IReviewDashboardService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import ApplicantRecord from "../../models/applicantRecord.model";

const Logger = logger(__filename);

function toDTO(model: ApplicantRecord): ReviewDashboardRowDTO {
  return {
    firstName: model.applicant!.firstName,
    lastName: model.applicant!.lastName,
    position: model.position as PositionTitle,
    timesApplied: model.applicant!.timesApplied.toString(),
    applicationStatus: model.status,
    choice: model.choice,
    reviewers: model.reviewedApplicantRecords!.map((r) => ({
      firstName: r.user!.first_name,
      lastName: r.user!.last_name,
    })),
    totalScore: model.combined_score,
  };
}

function toSidePanelDTO(model: ApplicantRecord): ReviewDashboardSidePanelDTO {
  const reviewDetails =
    model.reviewedApplicantRecords?.map((reviewRecord) => ({
      reviewerFirstName: reviewRecord.user?.first_name || "",
      reviewerLastName: reviewRecord.user?.last_name || "",
      review: reviewRecord.review,
    })) || [];

  return {
    firstName: model.applicant!.firstName,
    lastName: model.applicant!.lastName,
    positionTitle: model.position as PositionTitle,
    program: model.applicant!.program,
    resumeUrl: model.applicant!.resumeUrl,
    applicationStatus: model.status,
    skillCategory: model.skillCategory,
    reviewDetails,
  };
}

class ReviewDashboardService implements IReviewDashboardService {
  /* eslint-disable class-methods-use-this */
  async getReviewDashboard(
    pageNumber: number,
    resultsPerPage: number,
  ): Promise<ReviewDashboardRowDTO[]> {
    try {
      const perPage = Number.isFinite(Number(resultsPerPage))
        ? Number(resultsPerPage)
        : 1;
      const currentPage = Number.isFinite(Number(pageNumber))
        ? Number(pageNumber)
        : 1;
      const offsetRow = (currentPage - 1) * perPage;

      // get applicant_record
      // JOIN applicant ON applicant_id
      // JOIN reviewed_applicant_record ON applicant_record_id
      // JOIN user ON reviewer_id
      const applicants: Array<ApplicantRecord> | null =
        await ApplicantRecord.findAll({
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              attributes: { exclude: ["createdAt", "updatedAt"] },
              association: "reviewedApplicantRecords",
              include: [
                {
                  attributes: { exclude: ["createdAt", "updatedAt"] },
                  association: "user",
                },
              ],
            },
            {
              attributes: { exclude: ["createdAt", "updatedAt"] },
              association: "applicant",
            },
          ],
          order: [["id", "ASC"]],
          limit: perPage,
          offset: offsetRow,
        });
      return applicants.map(toDTO);
    } catch (error: unknown) {
      Logger.error(
        `Failed to get dashboard. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async getReviewDashboardSidePanel(
    applicantId: string,
  ): Promise<ReviewDashboardSidePanelDTO> {
    try {
      const applicantRecord: ApplicantRecord | null =
        await ApplicantRecord.findOne({
          where: { applicantId },
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              attributes: { exclude: ["createdAt", "updatedAt"] },
              association: "reviewedApplicantRecords",
              include: [
                {
                  attributes: { exclude: ["createdAt", "updatedAt"] },
                  association: "user",
                },
              ],
            },
            {
              attributes: { exclude: ["createdAt", "updatedAt"] },
              association: "applicant",
            },
          ],
        });

      if (!applicantRecord || !applicantRecord.applicant) {
        throw new Error(`Applicant with ID ${applicantId} not found`);
      }

      return toSidePanelDTO(applicantRecord);
    } catch (error: unknown) {
      Logger.error(
        `Failed to get review dashboard side panel for applicant ${applicantId}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }
}

export default ReviewDashboardService;
