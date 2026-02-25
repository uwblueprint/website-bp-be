/* eslint import/no-cycle: 0 */

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { NonAttribute } from "sequelize";
import { InterviewConflict } from "../types";
import User from "./user.model";
import InterviewedApplicantRecord from "./interviewedApplicantRecord.model";

@Table({ tableName: "interview_delegations" })
export default class InterviewDelegation extends Model {
  @ForeignKey(() => InterviewedApplicantRecord)
  @Column({ type: DataType.UUID, primaryKey: true })
  interviewedApplicantRecordId!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  interviewerId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  interviewHasConflict?: InterviewConflict;

  @BelongsTo(() => InterviewedApplicantRecord, {
    foreignKey: "interviewedApplicantRecordId",
    targetKey: "id",
  })
  interviewedApplicantRecord?: NonAttribute<InterviewedApplicantRecord>;

  @BelongsTo(() => User, {
    foreignKey: "interviewerId",
    targetKey: "id",
  })
  interviewer?: NonAttribute<User>;
}
