import { gql, makeExecutableSchema } from "apollo-server-express";
import { applyMiddleware } from "graphql-middleware";
import { merge } from "lodash";

import {
  isAuthorizedByEmail,
  isAuthorizedByRole,
  isAuthorizedByUserId,
} from "../middlewares/auth";
import authResolvers from "./resolvers/authResolvers";
import dashboardResolvers from "./resolvers/dashboardResolvers";
import entityResolvers from "./resolvers/entityResolvers";
import simpleEntityResolvers from "./resolvers/simpleEntityResolvers";
import teamMemberResolvers from "./resolvers/teamMemberResolvers";
import userResolvers from "./resolvers/userResolvers";
import authType from "./types/authType";
import dashboardType from "./types/dashboardType";
import entityType from "./types/entityType";
import reviewType from "./types/reviewType";
import simpleEntityType from "./types/simpleEntityType";
import teamMemberType from "./types/teamMemberType";
import userType from "./types/userType";

const query = gql`
  type Query {
    _empty: String
  }
`;

const mutation = gql`
  type Mutation {
    _empty: String
  }
`;

const executableSchema = makeExecutableSchema({
  typeDefs: [
    query,
    mutation,
    authType,
    reviewType,
    entityType,
    simpleEntityType,
    userType,
    dashboardType,
    teamMemberType,
  ],
  resolvers: merge(
    authResolvers,
    entityResolvers,
    simpleEntityResolvers,
    userResolvers,
    dashboardResolvers,
    teamMemberResolvers,
  ),
});

const authorizedByAllRoles = () =>
  isAuthorizedByRole(new Set(["User", "Admin"]));
const authorizedByAdmin = () => isAuthorizedByRole(new Set(["Admin"]));

const graphQLMiddlewares = {
  Query: {
    entity: authorizedByAllRoles(),
    entities: authorizedByAllRoles(),
    simpleEntity: authorizedByAllRoles(),
    simpleEntities: authorizedByAllRoles(),
    dashboardById: authorizedByAllRoles(),
    applicationsByRole: authorizedByAllRoles(),
    applicationsBySecondChoiceRole: authorizedByAllRoles(),
    applicationsById: authorizedByAllRoles(),
    applicationTable: authorizedByAllRoles(),
    secondChoiceRoleApplicationTable: authorizedByAllRoles(),
    userById: authorizedByAdmin(),
    userByEmail: authorizedByAdmin(),
    login: authorizedByAdmin(),
    users: authorizedByAdmin(),
  },
  Mutation: {
    createEntity: authorizedByAllRoles(),
    updateEntity: authorizedByAllRoles(),
    deleteEntity: authorizedByAllRoles(),
    createSimpleEntity: authorizedByAllRoles(),
    updateSimpleEntity: authorizedByAllRoles(),
    deleteSimpleEntity: authorizedByAllRoles(),
    changeRating: authorizedByAllRoles(),
    changeSkillCategory: authorizedByAllRoles(),
    updateApplications: authorizedByAllRoles(),
    modifyFinalComments: authorizedByAllRoles(),
    createUser: authorizedByAdmin(),
    updateUser: authorizedByAdmin(),
    deleteUserById: authorizedByAdmin(),
    deleteUserByEmail: authorizedByAdmin(),
    logout: isAuthorizedByUserId("userId"),
    resetPassword: isAuthorizedByEmail("email"),
    sendSignInLink: authorizedByAllRoles(),
  },
};

export default applyMiddleware(executableSchema, graphQLMiddlewares);
