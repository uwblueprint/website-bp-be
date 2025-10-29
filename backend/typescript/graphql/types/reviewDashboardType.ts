import { gql } from "apollo-server-express";
import { ApplicationStatus, PositionTitle, ReviewerDTO } from "../../types";

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

  extend type Query {
    reviewDashboard(
      pageNumber: Int!
      resultsPerPage: Int!
    ): [ReviewDashboardRowDTO!]!
  }
`;

export default reviewDashboardType;
