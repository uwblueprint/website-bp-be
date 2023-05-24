import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";

const TABLE_NAME = "users";

const SEEDED_DATA = [
  {
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@gmail.com",
    auth_id: "bide",
    id: 1,
    role: "User",
  },
  {
    first_name: "Jane",
    last_name: "Doe",
    email: "janedoe@gmail.ca",
    auth_id: "none",
    id: 2,
    role: "Admin",
  },
  {
    first_name: "UW",
    last_name: "Blueprint",
    email: "recruitmenttools@uwblueprint.org",
    auth_id: "1Z4wyuonu9MhAi4VoAEiTMVj1iT2",
    id: 4,
    role: "Admin",
  },
];
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

  await sequelize.getQueryInterface().bulkInsert(TABLE_NAME, SEEDED_DATA);
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
