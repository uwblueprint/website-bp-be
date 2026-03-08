/* eslint import/no-cycle: 0 */
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { InterviewGroupStatus, InterviewGroupStatusEnum } from "../types";
import InterviewDelegation from "./interviewDelegation.model";

@Table({ tableName: "interview_groups" })
export default class InterviewGroup extends Model {
  @Column({ type: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  schedulingLink?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: InterviewGroupStatusEnum.AVAILABILITY_PENDING,
  })
  status!: InterviewGroupStatus;

  @HasMany(() => InterviewDelegation, "groupId")
  interviewDelegations?: InterviewDelegation[];
}
