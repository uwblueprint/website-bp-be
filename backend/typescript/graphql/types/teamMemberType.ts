import { gql } from "apollo-server-express";

const teamMemberType = gql`
  enum teamRole {
    PM
    DESIGNER
    PL
    DEVELOPER
  }

  type TeamMemberDTO {
    id: ID!
    firstName: String!
    lastName: String!
    teamRole: teamRole!
  }

  input CreateTeamMemberDTO {
    firstName: String!
    lastName: String!
    teamRole: teamRole!
  }

  extend type Query {
    teamMembers: [TeamMemberDTO!]!
  }

  extend type Mutation {
    createTeamMember(input: CreateTeamMemberDTO!): TeamMemberDTO!
  }
`;

export default teamMemberType;
