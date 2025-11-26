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

  type ReviewedApplicantRecordDTO {
    applicantRecordId: String!
    reviewerId: Int!
    review: Review
    status: String!
    score: Int
    reviewerHasConflict: Boolean!
  }

  type Review {
    passionFSG: Int
    teamPlayer: Int
    desireToLearn: Int
    skill: Int
    skillCategory: String
    comments: String
  }

  type ReviewDetails {
    reviewerFirstName: String!
    reviewerLastName: String!
    review: Review!
  }

  type ReviewDashboardSidePanelDTO {
    firstName: String!
    lastName: String!
    positionTitle: String!
    program: String!
    resumeUrl: String!
    applicationStatus: String!
    skillCategory: String
    reviewDetails: [ReviewDetails!]!
  }

  extend type Query {
    reviewDashboard(
      pageNumber: Int!
      resultsPerPage: Int!
    ): [ReviewDashboardRowDTO!]!

    reviewDashboardSidePanel(applicantId: String!): ReviewDashboardSidePanelDTO!
  }

  extend type Mutation {
    delegateReviewers(positions: [String!]!): [ReviewedApplicantRecordDTO!]!
  }
`;

export default reviewDashboardType;
