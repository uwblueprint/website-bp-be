import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";
import { interviewConflictOptions } from "../types";

const TABLE_NAME = "interview_delegations";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    interviewedApplicantRecordId: {
      type: DataType.UUID,
      allowNull: false,
      references: {
        model: "interviewed_applicant_records",
        key: "id",
      },
      primaryKey: true,
    },
    interviewerId: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      primaryKey: true,
    },
    interviewHasConflict: {
      type: DataType.ENUM(...interviewConflictOptions),
      allowNull: true,
      defaultValue: null,
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
