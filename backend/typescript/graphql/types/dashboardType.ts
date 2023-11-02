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
    reviewerComments: String!
    recommendedSecondChoice: String!
    reviewerId: Int!
    applicationId: Int!
  }

  input ApplicationDashboardInput {
    id: Int!
    reviewerEmail: String
    passionFSG: Int
    teamPlayer: Int
    desireToLearn: Int
    skill: Int
    skillCategory: String
    reviewerId: Int
  }

  type ApplicationDTO {
    id: Int!
    academicOrCoop: String!
    academicYear: String!
    email: String!
    firstChoiceRole: String!
    firstName: String!
    heardFrom: String!
    lastName: String!
    locationPreference: String!
    program: String!
    pronouns: String!
    pronounsSpecified: String!
    resumeUrl: String!
    roleSpecificQuestions: [String!]!
    secondChoiceRole: String!
    shortAnswerQuestions: [String!]!
    status: String!
    secondChoiceStatus: String!
    term: String!
    timesApplied: String!
    timestamp: Int!
  }

  type ApplicationDashboardRowDTO {
    application: ApplicationDTO!
    reviewDashboards: [ApplicationDashboardDTO]!
    reviewers: [UserDTO]!
  }

  extend type Query {
    dashboardById(id: Int!): ApplicationDashboardDTO!
    applicationsByRole(firstChoice: String!): [ApplicationDTO]!
    dashboardsByApplicationId(applicationId: Int!): [ApplicationDashboardDTO]!
    applicationTable(role: String!): [ApplicationDashboardRowDTO]!
  }

  extend type Mutation {
    changeRating(
      id: Int!
      ratingToBeChanged: String!
      newValue: Int!
    ): ApplicationDashboardDTO!
    changeSkillCategory(id: Int!, newValue: String!): ApplicationDashboardDTO!
    updateApplications(applications: [ApplicationDashboardInput]!): [Int]!
    modifyFinalComments(
      id: Int!
      newComments: String!
      newSkillCategory: String!
      newRecommendedSecondChoice: String
    ): ApplicationDashboardDTO!
    createApplicationDashboard(
      reviewerEmail: String!
      applicationId: Int!
      reviewerAuthId: String!
      passionFSG: Int!
      teamPlayer: Int!
      desireToLearn: Int!
      skill: Int!
      skillCategory: String!
      reviwerComments: String!
      recommendedSecondChoice: String!
    ): ApplicationDashboardDTO!
  }
`;

export default dashboardType;
