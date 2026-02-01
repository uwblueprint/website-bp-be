import { gql } from "apollo-server-express";
import { TeamRole } from "../../types";

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
    createTeamMember(teamMember: CreateTeamMemberDTO!): TeamMemberDTO!
  }
`;

export default teamMemberType;
