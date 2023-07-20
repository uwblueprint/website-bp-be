const DataType = require("sequelize-typescript");
const { Sequelize, sequelize, db } = require("../models/index.js");

// const Migration = require("../umzug");

const TABLE_NAME = "entities";

const up = async ({ context: s }) => {
  // console.log("sequelize: ");
  // console.log(sequelize);
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    string_field: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    int_field: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    enum_field: {
      type: Sequelize.ENUM("A", "B", "C", "D"),
      allowNull: false,
    },
    string_array_field: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    bool_field: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    file_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
};

const down = async ({ context: s }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};

module.exports = { up, down };
