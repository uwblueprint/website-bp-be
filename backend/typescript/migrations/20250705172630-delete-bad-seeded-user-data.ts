import { Op } from "sequelize";
import { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("applicationdashboardtable", {
    reviewerId: { [Op.in]: [1, 2] },
  });
  await sequelize.getQueryInterface().bulkDelete("admins", {
    userId: { [Op.in]: [1, 2] },
  });
  await sequelize.getQueryInterface().bulkDelete("users", {
    id: { [Op.in]: [1, 2] },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  // No down migration needed as this is a cleanup operation
};
