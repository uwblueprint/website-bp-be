import { DataTypes } from 'sequelize';

import { Migration } from "../umzug";

const TABLE_NAME = "users";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn(TABLE_NAME, 'permission', {
    type: DataTypes.ENUM('VP Talent', 'Eteam', 'Engineering', 'Product', 'Design', 'Reviewers'),
    allowNull: false,
    defaultValue: 'Reviewers'
  });

  await sequelize.getQueryInterface().changeColumn(TABLE_NAME, 'role', {
    type: DataTypes.ENUM(), // TODO: Add roles
    allowNull: false,
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeColumn(TABLE_NAME, 'permission');

  await sequelize.getQueryInterface().changeColumn(TABLE_NAME, 'role', {
    type: DataTypes.ENUM('User', 'Admin'),
    allowNull: false,
  });
};
