import { QueryTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { Migration } from "../umzug";

type UserRow = { id: number };
type ApplicantRecordRow = { id: string };
type ReviewedKeyRow = { applicantRecordId: string; reviewerId: number };
type InterviewedRow = { id: string; applicantRecordId: string };
type DelegationKeyRow = {
  interviewedApplicantRecordId: string;
  interviewerId: number;
};

type GroupRow = { id: string };

type CountRow = { count: string };

export const up: Migration = async ({ context: sequelize }) => {
  // 1) Seed entities if empty.
  const entityCountResult = (await sequelize.query(
    'SELECT COUNT(*)::text AS count FROM "entities"',
    { type: QueryTypes.SELECT },
  )) as CountRow[];
  const entityCount = Number(entityCountResult[0]?.count ?? "0");

  if (entityCount === 0) {
    await sequelize.getQueryInterface().bulkInsert("entities", [
      {
        string_field: "seed-entity-1",
        int_field: 1,
        enum_field: "A",
        string_array_field: ["alpha", "beta"],
        bool_field: true,
        file_name: "seed-file-1.pdf",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        string_field: "seed-entity-2",
        int_field: 2,
        enum_field: "B",
        string_array_field: ["gamma"],
        bool_field: false,
        file_name: "seed-file-2.pdf",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }

  const users = (await sequelize.query(
    'SELECT id FROM "users" ORDER BY id ASC LIMIT 3',
    { type: QueryTypes.SELECT },
  )) as UserRow[];

  const applicantRecords = (await sequelize.query(
    'SELECT id FROM "applicant_records" ORDER BY id ASC LIMIT 5',
    { type: QueryTypes.SELECT },
  )) as ApplicantRecordRow[];

  if (!users.length || !applicantRecords.length) {
    return;
  }

  // 2) Seed reviewed_applicant_records if missing.
  const existingReviewed = (await sequelize.query(
    'SELECT "applicantRecordId", "reviewerId" FROM "reviewed_applicant_records"',
    { type: QueryTypes.SELECT },
  )) as ReviewedKeyRow[];

  const existingReviewedKeys = new Set(
    existingReviewed.map((row) => `${row.applicantRecordId}:${row.reviewerId}`),
  );

  const reviewedRowsToInsert: Array<Record<string, unknown>> = [];
  for (let i = 0; i < Math.min(3, applicantRecords.length); i += 1) {
    const applicantRecordId = applicantRecords[i].id;
    const reviewerId = users[i % users.length].id;
    const key = `${applicantRecordId}:${reviewerId}`;

    if (!existingReviewedKeys.has(key)) {
      reviewedRowsToInsert.push({
        applicantRecordId,
        reviewerId,
        review: {},
        status: "Todo",
        reviewerHasConflict: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      existingReviewedKeys.add(key);
    }
  }

  if (reviewedRowsToInsert.length) {
    await sequelize
      .getQueryInterface()
      .bulkInsert("reviewed_applicant_records", reviewedRowsToInsert);
  }

  // 3) Seed firebase_files if empty.
  const firebaseFileCountResult = (await sequelize.query(
    'SELECT COUNT(*)::text AS count FROM "firebase_files"',
    { type: QueryTypes.SELECT },
  )) as CountRow[];
  const firebaseFileCount = Number(firebaseFileCountResult[0]?.count ?? "0");

  if (firebaseFileCount === 0) {
    await sequelize.getQueryInterface().bulkInsert("firebase_files", [
      {
        id: uuidv4(),
        storagePath: "seed/interview-notes/seed-note-1.txt",
        originalFileName: "seed-note-1.txt",
        uploadedUserId: users[0].id,
        sizeBytes: "128",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }

  // 4) Seed admin_comments if empty.
  const adminCommentCountResult = (await sequelize.query(
    'SELECT COUNT(*)::text AS count FROM "admin_comments"',
    { type: QueryTypes.SELECT },
  )) as CountRow[];
  const adminCommentCount = Number(adminCommentCountResult[0]?.count ?? "0");

  if (adminCommentCount === 0) {
    await sequelize.getQueryInterface().bulkInsert("admin_comments", [
      {
        id: uuidv4(),
        userId: users[0].id,
        applicantRecordId: applicantRecords[0].id,
        comment: "Seed admin comment for local development",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }

  // 5) Seed interviewed_applicant_records for reviewed applicant records.
  const reviewedApplicantIds = (await sequelize.query(
    'SELECT DISTINCT "applicantRecordId" AS id FROM "reviewed_applicant_records" ORDER BY "applicantRecordId" ASC LIMIT 5',
    { type: QueryTypes.SELECT },
  )) as ApplicantRecordRow[];

  const existingInterviewedRows = (await sequelize.query(
    'SELECT id, "applicantRecordId" FROM "interviewed_applicant_records"',
    { type: QueryTypes.SELECT },
  )) as InterviewedRow[];

  const interviewedByApplicantRecordId = new Map<string, string>();
  existingInterviewedRows.forEach((row) => {
    interviewedByApplicantRecordId.set(row.applicantRecordId, row.id);
  });

  const interviewedRowsToInsert: Array<Record<string, unknown>> = [];
  for (const row of reviewedApplicantIds) {
    if (interviewedByApplicantRecordId.has(row.id)) {
      continue;
    }

    const interviewedId = uuidv4();
    interviewedRowsToInsert.push({
      id: interviewedId,
      applicantRecordId: row.id,
      status: "Need Review",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    interviewedByApplicantRecordId.set(row.id, interviewedId);
  }

  if (interviewedRowsToInsert.length) {
    await sequelize
      .getQueryInterface()
      .bulkInsert("interviewed_applicant_records", interviewedRowsToInsert);
  }

  // 6) Seed at least one interview group if empty.
  const existingGroups = (await sequelize.query(
    'SELECT id FROM "interview_groups" ORDER BY "createdAt" ASC',
    { type: QueryTypes.SELECT },
  )) as GroupRow[];

  let defaultGroupId = existingGroups[0]?.id;
  if (!defaultGroupId) {
    defaultGroupId = uuidv4();
    await sequelize.getQueryInterface().bulkInsert("interview_groups", [
      {
        id: defaultGroupId,
        schedulingLink: null,
        status: "Availability Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }

  // 7) Seed interview_delegations for interviewed records + users.
  const interviewedRecords = (await sequelize.query(
    'SELECT id, "applicantRecordId" FROM "interviewed_applicant_records" ORDER BY "createdAt" ASC LIMIT 3',
    { type: QueryTypes.SELECT },
  )) as InterviewedRow[];

  const existingDelegations = (await sequelize.query(
    'SELECT "interviewedApplicantRecordId", "interviewerId" FROM "interview_delegations"',
    { type: QueryTypes.SELECT },
  )) as DelegationKeyRow[];

  const existingDelegationKeys = new Set(
    existingDelegations.map(
      (row) => `${row.interviewedApplicantRecordId}:${row.interviewerId}`,
    ),
  );

  const delegationRowsToInsert: Array<Record<string, unknown>> = [];
  for (const record of interviewedRecords) {
    for (const user of users.slice(0, 2)) {
      const key = `${record.id}:${user.id}`;
      if (existingDelegationKeys.has(key)) {
        continue;
      }

      delegationRowsToInsert.push({
        interviewedApplicantRecordId: record.id,
        interviewerId: user.id,
        groupId: defaultGroupId,
        interviewHasConflict: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      existingDelegationKeys.add(key);
    }
  }

  if (delegationRowsToInsert.length) {
    await sequelize
      .getQueryInterface()
      .bulkInsert("interview_delegations", delegationRowsToInsert);
  }
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.query(
    `DELETE FROM "interview_delegations" d
     WHERE d."groupId" IN (
       SELECT g.id FROM "interview_groups" g
       WHERE g."schedulingLink" IS NULL
         AND g.status = 'Availability Pending'
     )`,
  );

  await sequelize.query(
    `DELETE FROM "interviewed_applicant_records" i
     WHERE i.status = 'Need Review'
       AND i."score" IS NULL
       AND i."interviewJson" IS NULL
       AND i."interviewNotesId" IS NULL
       AND i."interviewDate" IS NULL`,
  );

  await sequelize.query(
    `DELETE FROM "interview_groups"
     WHERE "schedulingLink" IS NULL
       AND status = 'Availability Pending'`,
  );

  await sequelize.query(
    `DELETE FROM "admin_comments"
     WHERE comment = 'Seed admin comment for local development'`,
  );

  await sequelize.query(
    `DELETE FROM "firebase_files"
     WHERE "storagePath" = 'seed/interview-notes/seed-note-1.txt'`,
  );

  await sequelize.query(
    `DELETE FROM "reviewed_applicant_records"
     WHERE review = '{}'::jsonb
       AND status = 'Todo'
       AND "reviewerHasConflict" = false`,
  );

  await sequelize.query(
    `DELETE FROM "entities"
     WHERE string_field IN ('seed-entity-1', 'seed-entity-2')`,
  );
};
