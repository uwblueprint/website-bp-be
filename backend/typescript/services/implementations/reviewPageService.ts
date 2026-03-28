import {
  ApplicationDTO,
  InterviewedApplicantsDTO,
  InterviewPairingsDTO,
  ReviewedApplicantRecordDTO,
  ReviewedApplicantsDTO,
  UserDTO,
} from "../../types";
import IReviewPageService from "../interfaces/IReviewPageService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import ApplicantRecord from "../../models/applicantRecord.model";
import ReviewedApplicantRecord from "../../models/reviewedApplicantRecord.model";
import Applicant from "../../models/applicant.model";
import User from "../../models/user.model";
import { Op } from "sequelize";
import InterviewedApplicantRecord from "../../models/interviewedApplicantRecord.model";
import InterviewDelegation from "../../models/interviewDelegation.model";

const Logger = logger(__filename);

function toApplicationDTO(model: Applicant): ApplicationDTO {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const firstChoice = model.applicantRecords!.find((ar) => ar.choice === 1);
  const secondChoice = model.applicantRecords!.find((ar) => ar.choice === 2);

  return {
    id: model.id,
    academicOrCoop: model.academicOrCoop,
    academicYear: model.academicYear,
    email: model.email,
    firstChoiceRole: firstChoice!.position,
    firstName: model.firstName,
    lastName: model.lastName,
    heardFrom: model.heardFrom,
    locationPreference: model.locationPreference,
    program: model.program,
    timesApplied: model.timesApplied.toString(),
    pronouns: model.pronouns,
    pronounsSpecified: model.pronouns,
    resumeUrl: model.resumeUrl,
    roleSpecificQuestions: firstChoice!.roleSpecificQuestions,
    secondChoiceRole: secondChoice ? secondChoice.position : "",
    shortAnswerQuestions: model.shortAnswerQuestions,
    status: firstChoice!.status,
    term: model.term,
    secondChoiceStatus: secondChoice ? secondChoice.status : "",
    /* timestamp: model.submittedAt.getSeconds(), */
  };
}

function toReviewedApplicantsDTO(
  model: ReviewedApplicantRecord,
): ReviewedApplicantsDTO {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  return {
    applicantRecordId: model.applicantRecordId,
    reviewStatus: model.status,
    applicantFirstName: model.applicantRecord!.applicant!.firstName,
    applicantLastName: model.applicantRecord!.applicant!.lastName,
  };
}

function toReviewedApplicantRecordDTO(
  model: ReviewedApplicantRecord,
): ReviewedApplicantRecordDTO {
  return {
    applicantRecordId: model.applicantRecordId,
    reviewerId: model.reviewerId,
    review: model.review,
    status: model.status,
    reviewerHasConflict: model.reviewerHasConflict,
  };
}

function toUserDTO(model: User): UserDTO {
  return {
    id: String(model.id),
    firstName: model.first_name,
    lastName: model.last_name,
    email: model.email,
    position: model.position,
    role: model.role,
  };
}

