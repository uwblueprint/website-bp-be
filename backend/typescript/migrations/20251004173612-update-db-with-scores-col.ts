import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .addColumn("reviewed_applicant_records", "combined_score", {
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: null,
    });

  await sequelize.getQueryInterface().addColumn("applicant_records", "score", {
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
