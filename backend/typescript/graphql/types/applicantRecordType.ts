import { gql } from "apollo-server-express";

const applicantRecordType = gql`
  scalar None

  extend type Mutation {
    populateApplicantRecord(term: String!): None
  }
`;

export default applicantRecordType;
