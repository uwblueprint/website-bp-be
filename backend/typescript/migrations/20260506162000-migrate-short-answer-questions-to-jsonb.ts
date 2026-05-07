import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";

const TABLE_NAME = "applicants";
const OLD_COLUMN_NAME = "shortAnswerQuestions";
const NEW_COLUMN_NAME = "shortQuestionAnswers";

export const up: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.removeColumn(TABLE_NAME, OLD_COLUMN_NAME);
  await queryInterface.addColumn(TABLE_NAME, NEW_COLUMN_NAME, {
    type: DataType.JSONB,
    allowNull: false,
    defaultValue: [],
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.removeColumn(TABLE_NAME, NEW_COLUMN_NAME);
  await queryInterface.addColumn(TABLE_NAME, OLD_COLUMN_NAME, {
    type: DataType.ARRAY(DataType.STRING(4000)),
    allowNull: true,
  });
};
