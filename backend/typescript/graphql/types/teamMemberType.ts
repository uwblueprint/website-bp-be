import { gql } from "apollo-server-express";

const teamMemberType = gql`
  enum TeamRole {
    PM
    DESIGNER
    PL
    DEVELOPER
  }

  type TeamMemberDTO {
    id: ID!
    firstName: String!
    lastName: String!
    teamRole: TeamRole!
  }

  input CreateTeamMemberDTO {
    firstName: String!
    lastName: String!
    teamRole: TeamRole!
  }

  extend type Query {
    teamMembers: [TeamMemberDTO!]!
  }

  extend type Mutation {
    createTeamMember(input: CreateTeamMemberDTO!): TeamMemberDTO!
  }
`;

export default teamMemberType;
