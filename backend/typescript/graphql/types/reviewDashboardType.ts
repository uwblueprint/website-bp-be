import { gql } from "apollo-server-express";

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

  enum DepartmentEnum {
    Engineering
    Design
    Product
    Community
  }

  enum AdditionalFiltersEnum {
    IN_REVIEW
    REVIEWED
    SELECTED
    NOT_SELECTED
    SENIOR
    INTERMEDIATE
    JUNIOR
    GREATER_THAN_25
    BETWEEN_20_AND_25
    BETWEEN_15_AND_20
    BETWEEN_10_AND_15
    LESS_THAN_10
    FIRST_YEAR
    SECOND_YEAR
    THIRD_YEAR
    FOURTH_YEAR
    FIFTH_YEAR
    SIXTH_YEAR
  }

  input ReviewDashboardFilter {
    department: DepartmentEnum
    role: [String!]
    additionalFilters: [AdditionalFiltersEnum!]
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
      filter: ReviewDashboardFilter
    ): [ReviewDashboardRowDTO!]!

    reviewDashboardSidePanel(applicantId: String!): ReviewDashboardSidePanelDTO!
  }
`;

export default reviewDashboardType;
