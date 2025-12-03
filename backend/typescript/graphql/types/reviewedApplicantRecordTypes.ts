import { gql } from "apollo-server-express";

const reviewedApplicantRecordTypes = gql`
  enum SkillCategory {
    JUNIOR
    INTERMEDIATE
    SENIOR
  }

  enum ReviewStatus {
    NeedsReview
    InProgress
    Done
    ConflictReported
  }

  type Review {
    passionFSG: Int
    teamPlayer: Int
    desireToLearn: Int
    skill: Int
    skillCategory: SkillCategory
    comments: String
  }

  input ReviewInput {
    passionFSG: Int
    teamPlayer: Int
    desireToLearn: Int
    skill: Int
    skillCategory: SkillCategory
  }

  type ReviewedApplicantRecord {
    applicantRecordId: ID!
    reviewerId: Int!
    review: Review
    status: ReviewStatus
    score: Int
    reviewerHasConflict: Boolean
  }

  input CreateReviewedApplicantRecordInput {
    applicantRecordId: ID!
    reviewerId: Int!
    review: ReviewInput
    status: ReviewStatus
  }

  input DeleteReviewedApplicantRecord {
    applicantRecordId: ID!
    reviewerId: Int!
  }

  extend type Mutation {
    createReviewedApplicantRecord(
      input: CreateReviewedApplicantRecordInput!
    ): ReviewedApplicantRecord!

    bulkCreateReviewedApplicantRecord(
      inputs: [CreateReviewedApplicantRecordInput!]!
    ): [ReviewedApplicantRecord!]!

    deleteReviewedApplicantRecord(
      input: DeleteReviewedApplicantRecord!
    ): ReviewedApplicantRecord!

    bulkDeleteReviewedApplicantRecord(
      inputs: [DeleteReviewedApplicantRecord!]!
    ): [ReviewedApplicantRecord!]!

    updateReviewStatus(
      applicantRecordId: ID!
      reviewerId: Int!
      status: ReviewStatus!
    ): ReviewedApplicantRecord!
  }
`;

export default reviewedApplicantRecordTypes;
