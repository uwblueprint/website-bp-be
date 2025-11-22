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
import reviewDashboardResolvers from "./resolvers/reviewDashboardResolvers";
import reviewDashboardType from "./types/reviewDashboardType";
import reviewedApplicantRecordTypes from "./types/reviewedApplicantRecordTypes";
import reviewedApplicantRecordResolvers from "./resolvers/reviewedApplicantRecordResolver";
import adminCommentResolvers from "./resolvers/adminCommentsResolvers";
import adminCommentType from "./types/adminCommentsType";
import applicantRecordResolvers from "./resolvers/applicantRecordResolvers";
import applicantRecordType from "./types/applicantRecordType";
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

const executableSchema = makeExecutableSchema({
  typeDefs: [
    query,
    mutation,
    authType,
    entityType,
    simpleEntityType,
    userType,
    reviewDashboardType,
    reviewedApplicantRecordTypes,
    adminCommentType,
    applicantRecordType,
    reviewPageType,
    reviewedApplicantRecordTypes
  ],
  resolvers: merge(
    authResolvers,
    entityResolvers,
    simpleEntityResolvers,
    userResolvers,
    reviewDashboardResolvers,
    reviewedApplicantRecordResolvers,
    adminCommentResolvers,
    applicantRecordResolvers,
    reviewPageResolvers,
    reviewedApplicantRecordResolvers,
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
    adminCommentsByApplicantRecordId: authorizedByAdmin(),
    adminCommentById: authorizedByAdmin(),
  },
  Mutation: {
    createEntity: authorizedByAllRoles(),
    updateEntity: authorizedByAllRoles(),
    deleteEntity: authorizedByAllRoles(),
    createSimpleEntity: authorizedByAllRoles(),
    updateSimpleEntity: authorizedByAllRoles(),
    deleteSimpleEntity: authorizedByAllRoles(),
    createReviewedApplicantRecord: authorizedByAllRoles(),
    bulkCreateReviewedApplicantRecord: authorizedByAllRoles(),
    deleteReviewedApplicantRecord: authorizedByAllRoles(),
    bulkDeleteReviewedApplicantRecord: authorizedByAllRoles(),
    updateReviewedApplicantRecord: authorizedByAllRoles(),
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
