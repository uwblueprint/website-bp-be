import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .removeColumn("applicant_records", "selectedForInterview");
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .addColumn("applicant_records", "selectedForInterview", {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
};
