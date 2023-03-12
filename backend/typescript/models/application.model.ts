import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'applications' })
export default class Application extends Model {
  @Column({ type: DataType.STRING })
  email!: string;

  @Column({ type: DataType.STRING })
  firstName!: string;

  @Column({ type: DataType.STRING })
  lastName!: string;

  @Column({ type: DataType.STRING })
  location!: string;

  @Column({ type: DataType.STRING })
  organizationName!: string;

  @Column({ type: DataType.STRING })
  phoneNumber!: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  preferredContactMethods!: string[];

  @Column({ type: DataType.ARRAY(DataType.JSON) })
  questions!: { answer: string; placeholder: string; question: string }[];

  @Column({ type: DataType.ENUM('pending', 'accepted', 'rejected') })
  status!: String;

  @Column({ type: DataType.STRING })
  website!: string;

  @Column({ type: DataType.DATE })
  timestamp!: Date;
}
