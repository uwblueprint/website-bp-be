import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./user.model";

@Table({ tableName: "admins" })
export default class Admin extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.STRING, primaryKey: true })
  userId!: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  authorizedDepartments!: string[];
}
