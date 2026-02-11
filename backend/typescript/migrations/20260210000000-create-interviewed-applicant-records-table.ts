import { DataTypes } from "sequelize";
import { Migration } from "../umzug";

const TABLE_NAME = "interviewed_applicant_records";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    applicantRecordId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      references: {
        model: "applicant_records",
        key: "id",
      },
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    interviewJson: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interviewNotesId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "firebase_files",
        key: "id",
      },
    },
    schedulingLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    interviewDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
