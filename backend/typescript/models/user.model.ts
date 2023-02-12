import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "USER" })
export default class User extends Model {
  @Column({ type: DataType.STRING })
  name!: string;

  @Column({ type: DataType.STRING })
  email!: string;

  @Column({ type: DataType.INTEGER })
  id!: number;
}
