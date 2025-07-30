import { Migration } from "../umzug";

const TABLE_NAME = "users";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkUpdate(
    TABLE_NAME,
    { auth_id: "fx49Ei9zxbQf4rWrXp7ZqEk8cLi2" }, // Replace with the correct auth_id value
    { id: 1 },
  );
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkUpdate(
    TABLE_NAME,
    { auth_id: "ATd5GMzp8IPJzQzuQYkaavcelb32" }, // this is the previous auth_id for user with id 1
    { id: 1 },
  );
};
