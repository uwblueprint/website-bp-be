import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";
import { ReviewStatusEnum } from "../types";

const TABLE_NAME = "reviewed_applicant_records";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    applicantRecordId: {
      type: DataType.STRING,
      allowNull: false,
      references: {
        model: "applicant_records",
        key: "id",
      },
      primaryKey: true,
    },
    reviewerId: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      primaryKey: true,
    },
    review: {
      type: DataType.JSONB,
      allowNull: true,
    },
    status: {
      type: DataType.STRING,
      allowNull: false,
      defaultValue: ReviewStatusEnum.TODO,
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