class ReviewPageService implements IReviewPageService {
  /* eslint-disable class-methods-use-this */
  async getReviewPage(applicantRecordId: string): Promise<ApplicationDTO> {
    try {
      const applicantRecord: ApplicantRecord | null =
        await ApplicantRecord.findOne({
          where: { id: applicantRecordId },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });
      if (!applicantRecord) {
        throw new Error(`Database integrity has been violated`);
      }

      const applicant: Applicant | null = await Applicant.findOne({
        where: { id: applicantRecord.applicantId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            attributes: { exclude: ["createdAt", "updatedAt"] },
            association: "applicantRecords",
          },
        ],
      });
      if (!applicant) {
        throw new Error(`Database integrity has been violated`);
      }

      return toApplicationDTO(applicant);
    } catch (error: unknown) {
      Logger.error(`Failed to fetch. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async getReviewedApplicantsByUserId(
    userId: number,
  ): Promise<ReviewedApplicantsDTO[]> {
    try {
      const user: User | null = await User.findOne({
        where: { id: userId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            attributes: { exclude: ["createdAt", "updatedAt"] },
            association: "reviewedApplicantRecords",
            include: [
              {
                attributes: { exclude: ["createdAt", "updatedAt"] },
                association: "applicantRecord",
                include: [
                  {
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    association: "applicant",
                  },
                ],
              },
            ],
          },
        ],
      });
      if (!user) {
        throw new Error(`No user with ${userId} found.`);
      }
      if (!user.reviewedApplicantRecords) {
        return [];
      }
      return user.reviewedApplicantRecords.map(toReviewedApplicantsDTO);
    } catch (error: unknown) {
      Logger.error(`Failed to fetch. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async reportReviewConflict(
    applicantRecordId: string,
    reviewerId: number,
  ): Promise<ReviewedApplicantRecordDTO> {
    try {
      const reviewedApplicantRecord: ReviewedApplicantRecord | null =
        await ReviewedApplicantRecord.findOne({
          where: { applicantRecordId, reviewerId },
        });
      if (!reviewedApplicantRecord) {
        throw new Error(
          `No reviewed applicant record with ${applicantRecordId} and ${reviewerId} found.`,
        );
      }
      reviewedApplicantRecord.reviewerHasConflict = true;
      await reviewedApplicantRecord.save();
      return toReviewedApplicantRecordDTO(reviewedApplicantRecord);
    } catch (error: unknown) {
      Logger.error(
        `Failed to report conflict. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async getInterviewedApplicantsByUserId(
    userId: number,
  ): Promise<InterviewedApplicantsDTO[]> {
    try {
      const reviewedApplicantRecords = await ReviewedApplicantRecord.findAll({
        where: { reviewerId: userId },
        attributes: ["applicantRecordId"],
      });

      if (!reviewedApplicantRecords.length) {
        return [];
      }

      const applicantRecordIds = reviewedApplicantRecords.map(
        (record) => record.applicantRecordId,
      );

      const interviewedApplicantRecords =
        await InterviewedApplicantRecord.findAll({
          where: { applicantRecordId: { [Op.in]: applicantRecordIds } },
          include: [
            {
              association: "applicantRecord",
              include: [
                {
                  association: "applicant",
                },
              ],
            },
          ],
        });

      const interviewedApplicantRecordIds = interviewedApplicantRecords.map(
        (record) => record.id,
      );

      if (!interviewedApplicantRecordIds.length) {
        return [];
      }

      const assignedDelegations = await InterviewDelegation.findAll({
        where: {
          interviewerId: userId,
          interviewedApplicantRecordId: {
            [Op.in]: interviewedApplicantRecordIds,
          },
        },
        attributes: ["interviewedApplicantRecordId"],
      });

      const assignedInterviewedApplicantRecordIds = new Set(
        assignedDelegations.map(
          (delegation) => delegation.interviewedApplicantRecordId,
        ),
      );

      return interviewedApplicantRecords
        .filter((record) =>
          assignedInterviewedApplicantRecordIds.has(record.id),
        )
        .map((record) => ({
          applicantRecordId: record.applicantRecordId,
          interviewStatus: record.status,
          applicantFirstName:
            record.applicantRecord?.applicant?.firstName ?? "",
          applicantLastName: record.applicantRecord?.applicant?.lastName ?? "",
        }));
    } catch (error: unknown) {
      Logger.error(`Failed to fetch. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async getInterviewedPairingsByUserId(
    userId: number,
  ): Promise<InterviewPairingsDTO[]> {
    try {
      const reviewedApplicantRecords = await ReviewedApplicantRecord.findAll({
        where: { reviewerId: userId },
        attributes: ["applicantRecordId"],
      });

      if (!reviewedApplicantRecords.length) {
        return [];
      }

      const applicantRecordIds = reviewedApplicantRecords.map(
        (record) => record.applicantRecordId,
      );

      const interviewedApplicantRecords =
        await InterviewedApplicantRecord.findAll({
          where: { applicantRecordId: { [Op.in]: applicantRecordIds } },
          attributes: ["id"],
        });

      const interviewedApplicantRecordIds = interviewedApplicantRecords.map(
        (record) => record.id,
      );

      if (!interviewedApplicantRecordIds.length) {
        return [];
      }

      const assignedDelegations = await InterviewDelegation.findAll({
        where: {
          interviewerId: userId,
          interviewedApplicantRecordId: {
            [Op.in]: interviewedApplicantRecordIds,
          },
        },
        include: [
          {
            association: "interviewGroup",
            include: [
              {
                association: "interviewDelegations",
                include: [{ association: "interviewer" }],
              },
            ],
          },
        ],
      });

      const pairingsByGroupId = new Map<string, InterviewPairingsDTO>();

      assignedDelegations.forEach((delegation) => {
        const group = delegation.interviewGroup;
        if (!group) {
          return;
        }

        if (!pairingsByGroupId.has(group.id)) {
          pairingsByGroupId.set(group.id, {
            interviewedGroupId: group.id,
            interviewGroupStatus: group.status,
            groupMembers: [],
          });
        }

        const pairing = pairingsByGroupId.get(group.id);
        if (!pairing) {
          return;
        }

        const dedupedMembers = new Map<string, UserDTO>();
        group.interviewDelegations?.forEach((groupDelegation) => {
          if (!groupDelegation.interviewer) {
            return;
          }
          const member = toUserDTO(groupDelegation.interviewer);
          dedupedMembers.set(member.id, member);
        });

        pairing.groupMembers = Array.from(dedupedMembers.values());
      });

      return Array.from(pairingsByGroupId.values());
    } catch (error: unknown) {
      Logger.error(`Failed to fetch. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }
}

export default ReviewPageService;
