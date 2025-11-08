/* eslint import/no-cycle: 0 */

import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from "sequelize-typescript";
import { NonAttribute } from "sequelize";
import {
  Review,
  ReviewStatus,
  ReviewStatusEnum,
  SkillCategory,
} from "../types";
import ApplicantRecord from "./applicantRecord.model";
import User from "./user.model";

@Table({ 
  tableName: "reviewed_applicant_records",
  timestamps: false
})
export default class ReviewedApplicantRecord extends Model {
  @ForeignKey(() => ApplicantRecord)
  @Column({ type: DataType.STRING, primaryKey: true })
  applicantRecordId!: string;

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

  @Column({
    type: DataType.STRING,
    defaultValue: null,
    allowNull: true,
  })
  skillCategory?: SkillCategory;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  score?: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  reviewerHasConflict!: boolean;

  @BelongsTo(() => User, { foreignKey: "reviewerId", targetKey: "id" })
  user?: NonAttribute<User>;
}
