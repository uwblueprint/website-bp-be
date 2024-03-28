/* eslint import/no-cycle: 0 */

import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Permission, Role } from "../types";
import ApplicationDashboardTable from "./applicationDashboard.model";

@Table({ tableName: "users" })
export default class User extends Model {
  @Column({ type: DataType.STRING })
  first_name!: string;

  @Column({ type: DataType.STRING })
  last_name!: string;

  @Column({ type: DataType.STRING, primaryKey: true })
  email!: string;

  @Column({ type: DataType.STRING })
  auth_id!: string;

  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.ENUM("VP Talent", "Eteam", "Engineering", "Product", "Design", "Reviewers"), allowNull: false, defaultValue: 'Reviewers' })
  permission!: Permission;

  @Column({ type: DataType.ENUM("Developer, Designer"), allowNull: false })
  role!: Role;

  @HasMany(() => ApplicationDashboardTable)
  applicationDashboards?: ApplicationDashboardTable[];
}
