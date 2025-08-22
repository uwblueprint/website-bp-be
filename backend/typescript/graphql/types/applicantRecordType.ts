import { gql } from "apollo-server-express";

const applicantRecordType = gql`
  enum ApplicationStatus {
    Applied
    InReview
    Reviewed
    Interview
    InterviewComplete
    Offer
    NotConsidered
  }

  enum SkillCategory {
    Junior
    Intermediate
    Senior
  }

  type ApplicantDTO {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    academicOrCoop: String!
    academicYear: String!
    heardFrom: String!
    locationPreference: String!
    program: String!
    pronouns: String!
    resumeUrl: String!
    timesApplied: Int!
    shortAnswerQuestions: [String!]!
    term: String!
    submittedAt: String!
  }

  type UserDTO {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    position: String
    role: Role!
  }

  type ReviewedApplicantRecordDTO {
    applicantRecordId: ID!
    reviewer: UserDTO!
    review: JSON
    status: ReviewStatus!
  }

  type ApplicantRecordDTO {
    id: ID!
    applicant: ApplicantDTO!
    position: String!
    roleSpecificQuestions: [String!]!
    choice: Int!
    status: ApplicationStatus!
    skillCategory: SkillCategory
    extraInfo: JSON
    reviews: [ReviewedApplicantRecordDTO!]!
  }

  extend type Query {
    getApplicantRecords(positions: [String!]!): [ApplicantRecordDTO!]!
    getApplicantRecordById(id: ID!): ApplicantRecordDTO!
  }
`;

export default applicantRecordType;
