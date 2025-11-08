import { gql } from "apollo-server-express";
import {
  ApplicationStatus,
  PositionTitle,
  Review,
  ReviewerDTO,
  ReviewStatus,
  SkillCategory,
} from "../../types";

const reviewDashboardType = gql`
  type ReviewerDTO {
    firstName: String!
    lastName: String!
  }

  type ReviewDashboardRowDTO {
    firstName: String!
    lastName: String!
    position: String!
    timesApplied: String!
    applicationStatus: String!
    choice: Int!
    reviewers: [ReviewerDTO!]!
    totalScore: Int
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
    review: Review
    status: String!
    score: Int
    reviewerHasConflict: Boolean!
  }

  extend type Query {
    reviewDashboard(
      pageNumber: Int!
      resultsPerPage: Int!
    ): [ReviewDashboardRowDTO!]!
  }

  extend type Mutation {
    delegateReviewers: [ReviewedApplicantRecordDTO!]!
  }
`;

export default reviewDashboardType;
