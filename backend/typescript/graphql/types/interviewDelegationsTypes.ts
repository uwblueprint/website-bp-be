import { gql } from "apollo-server-express";

const interviewDelegationsTypes = gql`
  enum InterviewConflict {
    APPLICANT_CONFLICT
    APPLICANT_NO_RESPONSE
    PARTNER_NO_RESPONSE
    CANNOT_ATTEND
  }

  type InterviewDelegation {
    interviewedApplicantRecordId: ID!
    interviewerId: Int!
    interviewHasConflict: InterviewConflict
  }

  input BulkCreateInterviewDelegationInput {
    interviewedApplicantRecordId: ID!
    interviewerId: Int!
  }

  input BulkDeleteInterviewDelegationInput {
    interviewedApplicantRecordId: ID!
    interviewerId: Int!
  }

  extend type Query {
    getInterviewDelegation(
      interviewedApplicantRecordId: ID!
      interviewerId: Int!
    ): InterviewDelegation!
  }

  extend type Mutation {
    createInterviewDelegation(
      interviewedApplicantRecordId: ID!
      interviewerId: Int!
    ): InterviewDelegation!

    updateInterviewDelegation(
      interviewedApplicantRecordId: ID!
      prevInterviewerId: Int!
      newInterviewerId: Int!
    ): InterviewDelegation!

    deleteInterviewDelegation(
      interviewedApplicantRecordId: ID!
      interviewerId: Int!
    ): InterviewDelegation!

    bulkCreateInterviewDelegations(
      delegations: [BulkCreateInterviewDelegationInput!]!
    ): [InterviewDelegation!]!

    bulkDeleteInterviewDelegations(
      delegations: [BulkDeleteInterviewDelegationInput!]!
    ): [InterviewDelegation!]!
  }
`;

export default interviewDelegationsTypes;
