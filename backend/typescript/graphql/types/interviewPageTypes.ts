import { gql } from "apollo-server-express";

const interviewPageType = gql`
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

  extend type Query {
    getInterviewedApplicantsByUserId(userId: Int!): [InterviewedApplicantsDTO!]!
    getInterviewedPairingsByUserId(userId: Int!): [InterviewPairingsDTO!]!
    getInterviewersByGroupId(groupId: ID!): [UserDTO!]!
  }
`;

export default interviewPageType;
