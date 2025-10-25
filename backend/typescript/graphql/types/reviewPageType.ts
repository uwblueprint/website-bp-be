import { gql } from "apollo-server-express";

const reviewPageType = gql`
  extend type Query {
    reviewApplicantPage(reviewedApplicantRecordId: String!): ApplicationDTO!
  }
`;

export default reviewPageType;
