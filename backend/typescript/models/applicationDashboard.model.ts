/* eslint import/no-cycle: 0 */

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import Application from "./application.model";
import User from "./user.model";

@Table({ tableName: "applicationdashboardtable" })
export default class ApplicationDashboardTable extends Model {
  @Column({ type: DataType.STRING })
  reviewerEmail!: string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({ type: DataType.INTEGER })
  passionFSG!: number;

  @Column({ type: DataType.INTEGER })
  teamPlayer!: number;

  @Column({ type: DataType.INTEGER })
  desireToLearn!: number;

  @Column({ type: DataType.INTEGER })
  skill!: number;

  @Column({ type: DataType.ENUM("junior", "intermediate", "senior") })
  skillCategory!: string;

  @Column({ type: DataType.STRING })
  reviewerComments!: string;

  @Column({ type: DataType.ENUM("N/A", "considered", "not considered") })
  recommendedSecondChoice!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  reviewerId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Application)
  @Column({ type: DataType.INTEGER })
  applicationId!: number;

  @BelongsTo(() => Application)
  application!: Application;
}
