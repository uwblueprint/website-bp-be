import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./user.model";
import ApplicantRecord from "./applicantRecord.model";

@Table({ tableName: "admin_comments" })
export default class AdminComment extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @ForeignKey(() => ApplicantRecord)
  @Column({ type: DataType.UUID, allowNull: false })
  applicantRecordId!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  comment!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  createdAt!: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  updatedAt!: Date;
}
