import { gql } from "apollo-server-express";

const reviewedApplicantRecordType = gql`
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
    skillCategory: String
  }

  type ReviewedApplicantRecordDTO {
    applicantRecordId: String!
    reviewerId: Int!
    review: Review!
    status: ReviewStatus!
    score: Int
    reviewerHasConflict: Boolean!
  }

  extend type Mutation {
    updateReviewStatus(
      applicantRecordId: String!
      reviewerId: Int!
      status: ReviewStatus!
    ): ReviewedApplicantRecordDTO!
  }
`;

export default reviewedApplicantRecordType;
