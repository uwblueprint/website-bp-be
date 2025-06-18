/* eslint import/no-cycle: 0 */

import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import ApplicationDashboardTable from "./applicationDashboard.model";
import { ApplicationStatus, SkillCategory } from "../types";
import Applicant from "./applicant.model";

@Table({ tableName: "applicantresponse" })
export default class ApplicantRecord extends Model {
  @Column({ type: DataType.STRING, primaryKey: true })
  id!: string;

  @ForeignKey(() => Applicant)
  @Column({ type: DataType.STRING })
  applicantId!: string;

  // @ForeignKey(() => Role)
  // @Column({ type: DataType.STRING })
  // role!: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  roleSpecificQuestions!: string[];

  @Column({ type: DataType.INTEGER })
  choice!: number;

  @Column({ type: DataType.STRING })
  status!: ApplicationStatus;

  @Column({ type: DataType.STRING, allowNull: true })
  skillCategory!: SkillCategory;
}
