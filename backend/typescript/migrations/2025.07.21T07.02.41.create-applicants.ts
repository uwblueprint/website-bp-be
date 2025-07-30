import { DataType } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Migration } from "../umzug";
import applicants from "./separateJSONs";

const TABLE_NAME = "applicants";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: DataType.STRING(4000),
      allowNull: false,
      primaryKey: true,
    },
    academicOrCoop: {
      type: DataType.STRING(4000),
      allowNull: false,
    },
    academicYear: {
      type: DataType.STRING(4000),
      allowNull: false,
    },
    email: {
      type: DataType.STRING(4000),
      allowNull: false,
    },
    firstName: {
      type: DataType.STRING(4000),
      allowNull: false,
    },
    lastName: {
      type: DataType.STRING(4000),
      allowNull: false,
    },
    heardFrom: {
      type: DataType.STRING(4000),
      allowNull: false,
    },
    locationPreference: {
      type: DataType.STRING(4000),
      allowNull: false,
    },
    program: {
      type: DataType.STRING(4000),
      allowNull: false,
    },
    pronouns: {
      type: DataType.STRING(4000),
      allowNull: false,
    },
    resumeUrl: {
      type: DataType.STRING(4000),
      allowNull: true,
    },
    timesApplied: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    shortAnswerQuestions: {
      type: DataType.ARRAY(DataType.STRING(4000)),
      allowNull: true,
    },
    term: {
      type: DataType.STRING(4000),
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
  await sequelize.getQueryInterface().bulkInsert(TABLE_NAME, applicants);
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
