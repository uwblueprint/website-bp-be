const { Sequelize, sequelize, db } = require("../models/index.js");
// import { DataType } from "sequelize-typescript";

// import { Migration } from "../umzug";

const TABLE_NAME = "applicationdashboardtable";

const userEmails = ["johndoe@gmail.com", "janedoe@gmail.ca"];

const SEEDED_DATA = [
  {
    id: 1,
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
    id: 2,
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

const up = async ({ context: s }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    applicationId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "applicantresponse",
        key: "id",
      },
    },
    reviewerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    reviewerEmail: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    passionFSG: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    teamPlayer: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    desireToLearn: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    skill: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    skillCategory: {
      type: Sequelize.ENUM("junior", "intermediate", "senior"),
      allowNull: false,
    },
    reviewerComments: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    recommendedSecondChoice: {
      type: Sequelize.ENUM("N/A", "considered", "not considered"),
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
  // Creating ForeignKey for User and Application table
  await sequelize.getQueryInterface().bulkInsert(TABLE_NAME, SEEDED_DATA);
  // Inserting users to User table
};

const down = async ({ context: s }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};

module.exports = { up, down };
