/* eslint import/no-cycle: 0 */

import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import ApplicationDashboardTable from "./applicationDashboard.model";
import User from "./user.model";
import { Review, ReviewStatus, ReviewStatusEnum } from "../types";
import Application from "./application.model";

@Table({ tableName: "reviewed_applications" })
export default class ReviewedApplication extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @ForeignKey(() => Application)
  @Column({ type: DataType.INTEGER })
  applicationId!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  reviewId!: number;

  @Column({ type: DataType.JSONB })
  review!: Review;

  @Column({
    type: DataType.ENUM(...Object.values(ReviewStatusEnum)),
    defaultValue: ReviewStatusEnum.TODO,
  })
  status!: ReviewStatus;

  @Column({ type: DataType.DATE })
  submittedAt!: Date;

  @Column({ type: DataType.DATE })
  createdAt!: Date;

  // TODO: Add when Jesse's PR is merged
  @HasMany(() => ApplicationDashboardTable)
  applicationDashboards?: ApplicationDashboardTable[];
}
