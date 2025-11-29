import { literal, Op, Sequelize } from "sequelize";
import {
  AdditionalFilters,
  Department,
  PositionTitle,
  ReviewDashboardFilter,
  ReviewDashboardRowDTO,
  ReviewDashboardSidePanelDTO,
  ApplicantRole,
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
    position: model.position,
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

function buildWhereStatement(filter?: ReviewDashboardFilter) {
  const exp: any = [];
  const ranges: any = [];
  const year: any = [];
  const skill: any = [];
  const status: any = [];
  if (filter) {
    if (filter.department) {
      if (filter.department === Department.Community) {
        exp.push({ "$appliedTo.department$": { [Op.eq]: "Community" } });
      } else if (filter.department === Department.Design) {
        exp.push({ "$appliedTo.department$": { [Op.eq]: "Design" } });
      } else if (filter.department === Department.Engineering) {
        exp.push({ "$appliedTo.department$": { [Op.eq]: "Engineering" } });
      } else if (filter.department === Department.Product) {
        exp.push({ "$appliedTo.department$": { [Op.eq]: "Product" } });
      }
    }

    if (filter.role) {
      if (filter.role.toString() === "int_dir") {
        exp.push({ position: { [Op.eq]: "Internal Director" } });
      } else if (filter.role.toString() === "ext_dir") {
        exp.push({ position: { [Op.eq]: "External Director" } });
      } else if (filter.role.toString() === "pres") {
        exp.push({ position: { [Op.eq]: "President" } });
      } else if (filter.role.toString() === "vpe") {
        exp.push({ position: { [Op.eq]: "VP Engineering" } });
      } else if (filter.role.toString() === "vpd") {
        exp.push({ position: { [Op.eq]: "VP Design" } });
      } else if (filter.role.toString() === "vpp") {
        exp.push({ position: { [Op.eq]: "VP Product" } });
      } else if (filter.role.toString() === "vpt") {
        exp.push({ position: { [Op.eq]: "VP Talent" } });
      } else if (filter.role.toString() === "vp_ext") {
        exp.push({ position: { [Op.eq]: "VP External" } });
      } else if (filter.role.toString() === "vp_int") {
        exp.push({ position: { [Op.eq]: "VP Internal" } });
      } else if (filter.role.toString() === "vp_comms") {
        exp.push({ position: { [Op.eq]: "VP Community" } });
      } else if (filter.role.toString() === "vp_scoping") {
        exp.push({ position: { [Op.eq]: "VP Scoping" } });
      } else if (filter.role.toString() === "vp_finance") {
        exp.push({ position: { [Op.eq]: "VP Finance" } });
      } else if (filter.role.toString() === "pm") {
        exp.push({ position: { [Op.eq]: "Project Manager" } });
      } else if (filter.role.toString() === "pl") {
        exp.push({ position: { [Op.eq]: "Project Lead" } });
      } else if (filter.role.toString() === "design_mentor") {
        exp.push({ position: { [Op.eq]: "Design Mentor" } });
      } else if (filter.role.toString() === "graphic_design") {
        exp.push({ position: { [Op.eq]: "Graphic Design" } });
      } else if (filter.role.toString() === "product_design") {
        exp.push({ position: { [Op.eq]: "Product Design" } });
      } else if (filter.role.toString() === "uxr") {
        exp.push({ position: { [Op.eq]: "User Researcher" } });
      } else if (filter.role.toString() === "dev") {
        exp.push({ position: { [Op.eq]: "Developer" } });
      }
    }

    if (filter.additionalFilters) {
      if (
        filter.additionalFilters.includes(AdditionalFilters.GREATER_THAN_25)
      ) {
        ranges.push({ combined_score: { [Op.gt]: 25 } });
      }
      if (
        filter.additionalFilters.includes(AdditionalFilters.BETWEEN_20_AND_25)
      ) {
        ranges.push({ combined_score: { [Op.between]: [20, 25] } });
      }
      if (
        filter.additionalFilters.includes(AdditionalFilters.BETWEEN_15_AND_20)
      ) {
        ranges.push({ combined_score: { [Op.between]: [15, 20] } });
      }
      if (
        filter.additionalFilters.includes(AdditionalFilters.BETWEEN_10_AND_15)
      ) {
        ranges.push({ combined_score: { [Op.between]: [10, 15] } });
      }
      if (filter.additionalFilters.includes(AdditionalFilters.LESS_THAN_10)) {
        ranges.push({ combined_score: { [Op.lt]: 10 } });
      }
      if (filter.additionalFilters.includes(AdditionalFilters.SENIOR)) {
        skill.push({ skillCategory: { [Op.eq]: "Senior" } });
      }
      if (filter.additionalFilters.includes(AdditionalFilters.JUNIOR)) {
        skill.push({ skillCategory: { [Op.eq]: "Junior" } });
      }
      if (filter.additionalFilters.includes(AdditionalFilters.INTERMEDIATE)) {
        skill.push({ skillCategory: { [Op.eq]: "Intermediate" } });
      }
      if (filter.additionalFilters.includes(AdditionalFilters.FIRST_YEAR)) {
        year.push({ "$applicant.academicYear$": { [Op.regexp]: "1(A|B)" } });
      }
      if (filter.additionalFilters.includes(AdditionalFilters.SECOND_YEAR)) {
        year.push({ "$applicant.academicYear$": { [Op.regexp]: "2(A|B)" } });
      }
      if (filter.additionalFilters.includes(AdditionalFilters.THIRD_YEAR)) {
        year.push({ "$applicant.academicYear$": { [Op.regexp]: "3(A|B)" } });
      }
      if (filter.additionalFilters.includes(AdditionalFilters.FOURTH_YEAR)) {
        year.push({ "$applicant.academicYear$": { [Op.regexp]: "4(A|B)" } });
      }
      if (filter.additionalFilters.includes(AdditionalFilters.FIFTH_YEAR)) {
        year.push({ "$applicant.academicYear$": { [Op.regexp]: "5(A|B)" } });
      }
      if (filter.additionalFilters.includes(AdditionalFilters.SIXTH_YEAR)) {
        year.push({
          "$applicant.academicYear$": { [Op.iRegexp]: "graduate" },
        });
      }
      if (filter.additionalFilters.includes(AdditionalFilters.IN_REVIEW)) {
        status.push({ status: { [Op.eq]: "In Review" } });
      }
      if (filter.additionalFilters.includes(AdditionalFilters.REVIEWED)) {
        status.push({ status: { [Op.eq]: "Reviewed" } });
      }
      if (filter.additionalFilters.includes(AdditionalFilters.SELECTED)) {
        status.push({ status: { [Op.eq]: "Selected for Interview" } });
      }
      if (filter.additionalFilters.includes(AdditionalFilters.NOT_SELECTED)) {
        status.push({ status: { [Op.eq]: "Not Considered" } });
      }
    }
  }

  if (ranges.length > 0) exp.push({ [Op.or]: ranges });
  if (skill.length > 0) exp.push({ [Op.or]: skill });
  if (year.length > 0) exp.push({ [Op.or]: year });
  if (status.length > 0) exp.push({ [Op.or]: status });
  return exp;
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
    filters?: ReviewDashboardFilter,
  ): Promise<ReviewDashboardRowDTO[]> {
    try {
      const perPage = Number.isFinite(Number(resultsPerPage))
        ? Number(resultsPerPage)
        : 1;
      const currentPage = Number.isFinite(Number(pageNumber))
        ? Number(pageNumber)
        : 1;
      const offsetRow = (currentPage - 1) * perPage;

      const whereStatement = buildWhereStatement(filters);

      // get applicant_record
      // JOIN applicant ON applicant_id
      // JOIN reviewed_applicant_record ON applicant_record_id
      // JOIN user ON reviewer_id
      const applicants: Array<ApplicantRecord> | null =
        await ApplicantRecord.findAll({
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
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
              required: true,
            },
            {
              attributes: { exclude: ["createdAt", "updatedAt"] },
              association: "appliedTo",
              required: true,
              on: literal(
                `"ApplicantRecord"."position"::text = "appliedTo"."title"::text`,
              ),
            },
          ],
          where:
            whereStatement.length > 0
              ? { [Op.and]: whereStatement }
              : undefined,
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
