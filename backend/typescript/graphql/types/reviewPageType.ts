import { gql } from "apollo-server-express";

const reviewPageType = gql`
  type ApplicationDTO {
    id: String!
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

  type ReviewedApplicantsDTO {
    applicantRecordId: String!
    reviewStatus: String!
    applicantFirstName: String!
    applicantLastName: String!
  }

  extend type Query {
    reviewApplicantPage(applicantRecordId: String!): ApplicationDTO!
    getReviewedApplicantsByUserId(userId: Int!): [ReviewedApplicantsDTO!]!
  }
`;

export default reviewPageType;
