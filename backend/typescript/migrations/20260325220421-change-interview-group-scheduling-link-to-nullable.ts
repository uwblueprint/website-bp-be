import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";

const TABLE_NAME = "interview_groups";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .changeColumn(TABLE_NAME, "schedulingLink", {
      type: DataType.STRING,
      allowNull: true,
      defaultValue: null,
    });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .changeColumn(TABLE_NAME, "schedulingLink", {
      type: DataType.STRING,
      allowNull: false,
    });
};
