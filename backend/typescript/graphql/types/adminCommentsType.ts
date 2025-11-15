import { gql } from "apollo-server-express";

const adminCommentsType = gql`
  type AdminCommentDTO {
    id: String!
    userId: Int!
    applicantRecordId: String!
    comment: String!
    createdAt: String!
    updatedAt: String!
  }

  input CreateAdminCommentDTO {
    userId: Int!
    applicantRecordId: String!
    comment: String!
  }

  extend type Query {
    adminCommentsByApplicantRecordId(
      applicantRecordId: String!
    ): [AdminCommentDTO!]!
    adminCommentById(id: String!): AdminCommentDTO!
  }

  extend type Mutation {
    createAdminComment(adminComment: CreateAdminCommentDTO!): AdminCommentDTO!
    updateAdminComment(
      id: String!
      content: CreateAdminCommentDTO!
    ): AdminCommentDTO!
    deleteAdminCommentById(id: String!): AdminCommentDTO!
  }
`;

export default adminCommentsType;
