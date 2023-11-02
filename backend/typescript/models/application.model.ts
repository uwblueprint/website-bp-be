/* eslint import/no-cycle: 0 */

import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import ApplicationDashboardTable from "./applicationDashboard.model";
import { DataTypes, Sequelize } from "sequelize";
import { statusType, secondChoiceStatusType } from "../types";


@Table({ tableName: "applicantresponse" })
export default class Application extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.STRING })
  academicOrCoop!: string;

  @Column({ type: DataType.STRING })
  academicYear!: string;

  @Column({ type: DataType.STRING })
  email!: string;

  @Column({ type: DataType.STRING })
  firstChoiceRole!: string;

  @Column({ type: DataType.STRING })
  firstName!: string;

  @Column({ type: DataType.STRING })
  heardFrom!: string;

  @Column({ type: DataType.STRING })
  lastName!: string;

  @Column({ type: DataType.STRING })
  locationPreference!: string;

  @Column({ type: DataType.STRING })
  program!: string;

  @Column({ type: DataType.STRING })
  pronouns!: string;

  @Column({ type: DataType.STRING })
  pronounsSpecified!: string;

  @Column({ type: DataType.STRING })
  resumeUrl!: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  roleSpecificQuestions!: string[];

  @Column({ type: DataType.STRING })
  secondChoiceRole!: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  shortAnswerQuestions!: string[];

  @Column({ 
    type: DataType.ENUM(...Object.values(statusType)),
    defaultValue: statusType.PENDING
  })
  status!: statusType;

  @Column({
    type: DataTypes.ENUM(...Object.values(secondChoiceStatusType)),
    defaultValue: secondChoiceStatusType.NOT_APPLICABLE
  })
  secondChoiceStatus!: secondChoiceStatusType;

  @Column({ type: DataType.STRING })
  term!: string;

  @Column({ type: DataType.STRING })
  timesApplied!: string;

  @Column({ type: DataType.STRING })
  timestamp!: bigint;

  @HasMany(() => ApplicationDashboardTable)
  applicationDashboards?: ApplicationDashboardTable[];
}
