import { DataType } from "sequelize-typescript";
// import ApplicationDashboardTable from "../models/applicationDashboard.model";
// import User from "../models/user.model";

import { Migration } from "../umzug";
import all_applications from "./applicationlist.json";

const TABLE_NAME = "applicantresponse";

// To get more application data, copy paste more info from http://localhost:5000/applications
// into applicationlist.json (using applications endpoint in server.ts)
const import_application_data: () => object[] = function() {
  const seeded_data = [];
  for (let i = 0; i < all_applications.length; i++) {
    const curr_application = all_applications[i];
    const application_data = {
      academicYear: curr_application.academicYear,
      binaryQuestion1: curr_application.binaryQuestion1,
      binaryQuestion2: curr_application.binaryQuestion2,
      binaryQuestions: curr_application.binaryQuestions.map(x => JSON.stringify(x)),
      dropdownQuestion1: curr_application.dropdownQuestion1,
      dropdownQuestions: curr_application.dropdownQuestions.map(x => JSON.stringify(x)),
      email: curr_application.email,
      firstName: curr_application.firstName,
      lastName: curr_application.lastName,
      positions: curr_application.positions,
      program: curr_application.program,
      question1: curr_application.question1,
      question2: curr_application.question2,
      question3: curr_application.question3,
      question4: curr_application.question4,
      question5: curr_application.question5,
      questions: curr_application.questions.map(x => JSON.stringify(x)),
      resume: "C:\\fakepath\\resume (3).pdf",
      resumeInput: curr_application.resumeInput,
      resumeUrl: curr_application.resumeUrl,
      roleQuestion1: curr_application.roleQuestion1,
      roleQuestion2: curr_application.roleQuestion2,
      roleQuestion3: curr_application.roleQuestion3,
      roleQuestion4: curr_application.roleQuestion4,
      roleQuestion5: curr_application.roleQuestion5,
      roleQuestion6: curr_application.roleQuestion6,
      roleQuestion7: curr_application.roleQuestion7,
      roleQuestion8: curr_application.roleQuestion8,
      roleQuestion9: curr_application.roleQuestion9,
      roleSpecificQuestions: [JSON.stringify(curr_application.roleSpecificQuestions)],
      status: curr_application.status,
      timestamp: curr_application.timestamp,
    };
    seeded_data.push(application_data);
  }

  return seeded_data;
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

  const SEEDED_DATA = import_application_data();
  await sequelize.getQueryInterface().bulkInsert(TABLE_NAME, SEEDED_DATA);
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
