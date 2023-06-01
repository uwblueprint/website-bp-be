import { gql } from "apollo-server-express";

const authType = gql`
  type AuthDTO {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
    accessToken: String!
    refreshToken: String!
  }

  type loginOK {
    canLogin: Boolean!
  }

  input RegisterUserDTO {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  extend type Query {
    login(email: String!, password: String!): loginOK!
    isAuthorizedByRole(accessToken: String!, roles: [Role!]!): Boolean!

  }
  
  extend type Mutation {
    login(email: String!, password: String!): AuthDTO!
    loginWithGoogle(idToken: String!): AuthDTO!
    register(user: RegisterUserDTO!): AuthDTO!
    refresh: String!
    logout(userId: ID!): ID
    resetPassword(email: String!): Boolean!
  }
`;

export default authType;
