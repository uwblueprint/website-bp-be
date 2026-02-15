import { gql } from "apollo-server-express";

const reviewedApplicantRecordTypes = gql`
  enum SkillCategory {
    JUNIOR
    INTERMEDIATE
    SENIOR
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
    status: String
    score: Int
    reviewerHasConflict: Boolean
  }

  input CreateReviewedApplicantRecordInput {
    applicantRecordId: ID!
    reviewerId: Int!
    review: ReviewInput
    status: String
  }

  input DeleteReviewedApplicantRecord {
    applicantRecordId: ID!
    reviewerId: Int!
  }

  input UpdateReviewedApplicantRecordInput {
    applicantRecordId: ID!
    reviewerId: Int!
    review: ReviewInput
    status: String
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

    updateReviewedApplicantRecord(
      input: UpdateReviewedApplicantRecordInput!
    ): ReviewedApplicantRecord!
  }
`;

export default reviewedApplicantRecordTypes;
