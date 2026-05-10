/* eslint import/no-cycle: 0 */

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { NonAttribute } from "sequelize";
import { Role } from "../types";
import File from "./file.model";
import Position from "./position.model";
import ReviewedApplicantRecord from "./reviewedApplicantRecord.model";

@Table({ tableName: "users" })
export default class User extends Model {
  @Column({ type: DataType.STRING })
  first_name!: string;

  @Column({ type: DataType.STRING })
  last_name!: string;

  @Column({ type: DataType.STRING, primaryKey: true })
  email!: string;

  @Column({ type: DataType.STRING })
  auth_id!: string;

  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ type: DataType.ENUM("User", "Admin") })
  role!: Role;

  @ForeignKey(() => Position)
  @Column({ type: DataType.STRING })
  position?: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive!: boolean;

  @ForeignKey(() => File)
  @Column({ type: DataType.UUID, allowNull: true })
  profilePictureFileId?: string;

  @BelongsTo(() => File, { foreignKey: "profilePictureFileId" })
  profilePicture?: NonAttribute<File>;

  @HasMany(() => ReviewedApplicantRecord, {
    foreignKey: "reviewerId",
    sourceKey: "id",
  })
  reviewedApplicantRecords?: NonAttribute<ReviewedApplicantRecord[]>;
}
