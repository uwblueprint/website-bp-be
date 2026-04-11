import { gql } from "apollo-server-express";

const interviewReviewPageType = gql`
  type InterviewedApplicantDTO {
    applicantRecordId: String!
    firstName: String!
    lastName: String!
  }

  extend type Query {
    getInterviewedApplicantsByGroupId(groupId: ID!): [InterviewedApplicantDTO!]!
  }
`;

export default interviewReviewPageType;
