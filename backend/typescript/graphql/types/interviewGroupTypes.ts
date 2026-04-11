import { gql } from "apollo-server-express";

const interviewGroupTypes = gql`
  type InterviewGroup {
    id: ID!
    schedulingLink: String
    status: String!
  }

  extend type Query {
    getInterviewGroup(id: ID!): InterviewGroup!
  }

  input BulkCreateInterviewGroupInput {
    status: String!
    schedulingLink: String
  }

  extend type Mutation {
    createInterviewGroup(
      schedulingLink: String
      status: String!
    ): InterviewGroup!

    updateInterviewGroup(
      id: ID!
      schedulingLink: String
      status: String!
    ): InterviewGroup!

    deleteInterviewGroup(id: ID!): InterviewGroup!

    bulkCreateInterviewGroups(
      groups: [BulkCreateInterviewGroupInput!]!
    ): [InterviewGroup!]!

    bulkDeleteInterviewGroups(ids: [String!]!): [InterviewGroup!]!
  }
`;

export default interviewGroupTypes;
