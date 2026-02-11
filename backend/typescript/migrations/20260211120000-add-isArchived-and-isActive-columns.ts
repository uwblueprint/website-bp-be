import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";

const POSITIONS_TABLE_NAME = "positions";
const USERS_TABLE_NAME = "users";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn(POSITIONS_TABLE_NAME, "isArchived", {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  });

  await sequelize.getQueryInterface().addColumn(USERS_TABLE_NAME, "isActive", {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeColumn(USERS_TABLE_NAME, "isActive");
  await sequelize
    .getQueryInterface()
    .removeColumn(POSITIONS_TABLE_NAME, "isArchived");
};

