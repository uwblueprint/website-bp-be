/* eslint-disable @typescript-eslint/naming-convention */
import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";

const USER_TABLE = "users";
const APPLICANT_RECORDS_TABLE = "applicant_records";

const POSITION_TABLE = "positions";

const POSITION_DATA = [
  { title: "Project Lead", department: "Engineering" },
  { title: "Developer", department: "Engineering" },
  { title: "VP Engineering", department: "Engineering" },
  { title: "Designer", department: "Design" },
  { title: "VP Design", department: "Design" },
  { title: "Product Manager", department: "Product" },
  { title: "VP Product", department: "Product" },
  { title: "President", department: "Community" },
  { title: "VP Scoping", department: "Community" },
  { title: "VP Talent", department: "Community" },
  { title: "VP Finance", department: "Community" },
  { title: "Director Lead", department: "Community" },
  { title: "Internal Director", department: "Community" },
  { title: "External Director", department: "Community" },
  { title: "Content Strategist", department: "Community" },
  { title: "Graphic Designer", department: "Community" },
];

const POSITION_TITLES = [
  "Project Lead",
  "Developer",
  "VP Engineering",
  "Designer",
  "VP Design",
  "Product Manager",
  "VP Product",
  "President",
  "VP Scoping",
  "VP Talent",
  "VP Finance",
  "Director Lead",
  "Internal Director",
  "External Director",
  "Content Strategist",
  "Graphic Designer",
];

const DEPARTMENT_TITLES = ["Engineering", "Design", "Product", "Community"];

const position = "position";
const enum_positions_title = "enum_positions_title";
const enum_applicant_records_position = "enum_applicant_records_position";
const enum_positions_department = "enum_positions_department";

export const up: Migration = async ({ context: sequelize }) => {
  // Drop FK constraints referencing positions
  await sequelize.getQueryInterface().sequelize.query(`
    ALTER TABLE "${USER_TABLE}" DROP CONSTRAINT IF EXISTS "${USER_TABLE}_${position}_fkey";
    ALTER TABLE "${APPLICANT_RECORDS_TABLE}" DROP CONSTRAINT IF EXISTS "${APPLICANT_RECORDS_TABLE}_${position}_fkey";
  `);

  // Drop the enum-based positions table
  await sequelize.getQueryInterface().dropTable(POSITION_TABLE);

  // Recreate positions table with string columns
  await sequelize.getQueryInterface().createTable(POSITION_TABLE, {
    title: {
      type: DataType.STRING,
      allowNull: false,
      primaryKey: true,
    },
    department: {
      type: DataType.STRING,
      allowNull: false,
    },
  });

  // Re seed positions data
  await sequelize.getQueryInterface().bulkInsert(POSITION_TABLE, POSITION_DATA);

  // Convert enum columns in users and applicant_records to type string
  await sequelize.getQueryInterface().sequelize.query(`
    ALTER TABLE "${USER_TABLE}"
    ALTER COLUMN "${position}" TYPE VARCHAR(255)
    USING ("${position}"::text);
  `);
  await sequelize.getQueryInterface().sequelize.query(`
    ALTER TABLE "${APPLICANT_RECORDS_TABLE}"
    ALTER COLUMN "${position}" TYPE VARCHAR(255)
    USING ("${position}"::text);
  `);

  // Re add FKs referencing string positions.title
  await sequelize.getQueryInterface().sequelize.query(`
    ALTER TABLE "${USER_TABLE}"
    ADD CONSTRAINT "${USER_TABLE}_${position}_fkey"
    FOREIGN KEY ("${position}") REFERENCES "${POSITION_TABLE}" ("title")
    ON DELETE SET NULL ON UPDATE CASCADE;
  `);
  await sequelize.getQueryInterface().sequelize.query(`
    ALTER TABLE "${APPLICANT_RECORDS_TABLE}"
    ADD CONSTRAINT "${APPLICANT_RECORDS_TABLE}_${position}_fkey"
    FOREIGN KEY ("${position}") REFERENCES "${POSITION_TABLE}" ("title")
    ON DELETE SET NULL ON UPDATE CASCADE;
  `);

  // Drop old enum types
  await sequelize
    .getQueryInterface()
    .sequelize.query(`DROP TYPE IF EXISTS "${enum_positions_title}" CASCADE;`);
  await sequelize
    .getQueryInterface()
    .sequelize.query(
      `DROP TYPE IF EXISTS "${enum_positions_department}}" CASCADE;`,
    );
  await sequelize
    .getQueryInterface()
    .sequelize.query(
      `DROP TYPE IF EXISTS "${enum_applicant_records_position}" CASCADE;`,
    );
};

export const down: Migration = async ({ context: sequelize }) => {
  // Drop foreign key constraints referencing positions table
  await sequelize.getQueryInterface().sequelize.query(`
    ALTER TABLE "${USER_TABLE}" DROP CONSTRAINT IF EXISTS "${USER_TABLE}_${position}_fkey";
    ALTER TABLE "${APPLICANT_RECORDS_TABLE}" DROP CONSTRAINT IF EXISTS "${APPLICANT_RECORDS_TABLE}_${position}_fkey";
    `);

  // Drop the string based positions table
  await sequelize.getQueryInterface().dropTable(POSITION_TABLE);

  // Recreate table with enums
  await sequelize.getQueryInterface().createTable(POSITION_TABLE, {
    title: {
      type: DataType.ENUM(...POSITION_TITLES),
      allowNull: false,
      primaryKey: true,
    },
    department: {
      type: DataType.ENUM(...DEPARTMENT_TITLES),
      allowNull: false,
    },
  });

  // Seed ENUM based positions table
  await sequelize.getQueryInterface().bulkInsert(POSITION_TABLE, POSITION_DATA);

  // change column type from string to enum
  await sequelize.getQueryInterface().sequelize.query(`
  ALTER TABLE "users"
  ALTER COLUMN "position" TYPE "${enum_positions_title}"
  USING ("position"::text::"${enum_positions_title}");
`);

  // change column type from string to enum
  await sequelize.getQueryInterface().sequelize.query(`
  ALTER TABLE "applicant_records"
  ALTER COLUMN "position" TYPE "${enum_positions_title}"
  USING ("position"::text::"${enum_positions_title}");
`);

  // add back foreign keys
  await sequelize.getQueryInterface().sequelize.query(`
    ALTER TABLE "${USER_TABLE}"
    ADD CONSTRAINT "${USER_TABLE}_${position}_fkey"
    FOREIGN KEY ("${position}") REFERENCES "${POSITION_TABLE}" ("title")
    ON DELETE SET NULL ON UPDATE CASCADE;
  `);
  await sequelize.getQueryInterface().sequelize.query(`
    ALTER TABLE "${APPLICANT_RECORDS_TABLE}"
    ADD CONSTRAINT "${APPLICANT_RECORDS_TABLE}_${position}_fkey"
    FOREIGN KEY ("${position}") REFERENCES "${POSITION_TABLE}" ("title")
    ON DELETE SET NULL ON UPDATE CASCADE;
  `);
};
