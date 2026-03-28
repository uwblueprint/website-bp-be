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

  type InterviewedApplicantsDTO {
    applicantRecordId: String!
    interviewStatus: String!
    applicantFirstName: String!
    applicantLastName: String!
  }

  type InterviewPairingsDTO {
    interviewedGroupId: ID!
    interviewGroupStatus: String!
    groupMembers: [UserDTO!]!
  }

  type ReviewedApplicantRecordDTO {
    applicantRecordId: String!
    reviewerId: Int!
    review: Review!
    status: String!
    score: Int
    reviewerHasConflict: Boolean!
  }

  extend type Mutation {
    reportReviewConflict(
      applicantRecordId: String!
      reviewerId: Int!
    ): ReviewedApplicantRecordDTO!
  }

  extend type Query {
    reviewApplicantPage(applicantRecordId: String!): ApplicationDTO!
    getReviewedApplicantsByUserId(userId: Int!): [ReviewedApplicantsDTO!]!
    getInterviewedApplicantsByUserId(userId: Int!): [InterviewedApplicantsDTO!]!
    getInterviewedPairingsByUserId(userId: Int!): [InterviewPairingsDTO!]!
  }
`;

export default reviewPageType;
