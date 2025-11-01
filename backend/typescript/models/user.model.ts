/* eslint import/no-cycle: 0 */

import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { NonAttribute } from "sequelize";
import { PositionTitle, PositionTitles, Role } from "../types";
import ApplicationDashboardTable from "./applicationDashboard.model";
import Position from "./position.model";
import ReviewedApplicantRecord from "./reviewedApplicantRecord.model";

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

  @Column({ type: DataType.ENUM("User", "Admin") })
  role!: Role;

  @ForeignKey(() => Position)
  @Column({ type: DataType.ENUM(...Object.values(PositionTitles)) })
  position?: PositionTitle;

  @HasMany(() => ApplicationDashboardTable)
  applicationDashboards?: ApplicationDashboardTable[];

  @HasMany(() => ReviewedApplicantRecord, {
    foreignKey: "reviewerId",
    as: "user",
  })
  reviewedApplicantRecords?: NonAttribute<ReviewedApplicantRecord[]>;
}
