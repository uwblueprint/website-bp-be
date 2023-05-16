import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "../types";

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

  @Column({ type: DataType.INTEGER, primaryKey: true })
  id!: number;

  @Column({ type: DataType.ENUM("User", "Admin") })
  role!: Role;
}
