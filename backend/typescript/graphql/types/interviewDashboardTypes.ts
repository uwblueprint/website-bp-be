import { gql } from "apollo-server-express";

const interviewDashboardTypes = gql`
  extend type Mutation {
    delegateInterviewers(positions: [String!]!): [InterviewDelegation!]!
  }
`;

export default interviewDashboardTypes;
