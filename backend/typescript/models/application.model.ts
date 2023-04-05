import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "applications" })
export default class Application extends Model {
  @Column({ type: DataType.STRING })
  academicYear!: string;

  @Column({ type: DataType.BOOLEAN })
  binaryQuestion1!: string;

  @Column({ type: DataType.BOOLEAN })
  binaryQuestion2!: string;

  @Column({ type: DataType.ARRAY(DataType.JSON) })
  binaryQuestions!: {
    binaryOptions: { value: string }[];
    question: string;
    selected: string;
  }[];

  @Column({ type: DataType.STRING })
  dropdownQuestion1!: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  dropdownQuestions!: {
    options: { value: string }[];
    question: string;
    selected: string;
  }[];

  @Column({ type: DataType.STRING })
  email!: string;

  @Column({ type: DataType.STRING })
  firstName!: string;

  @Column({ type: DataType.STRING })
  lastName!: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  positions!: string[];

  @Column({ type: DataType.STRING })
  program!: string;

  @Column({ type: DataType.STRING })
  question1!: string;

  @Column({ type: DataType.STRING })
  question2!: string;

  @Column({ type: DataType.STRING })
  question3!: string;

  @Column({ type: DataType.STRING })
  question4!: string;

  @Column({ type: DataType.STRING })
  question5!: string;

  @Column({ type: DataType.ARRAY(DataType.JSON) })
  questions!: { answer: string; placeholder: string; question: string }[];

  @Column({ type: DataType.STRING })
  resume!: string;

  @Column({ type: DataType.STRING })
  resumeInput!: string;

  @Column({ type: DataType.STRING })
  resumeUrl!: string;

  @Column({ type: DataType.STRING })
  roleQuestion1!: string;

  @Column({ type: DataType.STRING })
  roleQuestion2!: string;

  @Column({ type: DataType.STRING })
  roleQuestion3!: string;

  @Column({ type: DataType.STRING })
  roleQuestion4!: string;

  @Column({ type: DataType.STRING })
  roleQuestion5!: string;

  @Column({ type: DataType.STRING })
  roleQuestion6!: string;

  @Column({ type: DataType.STRING })
  roleQuestion7!: string;

  @Column({ type: DataType.STRING })
  roleQuestion8!: string;

  @Column({ type: DataType.STRING })
  roleQuestion9!: string;

  @Column({ type: DataType.ARRAY(DataType.JSON) })
  roleSpecificQuestions!: { answer: string }[];

  @Column({ type: DataType.ENUM("pending", "accepted", "rejected") })
  status!: string;

  @Column({ type: DataType.DATE })
  timestamp!: Date;
}
