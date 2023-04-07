import { gql } from "apollo-server-express";

const dashboardType = gql`
  type ApplicationDashboardDTO {
    id: Int!
    reviewerEmail: String!
    passionFSG: Int!
    teamPlayer: Int!
    desireToLearn: Int!
    skill: Int!
    skillCategory: String!
    reviewerId: Int!
    applicationId: Int!
  }

  extend type Query {
    dashboardById(id: Int!): ApplicationDashboardDTO!
  }

  extend type Mutation {
    changeRating(
      id: Int!
      ratingToBeChanged: String!
      newValue: Int!
    ): ApplicationDashboardDTO!
    changeSkillCategory(id: Int!, newValue: String!): ApplicationDashboardDTO!
  }
`;

export default dashboardType;

// changeSkillCategory(id: Int!, newValue: String!): ApplicationDashboardDTO!
