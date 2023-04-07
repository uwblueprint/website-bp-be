import { DataType } from "sequelize-typescript";
// import ApplicationDashboardTable from "../models/applicationDashboard.model";
// import User from "../models/user.model";

import { Migration } from "../umzug";

const TABLE_NAME = "applicantresponse";

const SEEDED_DATA = [
  {
    id: 1,
  },
];

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    academicYear: {
      type: DataType.STRING,
      allowNull: true,
    },
    binaryQuestion1: {
      type: DataType.STRING,
      allowNull: true,
    },
    binaryQuestion2: {
      type: DataType.STRING,
      allowNull: true,
    },
    binaryQuestions: {
      type: DataType.ARRAY(DataType.JSON),
      allowNull: true,
    },
    dropdownQuestion1: {
      type: DataType.STRING,
      allowNull: true,
    },
    dropdownQuestions: {
      type: DataType.ARRAY(DataType.STRING),
      allowNull: true,
    },
    email: {
      type: DataType.STRING,
      allowNull: true,
    },
    firstName: {
      type: DataType.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataType.STRING,
      allowNull: true,
    },
    positions: {
      type: DataType.ARRAY(DataType.STRING),
      allowNull: true,
    },
    program: {
      type: DataType.STRING,
      allowNull: true,
    },
    question1: {
      type: DataType.STRING,
      allowNull: true,
    },
    question2: {
      type: DataType.STRING,
      allowNull: true,
    },
    question3: {
      type: DataType.STRING,
      allowNull: true,
    },
    question4: {
      type: DataType.STRING,
      allowNull: true,
    },
    question5: {
      type: DataType.STRING,
      allowNull: true,
    },
    questions: {
      type: DataType.ARRAY(DataType.JSON),
      allowNull: true,
    },
    resume: {
      type: DataType.STRING,
      allowNull: true,
    },
    resumeInput: {
      type: DataType.STRING,
      allowNull: true,
    },
    resumeUrl: {
      type: DataType.STRING,
      allowNull: true,
    },
    roleQuestion1: {
      type: DataType.STRING,
      allowNull: true,
    },
    roleQuestion2: {
      type: DataType.STRING,
      allowNull: true,
    },
    roleQuestion3: {
      type: DataType.STRING,
      allowNull: true,
    },
    roleQuestion4: {
      type: DataType.STRING,
      allowNull: true,
    },
    roleQuestion5: {
      type: DataType.STRING,
      allowNull: true,
    },
    roleQuestion6: {
      type: DataType.STRING,
      allowNull: true,
    },
    roleQuestion7: {
      type: DataType.STRING,
      allowNull: true,
    },
    roleQuestion8: {
      type: DataType.STRING,
      allowNull: true,
    },
    roleQuestion9: {
      type: DataType.STRING,
      allowNull: true,
    },
    roleSpecificQuestions: {
      type: DataType.ARRAY(DataType.JSON),
      allowNull: true,
    },
    status: {
      type: DataType.ENUM("pending", "accepted", "rejected"),
      allowNull: true,
    },
    timestamp: {
      type: DataType.DATE,
      allowNull: true,
    },
  });
  await sequelize.getQueryInterface().bulkInsert(TABLE_NAME, SEEDED_DATA);
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
