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
  }
`;
 
export default reviewedApplicantRecordTypes;
