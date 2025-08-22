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
    type: DataType.STRING,
    primaryKey: true,
    unique: true,
  })
  id!: string;

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

  @HasMany(() => ReviewedApplicantRecord, "applicantRecordId")
  reviews!: ReviewedApplicantRecord[];

  @BelongsTo(() => Applicant, "applicantId")
  applicant!: Applicant;
}
