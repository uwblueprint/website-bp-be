import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "positions" })
export default class Position extends Model {
  @Column({ type: DataType.STRING, primaryKey: true })
  title!: string;

  @Column({ type: DataType.STRING })
  department!: string;
}
