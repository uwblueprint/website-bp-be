import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";
import {
  CommunityPositionTitles,
  Department,
  DesignPositionTitles,
  EngineeringPositionTitles,
  PositionTitles,
  ProductPositionTitles,
} from "../types";

const ADMIN_TABLE_NAME = "admins";
const POSITION_TABLE_NAME = "positions";
const USER_TABLE_NAME = "users";

const ADMIN_SEEDED_DATA = [
  {
    userId: "1",
    authorizedDepartments: [Department.Engineering, Department.Product],
  },
  {
    userId: "2",
    authorizedDepartments: [Department.Design, Department.Community],
  },
];
const POSITION_SEEDED_DATA = [
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
  await sequelize.getQueryInterface().createTable(POSITION_TABLE_NAME, {
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
  await sequelize
    .getQueryInterface()
    .bulkInsert(POSITION_TABLE_NAME, POSITION_SEEDED_DATA);

  await sequelize.getQueryInterface().addColumn(USER_TABLE_NAME, "position", {
    type: "enum_positions_title",
    references: {
      model: POSITION_TABLE_NAME,
      key: "title",
    },
  });

  await sequelize.getQueryInterface().createTable(ADMIN_TABLE_NAME, {
    userId: {
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: USER_TABLE_NAME,
        key: "id",
      },
    },
    authorizedDepartments: {
      type: DataType.ARRAY(DataType.STRING),
      allowNull: false,
    },
  });
  await sequelize
    .getQueryInterface()
    .bulkInsert(ADMIN_TABLE_NAME, ADMIN_SEEDED_DATA);
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeColumn(USER_TABLE_NAME, "position");
  await sequelize.getQueryInterface().dropTable(ADMIN_TABLE_NAME);
  await sequelize.getQueryInterface().dropTable(POSITION_TABLE_NAME);
  await sequelize.query('DROP TYPE IF EXISTS "enum_positions_title";');
  await sequelize.query('DROP TYPE IF EXISTS "enum_positions_department";');
};
