import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";

const TABLE_NAME = "users";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .addColumn(TABLE_NAME, "profilePictureFileId", {
      type: DataType.UUID,
      allowNull: true,
      references: {
        model: "firebase_files",
        key: "id",
      },
    });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .removeColumn(TABLE_NAME, "profilePictureFileId");
};
