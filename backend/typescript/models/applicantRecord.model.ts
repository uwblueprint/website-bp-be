/* eslint import/no-cycle: 0 */

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { NonAttribute } from "sequelize";
import {
  ApplicantRecordExtraInfo,
  ApplicationStatus,
  SkillCategory,
} from "../types";
import Applicant from "./applicant.model";
import Position from "./position.model";
import ReviewedApplicantRecord from "./reviewedApplicantRecord.model";

@Table({ tableName: "applicant_records" })
export default class ApplicantRecord extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
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
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  combined_score!: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isApplicantFlagged!: boolean;

  @BelongsTo(() => Applicant, "applicantId")
  applicant?: NonAttribute<Applicant>;

  @HasMany(() => ReviewedApplicantRecord, "applicantRecordId")
  reviewedApplicantRecords?: NonAttribute<ReviewedApplicantRecord[]>;
}
