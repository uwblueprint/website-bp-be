# Prefaces
Project created with `starter-code-v2` as the UWBlueprint's backend repository.
# Migrations


##  Create Migration File
This repository includes a script for generating migration files in the `typescript/migrations` directory. The script automates the creation of migration files with a timestamped name and a basic template.

To run the script, use the following command:
```bash
cd backend/typescript
```
```bash
ts-node create-migrate.ts <name of migration>
```
Example:
```bash
ts-node create-migrate.ts create-applicant-table
```
##  Running Migrations
To apply all pending migrations to the database, use the following command. This will execute the migration files sequentially and update the database schema:
```bash
docker exec recruitment_tools_backend node migrate up  
```