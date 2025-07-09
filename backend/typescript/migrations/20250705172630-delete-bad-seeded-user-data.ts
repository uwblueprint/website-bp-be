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
  // update malformed users with id 1 and 2 with proper seeded data
  await sequelize.getQueryInterface().bulkUpdate(
    "users",
    {
      first_name: USER_SEED_DATA[0].first_name,
      last_name: USER_SEED_DATA[0].last_name,
      email: USER_SEED_DATA[0].email,
      auth_id: USER_SEED_DATA[0].auth_id,
      role: USER_SEED_DATA[0].role,
      position: USER_SEED_DATA[0].position,
    },
    { id: 1 },
  );

  await sequelize.getQueryInterface().bulkUpdate(
    "users",
    {
      first_name: USER_SEED_DATA[1].first_name,
      last_name: USER_SEED_DATA[1].last_name,
      email: USER_SEED_DATA[1].email,
      auth_id: USER_SEED_DATA[1].auth_id,
      role: USER_SEED_DATA[1].role,
      position: USER_SEED_DATA[1].position,
    },
    { id: 2 },
  );
};

export const down: Migration = async ({ context: sequelize }) => {
  // update malformed users with id 1 and 2 with proper seeded data
  await sequelize.getQueryInterface().bulkUpdate(
    "users",
    {
      first_name: PREVIOUS_USER_SEED_DATA[1].first_name,
      last_name: PREVIOUS_USER_SEED_DATA[1].last_name,
      email: PREVIOUS_USER_SEED_DATA[1].email,
      auth_id: PREVIOUS_USER_SEED_DATA[1].auth_id,
      role: PREVIOUS_USER_SEED_DATA[1].role,
    },
    { id: 2 },
  );

  await sequelize.getQueryInterface().bulkUpdate(
    "users",
    {
      first_name: PREVIOUS_USER_SEED_DATA[0].first_name,
      last_name: PREVIOUS_USER_SEED_DATA[0].last_name,
      email: PREVIOUS_USER_SEED_DATA[0].email,
      auth_id: PREVIOUS_USER_SEED_DATA[0].auth_id,
      role: PREVIOUS_USER_SEED_DATA[0].role,
    },
    { id: 1 },
  );
};
