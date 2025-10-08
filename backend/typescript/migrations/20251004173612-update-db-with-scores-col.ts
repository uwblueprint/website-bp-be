import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";

const REV_APP_TABLE = "reviewed_applicant_records";
const APP_TABLE = "applicant_records";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .addColumn(REV_APP_TABLE, "combined_score", {
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: null,
    });

  await sequelize.getQueryInterface().addColumn(APP_TABLE, "score", {
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .removeColumn("reviewed_applicant_records", "combined_score");

  await sequelize
    .getQueryInterface()
    .removeColumn("applicant_records", "score");
};
