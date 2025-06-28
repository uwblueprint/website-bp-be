import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";

const TABLE_NAME = "applicants";

// const SEEDED_DATA = [
//   {
//     id: "123",
//     academicOrCoop: "Academic",
//     academicYear: "2024",
//     email: "jj2huang@uwaterloo.ca",
//     firstName: "Jesse",
//     lastName: "Huang",
//     heardFrom: "LinkedIn",
//     locationPreference: "Waterloo",
//     program: "Computer Science",
//     pronouns: "he/him",
//     resumeUrl:
//       "https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1",
//     timesApplied: 1,
//     shortAnswerQuestions: ["hi", "bye"],
//     term: "S25",
//     submittedAt: "2025-06-21T07:02:40.000Z",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: DataType.STRING,
      allowNull: false,
      primaryKey: true,
    },
    academicOrCoop: {
      type: DataType.STRING,
      allowNull: false,
    },
    academicYear: {
      type: DataType.STRING,
      allowNull: false,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataType.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataType.STRING,
      allowNull: false,
    },
    heardFrom: {
      type: DataType.STRING,
      allowNull: false,
    },
    locationPreference: {
      type: DataType.STRING,
      allowNull: false,
    },
    program: {
      type: DataType.STRING,
      allowNull: false,
    },
    pronouns: {
      type: DataType.STRING,
      allowNull: false,
    },
    resumeUrl: {
      type: DataType.STRING,
      allowNull: true,
    },
    timesApplied: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    shortAnswerQuestions: {
      type: DataType.ARRAY(DataType.STRING),
      allowNull: true,
    },
    term: {
      type: DataType.STRING,
      allowNull: false,
    },
    submittedAt: {
      type: DataType.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataType.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataType.DATE,
      allowNull: false,
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
