import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";

const TABLE_NAME = "applicant_records";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn(TABLE_NAME, "isShortlistedForInterview", {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  });
  await sequelize.getQueryInterface().addColumn(TABLE_NAME, "isShortlistedForOffer", {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .removeColumn(TABLE_NAME, "isShortlistedForInterview");
  await sequelize
    .getQueryInterface()
    .removeColumn(TABLE_NAME, "isShortlistedForOffer");
};
