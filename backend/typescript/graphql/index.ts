import { makeExecutableSchema, gql } from "apollo-server-express";
import { applyMiddleware } from "graphql-middleware";
import { merge } from "lodash";
import { GraphQLScalarType, Kind } from "graphql";

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
import reviewDashboardResolvers from "./resolvers/reviewDashboardResolvers";
import reviewDashboardType from "./types/reviewDashboardType";
import reviewedApplicantRecordTypes from "./types/reviewedApplicantRecordTypes";
import reviewedApplicantRecordResolvers from "./resolvers/reviewedApplicantRecordResolver";
import adminCommentResolvers from "./resolvers/adminCommentsResolvers";
import adminCommentType from "./types/adminCommentsType";
import reviewPageType from "./types/reviewPageType";
import reviewPageResolvers from "./resolvers/reviewPageResolvers";

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

const scalarTypes = gql`
  scalar JSON
`;

const JSONScalar = new GraphQLScalarType({
  name: "JSON",
  description: "JSON scalar type",
  serialize: (value) => value,
  parseValue: (value) => value,
  parseLiteral: (ast) => {
    switch (ast.kind) {
      case Kind.STRING:
      case Kind.BOOLEAN:
        return ast.value;
      case Kind.INT:
      case Kind.FLOAT:
        return parseFloat(ast.value);
      case Kind.OBJECT:
        return ast.fields.reduce((obj: any, field: any) => {
          obj[field.name.value] = JSONScalar.parseLiteral(field.value, {});
          return obj;
        }, {});
      case Kind.LIST:
        return ast.values.map((value: any) => JSONScalar.parseLiteral(value, {}));
      default:
        return null;
    }
  },
});

const executableSchema = makeExecutableSchema({
  typeDefs: [
    query,
    mutation,
    scalarTypes,
    authType,
    entityType,
    simpleEntityType,
    userType,
    reviewDashboardType,
    reviewedApplicantRecordTypes
    adminCommentType,
    reviewPageType,
  ],
  resolvers: merge(
    {
      JSON: JSONScalar,
    },
    authResolvers,
    entityResolvers,
    simpleEntityResolvers,
    userResolvers,
    reviewDashboardResolvers,
    reviewedApplicantRecordResolvers,
    adminCommentResolvers,
    reviewPageResolvers,
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
    createReviewedApplicantRecord: authorizedByAllRoles(),
    bulkCreateReviewedApplicantRecord: authorizedByAllRoles(),
    deleteReviewedApplicantRecord: authorizedByAllRoles(),
    bulkDeleteReviewedApplicantRecord: authorizedByAllRoles(),
    createUser: authorizedByAdmin(),
    updateUser: authorizedByAdmin(),
    deleteUserById: authorizedByAdmin(),
    deleteUserByEmail: authorizedByAdmin(),
    logout: isAuthorizedByUserId("userId"),
    resetPassword: isAuthorizedByEmail("email"),
    sendSignInLink: authorizedByAllRoles(),
    createAdminComment: authorizedByAdmin(),
    updateAdminComment: authorizedByAdmin(),
    deleteAdminCommentById: authorizedByAdmin(),
  },
};

export default applyMiddleware(executableSchema, graphQLMiddlewares);
