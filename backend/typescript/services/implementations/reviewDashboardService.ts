import { Op } from "sequelize";
import {
  ReviewDashboardRowDTO,
  ReviewedApplicantRecordDTO,
  CreateReviewedApplicantRecordDTO,
  ReviewDashboardSidePanelDTO,
  PositionTitle,
} from "../../types";
import IReviewDashboardService from "../interfaces/IReviewDashboardService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import ApplicantRecord from "../../models/applicantRecord.model";
import User from "../../models/user.model";
import ReviewedApplicantRecordService from "./reviewedApplicantRecordService";

const Logger = logger(__filename);

const reviewedApplicantRecordService = new ReviewedApplicantRecordService();

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

  async delegateReviewers(
    positions: string[],
  ): Promise<ReviewedApplicantRecordDTO[]> {
    // NOTE: We do not have to concern ourselves with locality. That is, each user can be
    //       assigned to the same partner every time.

    const delegations = Array<CreateReviewedApplicantRecordDTO>();
    // maps (applicant_record_id) => pair of user_ids assigned to it

    // STEP 1:
    //   Populate the FSM
    //   NOTE: need to add a sentinel value at the end of the list if the number of user is odd.
    //         The last 'real' user will bear the burden of solo reviewing.

    // Get users and group by position
    const groups = (
      await User.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: { position: { [Op.in]: positions } },
      })
    ).reduce((map, user) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const pos = user.position!;
      const arr = map.get(pos) ?? [];
      arr.push(user.id);
      map.set(pos, arr);
      return map;
    }, new Map<string, number[]>());

    // Build FSM
    // maps (position title) => (current index of list, list of users with position_title)
    const FSM = new Map<string, [number, (number | undefined)[]]>(
      positions.map((title) => [title, [0, groups.get(title) ?? []]]),
    );

    // Validate FSM for correctness
    Array.from(FSM.entries()).forEach(([title, [, userIds]]) => {
      if (userIds.length === 0) {
        // no users with this position
        throw new Error(`Invalid amount of users with position ${title}.`);
      }
      if (userIds.length % 2 !== 0) {
        // sentinel value of undefined at the end
        userIds.push(undefined);
      }
    });

    // STEP 2:
    //   Round robin with the FSM
    /*
    for (auto& a : applicant_records) {
      pair<int,vector<string>>& position_entry = FSM[a.position];

      // get first user
      string id1 = position_entry.second[position_entry.first];
      position_entry.first++;
      position_entry.first %= position_entry.second.size();

      // get second user
      string id2 = position_entry.second[position_entry.first];
      position_entry.first++;
      position_entry.first %= position_entry.second.size();

      delegations[a.id] = make_pair(id1, id2);
    }
     */
    const applicantRecords = await ApplicantRecord.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { position: { [Op.in]: positions } },
    });
    applicantRecords.forEach((record) => {
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      const [count, userIds] = FSM.get(record.position)!;
      let newCount = count;
      const assignedReviewer1 = FSM.get(record.position)![1][newCount];
      newCount++;
      newCount %= FSM.get(record.position)![1].length;
      const assignedReviewer2 = FSM.get(record.position)![1][newCount];
      newCount++;
      newCount %= FSM.get(record.position)![1].length;
      FSM.set(record.position, [newCount, userIds]);

      if (assignedReviewer1 !== undefined) {
        delegations.push({
          applicantRecordId: record.id,
          reviewerId: assignedReviewer1,
        });
      }

      if (assignedReviewer2 !== undefined) {
        delegations.push({
          applicantRecordId: record.id,
          reviewerId: assignedReviewer2,
        });
      }
    });

    // STEP 3:
    //   Batch the delegations into ReviewedApplicantRecords
    //   NOTE: do not add the sentinel value we inserted earlier.
    return reviewedApplicantRecordService.bulkCreateReviewedApplicantRecord(
      delegations,
    );
  }
}

export default ReviewDashboardService;
