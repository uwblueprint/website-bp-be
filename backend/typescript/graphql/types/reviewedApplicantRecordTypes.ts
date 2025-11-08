import { gql } from "apollo-server-express";

const reviewedApplicantRecordTypes = gql`
  type ReviewedApplicantRecord {
    applicantRecordId: ID!
    reviewerId: Int!
    review: JSON
    status: String
    score: Int
    reviewerHasConflict: Boolean
  }

  input CreateReviewedApplicantRecordInput {
    applicantRecordId: ID!
    reviewerId: Int!
    review: JSON
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
      applicantRecordId: ID!
      reviewerId: Int!
    ): ReviewedApplicantRecord!

    bulkDeleteReviewedApplicantRecord(
      applicantRecordIds: [ID!]!
      reviewerId: Int!
    ): [ReviewedApplicantRecord!]!
  }
`;
 
export default reviewedApplicantRecordTypes;
