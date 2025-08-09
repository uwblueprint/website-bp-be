// run `npx ts-node backend/typescript/utilities/applicationSeeding.ts` for thingy to work

import { writeFileSync } from "fs";
import { join } from "path";
import allApplications from "../migrations/applicationlist.json";

const convertTimesApplied: { [key: string]: number } = {
  "This is my first time!": 0,
  Once: 1,
  Twice: 2,
  "3 or more": 3,
};

const MAX_SHORT_ANSWER_LENGTH = 255;

const processedApplicants = allApplications.map((app, index) => ({
  id: index.toString(),
  academicOrCoop: app.academicOrCoop || "",
  academicYear: app.academicYear || "",
  email: app.email || "",
  firstName: app.firstName || "",
  lastName: app.lastName || "",
  heardFrom: app.heardFrom || "",
  locationPreference: app.locationPreference || "",
  program: app.program || "",
  pronouns: app.pronouns || "",
  resumeUrl: app.resumeUrl || "",
  timesApplied: convertTimesApplied[app.timesApplied] ?? 0,
  shortAnswerQuestions: app.shortAnswerQuestions
    ? app.shortAnswerQuestions.map((q) =>
        JSON.stringify(q).slice(0, MAX_SHORT_ANSWER_LENGTH),
      )
    : [],
  term: app.term || "",
  submittedAt: app.timestamp
    ? new Date(app.timestamp).toISOString()
    : new Date().toISOString(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const outputFilePath = join(
  __dirname,
  "../migrations/processedApplicants.json",
);
writeFileSync(outputFilePath, JSON.stringify(processedApplicants, null, 2));

export default processedApplicants;
