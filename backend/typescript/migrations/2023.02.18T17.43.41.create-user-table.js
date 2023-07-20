const { Sequelize, sequelize, db } = require("../models/index.js");

const TABLE_NAME = "users";

const SEEDED_DATA = [
  {
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@gmail.com",
    auth_id: "bide",
    id: 1,
    role: "User",
  },
  {
    first_name: "Jane",
    last_name: "Doe",
    email: "janedoe@gmail.ca",
    auth_id: "none",
    id: 2,
    role: "Admin",
  },
  {
    first_name: "UW",
    last_name: "Blueprint",
    email: "recruitmenttools@uwblueprint.org",
    auth_id: "1Z4wyuonu9MhAi4VoAEiTMVj1iT2",
    id: 4,
    role: "Admin",
  },
];
// recruitmenttools@uwblueprint.org
// myblueprint!
const up = async ({ context: s }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    auth_id: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM("User", "Admin"),
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

  await sequelize.getQueryInterface().bulkInsert(TABLE_NAME, SEEDED_DATA);
};

const down = async ({ context: s }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};

module.exports = { up, down };
