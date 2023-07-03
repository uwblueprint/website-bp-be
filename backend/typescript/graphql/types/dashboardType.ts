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
    reviewComplete: Boolean
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
    reviewComplete: Boolean
  }

  type ApplicationDTO {
    id: Int!
    academicYear: String
    binaryQuestion1: String!
    binaryQuestion2: String!
    binaryQuestions: [String!]!
    dropdownQuestion1: String!
    dropdownQuestions: [String!]!
    email: String!
    firstName: String!
    lastName: String!
    positions: [String!]!
    program: String!
    question1: String!
    question2: String!
    question3: String!
    question4: String!
    question5: String!
    questions: [String!]!
    resume: String!
    resumeInput: String!
    resumeUrl: String!
    roleQuestion1: String!
    roleQuestion2: String!
    roleQuestion3: String!
    roleQuestion4: String!
    roleQuestion5: String!
    roleQuestion6: String!
    roleQuestion7: String!
    roleQuestion8: String!
    roleQuestion9: String!
    roleSpecificQuestions: [String!]!
    status: String!
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
    dashboardsByApplicationAuthId(authId: String!): [ApplicationDashboardDTO]!
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
