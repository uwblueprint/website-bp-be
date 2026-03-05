import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./user.model";

@Table({ tableName: "firebase_files" })
export default class File extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  storagePath!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  originalFileName!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  uploadedUserId!: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  sizeBytes!: bigint;

  @Column({ type: DataType.DATE, allowNull: false })
  createdAt!: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  updatedAt!: Date;
}
