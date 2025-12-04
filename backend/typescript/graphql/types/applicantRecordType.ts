import { gql } from "apollo-server-express";

const applicantRecordType = gql`
  enum ApplicationStatus {
    Applied
    InReview
    Reviewed
    Selected
    Interviewed
    Offer
    Rejected
  }

  type ApplicantRecordDTO {
    id: String!
    applicantId: String!
    position: String!
    roleSpecificQuestions: [String!]!
    choice: Int!
    status: ApplicationStatus!
    skillCategory: String
    combined_score: Int
    isApplicantFlagged: Boolean!
  }

  extend type Mutation {
    updateApplicantStatus(
      applicantRecordId: String!
      status: ApplicationStatus!
    ): ApplicantRecordDTO!
    bulkUpdateApplicantStatus(
      applicantRecordIds: [String!]!
      status: ApplicationStatus!
    ): [ApplicantRecordDTO!]!
    setApplicantRecordFlag(
      applicantRecordId: String!
      flagValue: Boolean!
    ): ApplicantRecordDTO!
  }
`;

export default applicantRecordType;
