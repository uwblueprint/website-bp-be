import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";

const INTERVIEW_GROUPS_TABLE = "interview_groups";
const DELEGATIONS_TABLE = "interview_delegations";
const INTERVIEW_APPLICANT_RECORDS_TABLE = "interviewed_applicant_records";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn(DELEGATIONS_TABLE, "groupId", {
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: INTERVIEW_GROUPS_TABLE,
      key: "id",
    },
  });

  await sequelize
    .getQueryInterface()
    .removeColumn(INTERVIEW_APPLICANT_RECORDS_TABLE, "schedulingLink");
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .addColumn(INTERVIEW_APPLICANT_RECORDS_TABLE, "schedulingLink", {
      type: DataType.STRING,
      allowNull: true,
      defaultValue: null,
    });
  await sequelize
    .getQueryInterface()
    .removeColumn(DELEGATIONS_TABLE, "groupId");
};
