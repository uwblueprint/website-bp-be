import { gql } from "apollo-server-express";

const reviewPageType = gql`
  extend type Query {
    reviewApplicantPage(reviewedApplicantRecordId: Int!): [ApplicationDTO!]!
  }
`;

export default reviewPageType;
