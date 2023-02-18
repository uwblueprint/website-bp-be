import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from '../types'

@Table({ tableName: "users" })
export default class User extends Model {
  @Column({ type: DataType.STRING })
  name!: string;

  @Column({ type: DataType.STRING })
  email!: string;

  @Column({ type: DataType.INTEGER })
  id!: number;

  @Column({ type: DataType.ENUM("User", "Admin") })
  role!: Role;
}
