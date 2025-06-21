/* eslint-disable @typescript-eslint/no-var-requires */
import fs from "fs";
import path from "path";

const MIGRATIONS_DIR = path.resolve(__dirname, "../typescript/migrations");

const migrationName = process.argv[2];

if (!migrationName) {
  console.error(
    "❌ Please provide a migration name. Usage: ts-node scripts/createMigration.ts create-reviewed-applications",
  );
  process.exit(1);
}

const timestamp = new Date()
  .toISOString()
  .replace(/[-:.TZ]/g, "")
  .slice(0, 14);
const fileName = `${timestamp}-${migrationName}.ts`;
const filePath = path.join(MIGRATIONS_DIR, fileName);

const template = `import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";

const TABLE_NAME = "your table name here";

export const up: Migration = async ({ context: sequelize }) => {
  
};

export const down: Migration = async ({ context: sequelize }) => {
};
`;

fs.writeFileSync(filePath, template);
console.log(`✅ Migration created: ${filePath}`);
