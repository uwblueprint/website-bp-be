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
    groupId: ID!
  }

  input BulkCreateInterviewDelegationInput {
    interviewedApplicantRecordId: ID!
    interviewerId: Int!
    groupId: ID!
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
      groupId: ID!
    ): InterviewDelegation!

    updateInterviewDelegation(
      interviewedApplicantRecordId: ID!
      prevInterviewerId: Int!
      newInterviewerId: Int!
      groupId: ID!
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
