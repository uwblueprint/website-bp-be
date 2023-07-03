import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";

const TABLE_NAME = "applicationdashboardtable";

const userEmails = ["johndoe@gmail.com", "janedoe@gmail.ca"];

const SEEDED_DATA = [
  {
    applicationId: 1,
    reviewerId: 1,
    reviewerEmail: userEmails[0],
    passionFSG: 0,
    teamPlayer: 0,
    desireToLearn: 0,
    skill: 0,
    reviewerComments: "Great job presenting your case study!",
    recommendedSecondChoice: "N/A",
    skillCategory: "junior",
  },
  {
    applicationId: 1,
    reviewerId: 2,
    reviewerEmail: userEmails[1],
    passionFSG: 0,
    teamPlayer: 0,
    desireToLearn: 0,
    skill: 0,
    reviewerComments: "Very good!",
    recommendedSecondChoice: "considered",
    skillCategory: "intermediate",
  },
];

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    applicationId: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: "applicantresponse",
        key: "id",
      },
    },
    reviewerId: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    reviewerEmail: {
      type: DataType.STRING,
      allowNull: false,
    },
    passionFSG: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    teamPlayer: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    desireToLearn: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    skill: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    skillCategory: {
      type: DataType.ENUM("junior", "intermediate", "senior"),
      allowNull: false,
    },
    reviewerComments: {
      type: DataType.STRING,
      allowNull: false,
    },
    recommendedSecondChoice: {
      type: DataType.ENUM("N/A", "considered", "not considered"),
      allowNull: false,
    },
    createdAt: DataType.DATE,
    updatedAt: DataType.DATE,
  });
  // Creating ForeignKey for User and Application table
  await sequelize.getQueryInterface().bulkInsert(TABLE_NAME, SEEDED_DATA);
  // Inserting users to User table
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
