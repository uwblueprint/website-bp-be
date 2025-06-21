import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./user.model";
import { Department } from "../types";

@Table({ tableName: "admins" })
export default class Admin extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  userId!: number;

  @Column({ type: DataType.ARRAY(DataType.ENUM(...Object.values(Department))) })
  authorizedDepartments!: Department[];
}
