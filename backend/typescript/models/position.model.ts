import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Department, PositionTitle, PositionTitles } from "../types";

@Table({ tableName: "positions" })
export default class Position extends Model {
  @Column({ type: DataType.ENUM(...PositionTitles), primaryKey: true })
  title!: PositionTitle;

  @Column({ type: DataType.ENUM(...Object.values(Department)) })
  department!: Department;
}
