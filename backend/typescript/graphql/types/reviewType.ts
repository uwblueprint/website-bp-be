import { gql } from "apollo-server-express";

const reviewType = gql`
  extend type Query {
    isAuthorizedToReview(applicationId: Int!, reviewerUserId: String!): Boolean!
  }
`;

export default reviewType;
