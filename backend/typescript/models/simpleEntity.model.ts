import { Column, Model, Table, DataType } from "sequelize-typescript";

import { Letters } from "../types";

@Table({ tableName: "simple_entities" })
export default class SimpleEntity extends Model {
  @Column
  string_field!: string;

  @Column
  int_field!: number;

  @Column({ type: DataType.ENUM("A", "B", "C", "D") })
  enum_field!: Letters;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  string_array_field!: string[];

  @Column
  bool_field!: boolean;
}
