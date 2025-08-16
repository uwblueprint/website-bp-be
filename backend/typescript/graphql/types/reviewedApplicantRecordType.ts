import { gql } from "apollo-server-express";

const reviewedApplicantRecordType = gql`
  type Review {
    passionFSG: Int
    teamPlayer: Int
    desireToLearn: Int
    skill: Int
    skillCategory: SkillCategory
  }

  enum SkillCategory {
    Junior
    Intermediate
    Senior
  }

  input ReviewInput {
    passionFSG: Int
    teamPlayer: Int
    desireToLearn: Int
    skill: Int
    skillCategory: SkillCategory
  }

  type ReviewedApplicantRecordDTO {
    applicantRecordId: ID!
    reviewerId: ID!
    review: Review
    status: String!
  }

  input ReviewedApplicantRecordPK {
    reviewerId: ID!
    applicantRecordId: ID!
  }

  extend type Mutation {
    createReviewedApplicantRecord(
      reviewedApplicantRecordPK: ReviewedApplicantRecordPK!
    ): ReviewedApplicantRecordDTO!

    bulkCreateReviewedApplicantRecords(
      reviewedApplicantRecordPKs: [ReviewedApplicantRecordPK!]!
    ): [ReviewedApplicantRecordDTO!]!

    updateReviewedApplicantRecordReview(
      reviewedApplicantRecordPK: ReviewedApplicantRecordPK!
      review: ReviewInput!
    ): ReviewedApplicantRecordDTO!

    updateReviewedApplicantRecordStatus(
      reviewedApplicantRecordPK: ReviewedApplicantRecordPK!
      status: String!
    ): ReviewedApplicantRecordDTO!
  }
`;

export default reviewedApplicantRecordType;
