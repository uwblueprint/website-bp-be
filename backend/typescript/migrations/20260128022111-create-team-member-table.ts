import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";
import { teamRoleValues } from "../types";

const TABLE_NAME = "team_members";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataType.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataType.STRING,
      allowNull: false,
    },
    teamRole: {
      type: DataType.ENUM(...teamRoleValues),
      allowNull: false,
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
  await sequelize
    .getQueryInterface()
    .sequelize.query(`DROP TYPE IF EXISTS "enum_team_members_teamRole";`);
};
