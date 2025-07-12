import { Migration } from "../umzug";

const USER_SEED_DATA = [
  {
    first_name: "Carolyn",
    last_name: "Zhang",
    email: "carolynzhang@uwblueprint.org",
    auth_id: "ATd5GMzp8IPJzQzuQYkaavcelb32",
    role: "Admin",
    position: "VP Engineering",
  },
  {
    first_name: "Jesse",
    last_name: "Huang",
    email: "jessehuang@uwblueprint.org",
    auth_id: "dkXIhkZXljOuEsXrZDASEguCQw43",
    role: "Admin",
    position: "VP Engineering",
  },
];

const PREVIOUS_USER_SEED_DATA = [
  {
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@gmail.com",
    auth_id: "bide",
    role: "User",
  },
  {
    first_name: "Jane",
    last_name: "Doe",
    email: "janedoe@gmail.ca",
    auth_id: "none",
    role: "Admin",
  },
];

export const up: Migration = async ({ context: sequelize }) => {
  // Update user with id 1
  await sequelize
    .getQueryInterface()
    .bulkUpdate("users", USER_SEED_DATA[0], { id: 1 });
  // Update user with id 2
  await sequelize
    .getQueryInterface()
    .bulkUpdate("users", USER_SEED_DATA[1], { id: 2 });
};

export const down: Migration = async ({ context: sequelize }) => {
  // Revert user with id 1
  await sequelize
    .getQueryInterface()
    .bulkUpdate("users", PREVIOUS_USER_SEED_DATA[0], { id: 1 });
  // Revert user with id 2
  await sequelize
    .getQueryInterface()
    .bulkUpdate("users", PREVIOUS_USER_SEED_DATA[1], { id: 2 });
};
