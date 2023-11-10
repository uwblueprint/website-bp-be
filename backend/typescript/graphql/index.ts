import { makeExecutableSchema, gql } from "apollo-server-express";
import { applyMiddleware } from "graphql-middleware";
import { merge } from "lodash";

import {
  isAuthorizedByEmail,
  isAuthorizedByRole,
  isAuthorizedByUserId,
} from "../middlewares/auth";
import authResolvers from "./resolvers/authResolvers";
import authType from "./types/authType";
import entityResolvers from "./resolvers/entityResolvers";
import entityType from "./types/entityType";
import simpleEntityResolvers from "./resolvers/simpleEntityResolvers";
import simpleEntityType from "./types/simpleEntityType";
import userResolvers from "./resolvers/userResolvers";
import userType from "./types/userType";
import dashboardType from "./types/dashboardType";
import dashboardResolvers from "./resolvers/dashboardResolvers";
import reviewType from "./types/reviewType";

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
  ],
  resolvers: merge(
    authResolvers,
    entityResolvers,
    simpleEntityResolvers,
    userResolvers,
    dashboardResolvers,
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
    applicationsById: authorizedByAllRoles(),
    applicationTable: authorizedByAllRoles(),
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
  },
};

export default applyMiddleware(executableSchema, graphQLMiddlewares);
