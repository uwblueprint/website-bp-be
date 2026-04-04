import { gql } from "apollo-server-express";

const firebaseFileType = gql`
  scalar Upload

  type FirebaseFileDTO {
    id: String!
    storagePath: String!
    originalFileName: String!
    uploadedUserId: Int!
    sizeBytes: String!
    createdAt: String!
    updatedAt: String!
  }

  extend type Mutation {
    createFirebaseFile(file: Upload!, uploadedUserId: Int!): FirebaseFileDTO!
  }
`;

export default firebaseFileType;
