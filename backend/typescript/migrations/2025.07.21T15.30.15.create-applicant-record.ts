import { DataType } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Migration } from "../umzug";

import allApplications from "./applicationlist.json";
import applicants from "./separateJSONs";
import {
  ApplicationStatus,
  SkillCategory,
  ApplicantRole,
  EngineeringPositionTitles,
  DesignPositionTitles,
  ProductPositionTitles,
  CommunityPositionTitles,
} from "../types";

const ALL_POSITION_TITLES = [
  ...EngineeringPositionTitles,
  ...DesignPositionTitles,
  ...ProductPositionTitles,
  ...CommunityPositionTitles,
];

const MAX_SHORT_ANSWER_LENGTH = 255;

function normalizeApplicantRole(role: string): string {
  if (!role) return "President";
  const trimmed = role.trim();
  if (trimmed.toLowerCase() === "project developer") return "Developer";
  // Capitalize each word for comparison
  const formatted = trimmed.replace(/\b\w/g, (c) => c.toUpperCase());
  if (ALL_POSITION_TITLES.includes(formatted as any)) return formatted;
  return "President";
}

type ApplicantRecord = {
  id: string;
  applicantId: string;
  position: string;
  roleSpecificQuestions: string[] | null;
  choice: number;
  status: ApplicationStatus;
  skillCategory: SkillCategory | null;
  extraInfo: string | null;
};

const applicantRecords: ApplicantRecord[] = [];
allApplications.forEach((app, idx) => {
  const applicantId = applicants[idx].id;

  // First choice
  if (app.firstChoiceRole) {
    const roleSpecificQs =
      app.roleSpecificQuestions
        ?.filter((q) => q.role === app.firstChoiceRole)
        ?.flatMap(
          (q) =>
            q.questions?.map((question) =>
              JSON.stringify(question).slice(0, MAX_SHORT_ANSWER_LENGTH),
            ) || [],
        ) || [];
    applicantRecords.push({
      id: uuidv4(),
      applicantId,
      position: normalizeApplicantRole(app.firstChoiceRole),
      roleSpecificQuestions: roleSpecificQs.length > 0 ? roleSpecificQs : null,
      choice: 1,
      status: (app.status as ApplicationStatus) || "Applied",
      skillCategory: null,
      extraInfo: JSON.stringify({ adminReview: "seeded_admin_review" }),
    });
  }

  // Second choice
  if (app.secondChoiceRole) {
    const roleSpecificQs =
      app.roleSpecificQuestions
        ?.filter((q) => q.role === app.secondChoiceRole)
        ?.flatMap(
          (q) =>
            q.questions?.map((question) =>
              JSON.stringify(question).slice(0, MAX_SHORT_ANSWER_LENGTH),
            ) || [],
        ) || [];
    applicantRecords.push({
      id: uuidv4(),
      applicantId,
      position: normalizeApplicantRole(app.secondChoiceRole),
      roleSpecificQuestions: roleSpecificQs.length > 0 ? roleSpecificQs : null,
      choice: 2,
      status: (app.status as ApplicationStatus) || "Applied",
      skillCategory: null,
      extraInfo: JSON.stringify({ adminReview: "seeded_admin_review" }),
    });
  }
});

const TABLE_NAME = "applicant_records";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: DataType.STRING,
      allowNull: false,
      primaryKey: true,
    },
    applicantId: {
      type: DataType.STRING,
      allowNull: false,
      references: {
        model: "applicants",
        key: "id",
      },
    },
    position: {
      type: DataType.STRING,
      allowNull: true,
      references: {
        model: "positions",
        key: "title",
      },
    },
    roleSpecificQuestions: {
      type: DataType.ARRAY(DataType.STRING),
      allowNull: true,
    },
    choice: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataType.STRING,
      allowNull: false,
    },
    skillCategory: {
      type: DataType.STRING,
      allowNull: true,
    },
    extraInfo: {
      type: DataType.JSONB,
      allowNull: true,
    },
  });
  await sequelize.getQueryInterface().bulkInsert(TABLE_NAME, applicantRecords);
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
