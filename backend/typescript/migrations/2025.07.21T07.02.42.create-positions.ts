import { DataType } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Migration } from "../umzug";
import {
  Department,
  PositionTitles,
  EngineeringPositionTitles,
  DesignPositionTitles,
  ProductPositionTitles,
  CommunityPositionTitles,
} from "../types";

const TABLE_NAME = "positions";

const SEEDED_DATA = [
  ...EngineeringPositionTitles.map((title) => ({
    title,
    department: Department.Engineering,
  })),

  ...DesignPositionTitles.map((title) => ({
    title,
    department: Department.Design,
  })),

  ...ProductPositionTitles.map((title) => ({
    title,
    department: Department.Product,
  })),

  ...CommunityPositionTitles.map((title) => ({
    title,
    department: Department.Community,
  })),
];

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    title: {
      type: DataType.ENUM(...PositionTitles),
      allowNull: false,
      primaryKey: true,
    },
    department: {
      type: DataType.ENUM(...Object.values(Department)),
      allowNull: false,
    },
  });

  await sequelize.query("DELETE FROM positions");

  await sequelize.getQueryInterface().bulkInsert(TABLE_NAME, SEEDED_DATA);
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
