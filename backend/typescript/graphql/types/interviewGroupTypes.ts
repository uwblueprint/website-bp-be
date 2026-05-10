import { gql } from "apollo-server-express";

const interviewGroupTypes = gql`
  type InterviewGroupDTO {
    id: ID!
    schedulingLink: String
    status: String!
  }

  input CreateInterviewGroupDTO {
    schedulingLink: String
    status: String!
  }

  input UpdateInterviewGroupDTO {
    schedulingLink: String
    status: String!
  }

  extend type Query {
    getInterviewGroupById(id: ID!): InterviewGroupDTO!
  }

  extend type Mutation {
    createInterviewGroup(
      interviewGroup: CreateInterviewGroupDTO!
    ): InterviewGroupDTO!

    updateInterviewGroup(
      id: ID!
      interviewGroup: UpdateInterviewGroupDTO!
    ): InterviewGroupDTO!

    deleteInterviewGroupById(id: ID!): InterviewGroupDTO!

    bulkCreateInterviewGroups(
      interviewGroups: [CreateInterviewGroupDTO]!
    ): [InterviewGroupDTO]!

    bulkDeleteInterviewGroupsByIds(
      interviewGroupIds: [ID]!
    ): [InterviewGroupDTO]!
  }
`;

export default interviewGroupTypes;
