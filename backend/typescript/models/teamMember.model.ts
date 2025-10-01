import { Column, DataType, Model, Table } from "sequelize-typescript";
import { TeamRole, teamRoleValues } from "../types";

@Table({ tableName: "team_members" })
export default class TeamMember extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  firstName!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName!: string;

  @Column({
    type: DataType.ENUM(...teamRoleValues),
    allowNull: false,
  })
  teamRole!: TeamRole;
}
