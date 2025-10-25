/* eslint import/no-cycle: 0 */

import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { NonAttribute } from "sequelize";
import ApplicantRecord from "./applicantRecord.model";

@Table({ tableName: "applicants" })
export default class Applicant extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({ type: DataType.STRING })
  academicOrCoop!: string;

  @Column({ type: DataType.STRING })
  academicYear!: string;

  @Column({ type: DataType.STRING })
  email!: string;

  @Column({ type: DataType.STRING })
  firstName!: string;

  @Column({ type: DataType.STRING })
  lastName!: string;

  @Column({ type: DataType.STRING })
  heardFrom!: string;

  @Column({ type: DataType.STRING })
  locationPreference!: string;

  @Column({ type: DataType.STRING })
  program!: string;

  @Column({ type: DataType.STRING })
  pronouns!: string;

  @Column({ type: DataType.STRING })
  resumeUrl!: string;

  @Column({ type: DataType.INTEGER })
  timesApplied!: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  shortAnswerQuestions!: string[];

  @Column({ type: DataType.STRING })
  term!: string;

  @Column({ type: DataType.DATE })
  submittedAt!: Date;

  @HasMany(() => ApplicantRecord, {
    foreignKey: "id",
    as: "applicant",
  })
  applicantRecords?: NonAttribute<ApplicantRecord[]>;
}
