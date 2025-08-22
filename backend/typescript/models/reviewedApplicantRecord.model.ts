/* eslint import/no-cycle: 0 */

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./user.model";
import { Review, ReviewStatus, ReviewStatusEnum } from "../types";
import ApplicantRecord from "./applicantRecord.model";

@Table({ tableName: "reviewed_applicant_records" })
export default class ReviewedApplicantRecord extends Model {
  @ForeignKey(() => ApplicantRecord)
  @Column({ type: DataType.STRING, primaryKey: true })
  applicantRecordId!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  reviewerId!: number;

  @Column({ type: DataType.JSONB })
  review!: Review;

  @Column({
    type: DataType.STRING,
    defaultValue: ReviewStatusEnum.TODO,
  })
  status!: ReviewStatus;

  @BelongsTo(() => ApplicantRecord, "applicantRecordId")
  applicantRecord!: ApplicantRecord;

  @BelongsTo(() => User, "reviewerId")
  reviewer!: User;
}
