import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";

const TABLE_NAME = "reviewed-applications";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    applicationId: {
      type: DataType.STRING,
      allowNull: false,
    },
    reveiweId: {
      type: DataType.STRING,
      allowNull: false,
    },
    review: {
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

//   await sequelize.getQueryInterface().bulkInsert(TABLE_NAME, SEEDED_DATA);
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
