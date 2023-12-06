import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";

import allUsers from "./users.json";

const TABLE_NAME = "users";

const ORIGINAL_SEEDED_DATA = [
  {
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@gmail.com",
    auth_id: "bide",
    role: "User",
  },
  {
    first_name: "Jane",
    last_name: "Doe",
    email: "janedoe@gmail.ca",
    auth_id: "none",
    role: "Admin",
  },
  {
    first_name: "UW",
    last_name: "Blueprint",
    email: "recruitmenttools@uwblueprint.org",
    auth_id: "1Z4wyuonu9MhAi4VoAEiTMVj1iT2",
    role: "Admin",
  },
];

const importUserData = () => {
  const seededData = allUsers.members
    .filter((currUser) => currUser.term === 1236)
    .map((currUser) => {
      const names = currUser.name.split(" ");
      return {
        first_name: names[0],
        last_name: names[1],
        email: "",
        auth_id: currUser.uid || "",
        role: "User",
      };
    });

  return seededData
};
// recruitmenttools@uwblueprint.org
// myblueprint!
export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    first_name: {
      type: DataType.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataType.STRING,
      allowNull: false,
    },
    auth_id: {
      type: DataType.STRING,
      allowNull: true,
    },
    email: {
      type: DataType.STRING,
      primaryKey: true,
      allowNull: false,
    },
    role: {
      type: DataType.ENUM("User", "Admin"),
      allowNull: false,
    },
    createdAt: DataType.DATE,
    updatedAt: DataType.DATE,
  });

  const SEEDED_DATA = importUserData()
  
  await sequelize.getQueryInterface().bulkInsert(TABLE_NAME, ORIGINAL_SEEDED_DATA);
  await sequelize.getQueryInterface().bulkInsert(TABLE_NAME, SEEDED_DATA);
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
