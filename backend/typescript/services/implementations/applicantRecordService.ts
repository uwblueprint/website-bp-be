import * as admin from "firebase-admin";
import IApplicantRecordService from "../interfaces/IApplicantRecordService";
import Applicant from "../../models/applicant.model";
import ApplicantRecord from "../../models/applicantRecord.model";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";

const Logger = logger(__filename);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_SVC_ACCOUNT_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n",
      ),
      clientEmail: process.env.FIREBASE_SVC_ACCOUNT_CLIENT_EMAIL,
    }),
    databaseURL: "https://uw-blueprint.firebaseio.com",
  });
}

const db = admin.database();
const studentApplicationsRef = db.ref("studentApplications");

class ApplicantRecordService implements IApplicantRecordService {
  /* eslint-disable class-methods-use-this */
  async populateApplicantRecord(term: string): Promise<void> {
    try {
      const snapshot = await studentApplicationsRef
        .orderByChild("term")
        .equalTo(term)
        .once("value");

      const rawData = snapshot.val() as Record<string, any>;

      const applicantsToCreate = Object.values(rawData).map((app: any) => {
        const shortAnswers = Array.isArray(app.shortAnswerQuestions)
          ? app.shortAnswerQuestions.map((q: any) => {
              if (typeof q === "string") return q;
              return JSON.stringify(q); // fallback
            })
          : [];

        return {
          academicOrCoop: app.academicOrCoop ?? "",
          academicYear: app.academicYear ?? "",
          email: app.email ?? "",
          firstName: app.firstName ?? "",
          lastName: app.lastName ?? "",
          heardFrom: app.heardFrom ?? "",
          locationPreference: app.locationPreference ?? "",
          program: app.program ?? "",
          pronouns: app.pronouns ?? "",
          resumeUrl: app.resumeUrl ?? "",
          timesApplied:
            typeof app.timesApplied === "number" ? app.timesApplied : 0,
          shortAnswerQuestions: shortAnswers,
          term: app.term ?? term,
          submittedAt: app.submittedAt
            ? new Date(app.submittedAt)
            : new Date(app.timestamp ?? Date.now()),
        };
      });

      const createdApplicants = await Applicant.bulkCreate(applicantsToCreate, {
        validate: true,
        returning: true, // IMPORTANT
      });

      console.log(createdApplicants);
    } catch (error: unknown) {
      Logger.error(
        `Failed to get dashboard. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default ApplicantRecordService;
