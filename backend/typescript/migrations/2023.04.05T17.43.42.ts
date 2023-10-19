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
      academicOrCoop: currApplication.academicOrCoop,
      academicYear: currApplication.academicYear,
      email: currApplication.email,
      firstChoiceRole: currApplication.firstChoiceRole,
      firstName: currApplication.firstName,
      heardFrom: currApplication.heardFrom,
      lastName: currApplication.lastName,
      locationPreference: currApplication.locationPreference,
      program: currApplication.program,
      pronouns: currApplication.pronouns,
      pronounsSpecified: currApplication.pronounsSpecified,
      resumeUrl: currApplication.resumeUrl,
      roleSpecificQuestions: [
        JSON.stringify(currApplication.roleSpecificQuestions),
      ],
      secondChoiceRole: currApplication.secondChoiceRole,
      shortAnswerQuestions: [
        JSON.stringify(currApplication.shortAnswerQuestions),
      ],
      status: currApplication.status,
      term: currApplication.term,
      timesApplied: currApplication.timesApplied,
      timestamp: currApplication.timestamp // TODO: created + updated?
    };
  });

  return seededData;
};

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    academicOrCoop: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    academicYear: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    email: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    firstChoiceRole: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    firstName: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    heardFrom: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    lastName: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    locationPreference: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    program: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    pronouns: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    pronounsSpecified: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    resumeUrl: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    roleSpecificQuestions: {
      type: DataType.ARRAY(DataType.STRING(4000)),
      allowNull: true,
    },
    secondChoiceRole: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    shortAnswerQuestions: {
      type: DataType.ARRAY(DataType.STRING(4000)),
      allowNull: true,
    },
    status: {
      type: DataType.ENUM("accepted", "applied", "interviewed", "in review", "pending", "rejected"),
      allowNull: true,
    },
    term: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    timesApplied: {
      type: DataType.STRING(4000),
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
