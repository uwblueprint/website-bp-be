import { gql } from "apollo-server-express";

const applicantRecordType = gql`
  type ApplicantRecordDTO {
    id: String!
    applicantId: String!
    position: String!
    roleSpecificQuestions: [String!]!
    choice: Int!
    status: String!
    skillCategory: String
    combined_score: Int
    isApplicantFlagged: Boolean!
  }

  extend type Mutation {
    setApplicantRecordFlag(applicantRecordId: String!, flagValue: Boolean!): ApplicantRecordDTO!
  }
`;

export default applicantRecordType;
