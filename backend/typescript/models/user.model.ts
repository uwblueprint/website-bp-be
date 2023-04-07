import {
  Column,
  DataType,
  BelongsToMany,
  HasMany,
  Model,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import { Role } from "../types";
import ApplicationDashboardTable from "./applicationDashboard.model";

@Table({ tableName: "users" })
export default class User extends Model {
  @Column({ type: DataType.STRING })
  first_name!: string;

  @Column({ type: DataType.STRING })
  last_name!: string;

  @Column({ type: DataType.STRING })
  email!: string;

  @Column({ type: DataType.STRING })
  auth_id!: string;

  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.ENUM("User", "Admin") })
  role!: Role;

  @HasMany(() => ApplicationDashboardTable)
  applicationDashboards?: ApplicationDashboardTable[];
}
