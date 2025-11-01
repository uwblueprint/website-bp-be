import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";

const TABLE_NAME = "reviewed_applicant_records";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .addColumn(TABLE_NAME, "reviewerHasConflict", {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .removeColumn(TABLE_NAME, "reviewerHasConflict");
};
