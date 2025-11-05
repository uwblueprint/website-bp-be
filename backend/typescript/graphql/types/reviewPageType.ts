import { gql } from "apollo-server-express";

const reviewPageType = gql`
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
    timestamp: Int
  }
  
  extend type Query {
    reviewApplicantPage(reviewedApplicantRecordId: String!): ApplicationDTO!
  }
`;

export default reviewPageType;
