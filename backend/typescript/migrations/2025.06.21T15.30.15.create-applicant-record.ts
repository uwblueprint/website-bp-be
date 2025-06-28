import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";
import { PositionTitles } from "../types";

const TABLE_NAME = "applicant_records"; // Changed table name to differentiate from applicantresponse

// const SEEDED_DATA = [
//   {
//     id: "1",
//     applicationtId: "123",
//     // role: "developer",
//     roleSpecificQuestions: ["i like monke"],
//     choice: 1,
//     status: "Applied",
//     skillCategory: "junior",
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
    applicantId: {
      type: DataType.STRING,
      allowNull: false,
      references: {
        model: "applicants",
        key: "id",
      },
    },
    position: {
      type: DataType.ENUM(...PositionTitles),
      allowNull: true,
      references: {
        model: "positions",
        key: "title",
      },
    },
    roleSpecificQuestions: {
      type: DataType.ARRAY(DataType.STRING),
      allowNull: true,
    },
    choice: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataType.STRING,
      allowNull: false,
    },
    skillCategory: {
      type: DataType.STRING,
      allowNull: true,
    },
    selectedForInterview: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    extraInfo: {
      type: DataType.JSONB,
      allowNull: true,
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
