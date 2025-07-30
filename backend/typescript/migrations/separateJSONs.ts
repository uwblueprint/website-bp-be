// sharedApplicants.ts
import { v4 as uuidv4 } from "uuid";
import allApplications from "./applicationlist.json";

const convertTimesApplied: { [key: string]: number } = {
  "This is my first time!": 0,
  Once: 1,
  Twice: 2,
  "3 or more": 3,
};

const MAX_SHORT_ANSWER_LENGTH = 255;

// Generate deterministic UUIDs based on application data
function generateDeterministicId(app: any, index: number): string {
  const seed = `${app.email}-${app.firstName}-${app.lastName}-${app.timestamp}-${index}`;
  // Use a simple hash function to generate a consistent UUID-like string
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash * 31 + char) % 2147483647; // Use modulo to keep it in 32-bit range
  }

  // Convert hash to a UUID-like format
  const hashStr = Math.abs(hash).toString(16).padStart(8, "0");
  return `${hashStr}-${index.toString().padStart(4, "0")}-4000-8000-${index
    .toString()
    .padStart(12, "0")}`;
}

export default allApplications.map((app, index) => ({
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
