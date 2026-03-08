import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";

const TABLE_NAME = "interview_groups";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    schedulingLink: {
      type: DataType.STRING,
      allowNull: false,
    },
    status: {
      type: DataType.STRING,
      allowNull: false,
      defaultValue: "Availability Pending", // Default to "Availability Pending" when creating a new interview group
    },
    createdAt: {
      type: DataType.DATE,
      allowNull: false,
      defaultValue: DataType.NOW,
    },
    updatedAt: {
      type: DataType.DATE,
      allowNull: false,
      defaultValue: DataType.NOW,
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
