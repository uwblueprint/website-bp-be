/* eslint import/no-cycle: 0 */

import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import {
  ApplicantRecordExtraInfo,
  ApplicationStatus,
  SkillCategory,
} from "../types";
import Applicant from "./applicant.model";
import Position from "./position.model";

@Table({ tableName: "applicant_records" })
export default class ApplicantRecord extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    unique: true,
  })
  id!: number;

  @ForeignKey(() => Applicant)
  @Column({ type: DataType.STRING })
  applicantId!: string;

  @ForeignKey(() => Position)
  @Column({ type: DataType.STRING })
  position!: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  roleSpecificQuestions!: string[];

  @Column({ type: DataType.INTEGER })
  choice!: number;

  @Column({ type: DataType.STRING })
  status!: ApplicationStatus;

  @Column({ type: DataType.STRING, allowNull: true })
  skillCategory!: SkillCategory;

  @Column({ type: DataType.JSONB, allowNull: true })
  extraInfo!: ApplicantRecordExtraInfo;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  updatedAt!: Date;
}
