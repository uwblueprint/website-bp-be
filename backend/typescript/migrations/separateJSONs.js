import { writeFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import applist from "./applicationlist.json";

const convertTimesApplied = {
  "This is my first time!": 0,
  Once: 1,
  Twice: 2,
  "3 or more": 3,
};

const createFullList = () => {
  const seededData = applist.map((currApplication) => {
    const { id } = currApplication || uuidv4();

    return {
      id,
      academicOrCoop: currApplication.academicOrCoop,
      academicYear: currApplication.academicYear,
      email: currApplication.email,
      firstChoiceRole: currApplication.firstChoiceRole,
      secondChoiceRole: currApplication.secondChoiceRole,
      firstName: currApplication.firstName,
      lastName: currApplication.lastName,
      heardFrom: currApplication.heardFrom,
      locationPreference: currApplication.locationPreference,
      program: currApplication.program,
      pronouns: currApplication.pronouns,
      resumeUrl: currApplication.resumeUrl,
      timesApplied: convertTimesApplied[currApplication.timesApplied],
      shortAnswerQuestions: currApplication.shortAnswerQuestions
        ? currApplication.shortAnswerQuestions.map((q) => JSON.stringify(q))
        : [],
      roleSpecificQuestions: currApplication.roleSpecificQuestions
        ? currApplication.roleSpecificQuestions.map((q) => ({
            role: q.role,
            questions: q.questions
              ? q.questions.map((question) => JSON.stringify(question))
              : [],
          }))
        : [],
      term: currApplication.term,
      status: currApplication.status,
      submittedAt: new Date(currApplication.timestamp).toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  return seededData;
};

// const createApplicantRecords = (records) => {
//   const output = [];

//   records.forEach((record) => {
//     const applicantId = record.id;

//     if (record.firstChoiceRole) {
//       const roleSpecificQs =
//         record.roleSpecificQuestions
//           ?.filter((q) => q.role === record.firstChoiceRole)
//           ?.flatMap(
//             (q) =>
//               q.questions?.map((question) => JSON.stringify(question)) || [],
//           ) || [];

//       output.push({
//         id: uuidv4(),
//         applicantId,
//         position: record.firstChoiceRole, // Changed from 'role' to 'position' to match migration
//         roleSpecificQuestions: roleSpecificQs,
//         choice: 1,
//         status: record.status || "Applied",
//         skillCategory: null,
//         extraInfo: {
//           // Added extraInfo field from migration
//           notes: "",
//           interviewNotes: "",
//           interviewers: [],
//         },
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       });
//     }

//     // Add second choice record if it exists
//     if (record.secondChoiceRole) {
//       const roleSpecificQs =
//         record.roleSpecificQuestions
//           ?.filter((q) => q.role === record.secondChoiceRole)
//           ?.flatMap(
//             (q) =>
//               q.questions?.map((question) => JSON.stringify(question)) || [],
//           ) || [];

//       output.push({
//         id: uuidv4(),
//         applicantId,
//         position: record.secondChoiceRole, // Changed from 'role' to 'position'
//         roleSpecificQuestions: roleSpecificQs,
//         choice: 2,
//         status: record.secondChoiceStatus || "Applied",
//         skillCategory: null,
//         extraInfo: {
//           // Added extraInfo field
//           notes: "",
//           interviewNotes: "",
//           interviewers: [],
//         },
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       });
//     }
//   });

//   return output;
// };

const main = () => {
  //   const full_list = createFullList();
  //   const applicantRecords = createApplicantRecords(applicants); // Pass applicants to the function
  //   // Write applicants to a separate JSON file
  //   writeFileSync("./seed-applicants.json", JSON.stringify(applicants, null, 2));
  //   // Write applicant records to a separate JSON file
  //   writeFileSync(
  //     "./seed-applicant-records.json",
  //     JSON.stringify(applicantRecords, null, 2),
  //   );
  //   console.log(
  //     `Generated ${applicants.length} applicants and ${applicantRecords.length} applicant records.`,
  //   );
};

// Run the main function
main();
