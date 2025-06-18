import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Department } from "../types";

@Table({ tableName: "positions" })
export default class Position extends Model {
  @Column({ type: DataType.STRING, primaryKey: true })
  title!: string;

  @Column({ type: DataType.ENUM(...Object.values(Department)) })
  department!: string;
}
