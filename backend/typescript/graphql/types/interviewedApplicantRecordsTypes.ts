import { gql } from "apollo-server-express";

const interviewedApplicantRecordsTypes = gql`
  enum InterviewStatus {
    NeedsReview
    InProgress
    Complete
  }

  type Interview {
    passionFSG: Int
    teamPlayer: Int
    desireToLearn: Int
    skill: Int
    skillCategory: SkillCategory
    comments: String
  }

  input InterviewInput {
    passionFSG: Int
    teamPlayer: Int
    desireToLearn: Int
    skill: Int
    skillCategory: SkillCategory
    comments: String
  }

  type InterviewedApplicantRecord {
    id: ID!
    applicantRecordId: String!
    score: Int
    interviewJson: Interview
    status: InterviewStatus!
    interviewNotesId: String
    schedulingLink: String
    interviewDate: String
  }

  extend type Query {
    getInterviewedApplicantRecordById(id: ID!): InterviewedApplicantRecord!
  }

  extend type Mutation {
    createInterviewedApplicantRecord(
      applicantRecordId: String!
      score: Int
      interviewJSON: InterviewInput
      status: InterviewStatus
      interviewNotesId: String
      schedulingLink: String
      interviewDate: String
    ): InterviewedApplicantRecord!

    updateInterviewedApplicantRecord(
      id: ID!
      score: Int
      interviewJSON: InterviewInput
      status: InterviewStatus
      interviewNotesId: String
      schedulingLink: String
      interviewDate: String
    ): InterviewedApplicantRecord!

    deleteInterviewedApplicantRecordById(id: ID!): InterviewedApplicantRecord!
  }
`;

export default interviewedApplicantRecordsTypes;
