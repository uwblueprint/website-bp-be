import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";

const REVIEWED_APPLICANT_RECORDS_TABLE = "reviewed_applicant_records";
const APPLICANT_RECORD_TABLE = "applicant_records";
const POSITIONS_TABLE = "positions";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .addColumn(REVIEWED_APPLICANT_RECORDS_TABLE, "createdAt", {
      type: DataType.DATE,
      allowNull: true,
      defaultValue: DataType.NOW,
    });

  await sequelize
    .getQueryInterface()
    .addColumn(REVIEWED_APPLICANT_RECORDS_TABLE, "updatedAt", {
      type: DataType.DATE,
      allowNull: true,
      defaultValue: DataType.NOW,
    });

  await sequelize
    .getQueryInterface()
    .addColumn(APPLICANT_RECORD_TABLE, "createdAt", {
      type: DataType.DATE,
      allowNull: true,
      defaultValue: DataType.NOW,
    });

  await sequelize
    .getQueryInterface()
    .addColumn(APPLICANT_RECORD_TABLE, "updatedAt", {
      type: DataType.DATE,
      allowNull: true,
      defaultValue: DataType.NOW,
    });

  await sequelize.getQueryInterface().addColumn(POSITIONS_TABLE, "createdAt", {
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  });

  await sequelize.getQueryInterface().addColumn(POSITIONS_TABLE, "updatedAt", {
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .removeColumn(REVIEWED_APPLICANT_RECORDS_TABLE, "createdAt");

  await sequelize
    .getQueryInterface()
    .removeColumn(REVIEWED_APPLICANT_RECORDS_TABLE, "updatedAt");

  await sequelize
    .getQueryInterface()
    .removeColumn(APPLICANT_RECORD_TABLE, "createdAt");

  await sequelize
    .getQueryInterface()
    .removeColumn(APPLICANT_RECORD_TABLE, "updatedAt");

  await sequelize
    .getQueryInterface()
    .removeColumn(POSITIONS_TABLE, "createdAt");

  await sequelize
    .getQueryInterface()
    .removeColumn(POSITIONS_TABLE, "updatedAt");
};
