import { gql } from "apollo-server-express";

const teamMemberType = gql`
  enum TeamRoleEnum {
    PM
    DESIGNER
    PL
    DEVELOPER
  }

  type TeamMemberDTO {
    id: ID!
    firstName: String!
    lastName: String!
    teamRole: TeamRoleEnum!
  }

  input CreateTeamMemberDTO {
    firstName: String!
    lastName: String!
    teamRole: TeamRoleEnum!
  }

  extend type Query {
    teamMembers: [TeamMemberDTO!]!
  }

  extend type Mutation {
    createTeamMember(input: CreateTeamMemberDTO!): TeamMemberDTO!
  }
`;

export default teamMemberType;
