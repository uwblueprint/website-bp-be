/* eslint import/no-cycle: 0 */
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { InterviewGroupStatus, InterviewGroupStatusEnum } from "../types";
import InterviewDelegation from "./interviewDelegation.model";

@Table({ tableName: "interview_groups" })
export default class InterviewGroup extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  schedulingLink?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: InterviewGroupStatusEnum.AVAILABILITY_PENDING,
  })
  status!: InterviewGroupStatus;

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

  @HasMany(() => InterviewDelegation, "groupId")
  interviewDelegations?: InterviewDelegation[];
}
