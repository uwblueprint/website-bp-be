import { DataType } from "sequelize-typescript";
// import ApplicationDashboardTable from "../models/applicationDashboard.model";
// import User from "../models/user.model";

import { Migration } from "../umzug";
import allApplications from "./applicationlist.json";

const TABLE_NAME = "applicantresponse";

// To get more application data, copy paste more info from http://localhost:5000/applications
// into applicationlist.json (using applications endpoint in server.ts)
const importApplicationData = () => {
  const seededData = allApplications.map((currApplication) => {
    return {
      academicYear: currApplication.academicYear,
      binaryQuestion1: currApplication.binaryQuestion1,
      binaryQuestion2: currApplication.binaryQuestion2,
      binaryQuestions: currApplication.binaryQuestions.map((x) =>
        JSON.stringify(x),
      ),
      dropdownQuestion1: currApplication.dropdownQuestion1,
      dropdownQuestions: currApplication.dropdownQuestions.map((x) =>
        JSON.stringify(x),
      ),
      email: currApplication.email,
      firstName: currApplication.firstName,
      lastName: currApplication.lastName,
      positions: currApplication.positions,
      program: currApplication.program,
      question1: currApplication.question1,
      question2: currApplication.question2,
      question3: currApplication.question3,
      question4: currApplication.question4,
      question5: currApplication.question5,
      questions: currApplication.questions.map((x) => JSON.stringify(x)),
      resume: "C:\\fakepath\\resume (3).pdf",
      resumeInput: currApplication.resumeInput,
      resumeUrl: currApplication.resumeUrl,
      roleQuestion1: currApplication.roleQuestion1,
      roleQuestion2: currApplication.roleQuestion2,
      roleQuestion3: currApplication.roleQuestion3,
      roleQuestion4: currApplication.roleQuestion4,
      roleQuestion5: currApplication.roleQuestion5,
      roleQuestion6: currApplication.roleQuestion6,
      roleQuestion7: currApplication.roleQuestion7,
      roleQuestion8: currApplication.roleQuestion8,
      roleQuestion9: currApplication.roleQuestion9,
      roleSpecificQuestions: [
        JSON.stringify(currApplication.roleSpecificQuestions),
      ],
      status: currApplication.status,
      timestamp: currApplication.timestamp,
    };
  });

  return seededData;
};

export const up: Migration = async ({ context: sequelize }) => {
  const binaryQuestions = sequelize.define(
    "binaryQuestion",
    { question: DataType.STRING(4000), selected: DataType.STRING(4000) },
    {},
  );

  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    academicYear: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    binaryQuestion1: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    binaryQuestion2: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    binaryQuestions: {
      type: DataType.ARRAY(DataType.STRING(4000)),
      allowNull: true,
    },
    dropdownQuestion1: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    dropdownQuestions: {
      type: DataType.ARRAY(DataType.STRING(4000)),
      allowNull: true,
    },
    email: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    firstName: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    lastName: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    positions: {
      type: DataType.ARRAY(DataType.STRING(4000)),
      allowNull: true,
    },
    program: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    question1: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    question2: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    question3: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    question4: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    question5: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    questions: {
      type: DataType.ARRAY(DataType.STRING(4000)),
      allowNull: true,
    },
    resume: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    resumeInput: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    resumeUrl: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleQuestion1: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleQuestion2: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleQuestion3: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleQuestion4: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleQuestion5: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleQuestion6: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleQuestion7: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleQuestion8: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleQuestion9: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleSpecificQuestions: {
      type: DataType.ARRAY(DataType.STRING(4000)),
      allowNull: true,
    },
    status: {
      type: DataType.ENUM("pending", "accepted", "rejected"),
      allowNull: true,
    },
    timestamp: {
      type: DataType.BIGINT,
      allowNull: true,
    },
    createdAt: DataType.DATE,
    updatedAt: DataType.DATE,
  });

  const SEEDED_DATA = importApplicationData();
  await sequelize.getQueryInterface().bulkInsert(TABLE_NAME, SEEDED_DATA);
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
