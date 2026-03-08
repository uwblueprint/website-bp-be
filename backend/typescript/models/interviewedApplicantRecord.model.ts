import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Interview, InterviewStatus, InterviewStatusEnum } from "../types";
import ApplicantRecord from "./applicantRecord.model";
import File from "./file.model";

@Table({ tableName: "interviewed_applicant_records" })
export default class InterviewedApplicantRecord extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => ApplicantRecord)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  applicantRecordId!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  score?: number;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  interviewJson?: Interview;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: InterviewStatusEnum.NEEDS_REVIEW,
  })
  status!: InterviewStatus;

  @ForeignKey(() => File)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  interviewNotesId?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  interviewDate?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt!: Date;
}
