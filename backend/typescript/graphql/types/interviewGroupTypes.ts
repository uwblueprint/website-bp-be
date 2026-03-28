import { gql } from "apollo-server-express";

const interviewGroupTypes = gql`
  enum InterviewGroupStatus {
    READY_TO_INTERVIEW
    INVITES_SENT
    AVAILABILITY_PENDING
  }

  type InterviewGroup {
    id: ID!
    schedulingLink: String
    status: InterviewGroupStatus!
  }

  extend type Query {
    getInterviewGroup(id: ID!): InterviewGroup!
  }

  extend type Mutation {
    createInterviewGroup(
      schedulingLink: String
      status: InterviewGroupStatus!
    ): InterviewGroup!

    updateInterviewGroup(
      id: ID!
      schedulingLink: String
      status: InterviewGroupStatus!
    ): InterviewGroup!

    deleteInterviewGroup(id: ID!): InterviewGroup!
  }
`;

export default interviewGroupTypes;
