import fs from "fs";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import * as admin from "firebase-admin";
import { ApolloServer } from "apollo-server-express";
import { sequelize } from "./models";
import schema from "./graphql";
import Application from "./models/application.model";
import memberData from "./graphql/sampleData/members.json";
import firebaseAuthUsers from "./graphql/sampleData/users.json";
import { ApplicantRole } from "./types";
import IMatchingService from "./services/interfaces/matchingService";
import MatchingService from "./services/implementations/matchingService";

const matchingService: IMatchingService = new MatchingService();

const CORS_ALLOW_LIST = [
  "http://localhost:3000",
  "https://uw-blueprint-starter-code.firebaseapp.com",
  "https://uw-blueprint-starter-code.web.app",
  /^https:\/\/uw-blueprint-starter-code--pr.*\.web\.app$/,
];

const CORS_OPTIONS: cors.CorsOptions = {
  origin: CORS_ALLOW_LIST,
  credentials: true,
};

const app = express();
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res }),
  playground: {
    settings: {
      "request.credentials": "include",
    },
  },
});

server.applyMiddleware({
  app,
  path: "/graphql",
  cors: { origin: CORS_ALLOW_LIST, credentials: true },
});

sequelize.authenticate();

// const serviceAccountData: Record<string, unknown> = serviceAccount;
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccountData),
//   databaseURL: "https://uw-blueprint.firebaseio.com",
// });

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
const db = admin.database();
const ref = db.ref("studentApplications");

app.get("/diff", async (req, res) => {
  const currentTerm = memberData.term;
  const currentTermMembers: string[] = [];

  memberData.members.forEach((member) => {
    if (member.term === currentTerm) {
      currentTermMembers.push(member.name);
    }
  });

  const firebaseUsers: Record<string, string | undefined> = {};
  firebaseAuthUsers.forEach((user) => {
    firebaseUsers[user.uid] = user.displayName;
  });

  // see if all currentTermMembers have their name in firebase_users
  const missingMembersFromFirebaseAuth: string[] = [];

  currentTermMembers.forEach((member) => {
    if (!Object.values(firebaseUsers).includes(member)) {
      missingMembersFromFirebaseAuth.push(member);
    }
  });

  res.status(200).json({
    currentTerm,
    currentTermMembers,
    firebaseUsers,
    missingMembersFromFirebaseAuth,
  });
});

app.get("/authUsers", async (req, res) => {
  try {
    admin
      .auth()
      .listUsers()
      .then((data) => {
        res.status(200).json(data.users);
      });
  } catch (error) {
    res
      .status(500)
      .send("An error occurred while retrieving the applications.");
  }
});

app.get("/addMemberUids", async (req, res) => {
  const { term, teams } = memberData;
  const updatedData = await matchingService.linkMemberUids(term);
  const updatedMembers = {
    term: term,
    teams: teams,
    members: updatedData.updatedMembers,
  };
  const duplicateUsers = updatedData.duplicateUsers;

  fs.writeFileSync('./graphql/sampleData/members.json', JSON.stringify(updatedMembers));
  res.status(200).json({
    message: "Successfully added uids for current blueprint members, and resolved duplicates.",
    data: duplicateUsers
  });
});

app.get("/match", async (req, res) => {
  const roles = Object.values(ApplicantRole);
  const memberRoleBreakdown = await Promise.all(roles.map(async (role) => {
    const applications = await matchingService.matchApplicationsForRole(role);
    return applications
  }));
  
  res.status(200).json({
    memberRoleBreakdown,
  });
});

app.get("/termApplications", async (req, res) => {
  ref
    .orderByChild("term")
    .equalTo("Fall 2023") // Fetch all applications for <term> (e.g. Fall 2023)
    // eslint-disable-next-line func-names
    .once("value", function (snapshot) {
      const applications: Application[] = [];
      snapshot.forEach((childSnapshot) => {
        applications.push(childSnapshot.val());
      });
      res.status(200).json(applications);
    });
});

app.get("/applications", async (req, res) => {
  try {
    const snapshot = await ref.once("value");
    const applications: Application[] = [];
    snapshot.forEach((childSnapshot) => {
      applications.push(childSnapshot.val());
    });
    res.status(200).json(applications);
  } catch (error) {
    res
      .status(500)
      .send("An error occurred while retrieving the applications.");
  }
});

app.get("/applications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await ref.child(id).once("value");
    const application = snapshot.val();
    if (application) {
      res.status(200).json(application);
    } else {
      res.status(404).send("Student application not found.");
    }
  } catch (error) {
    res
      .status(500)
      .send("An error occurred while retrieving the student application.");
  }
});

app.listen({ port: process.env.PORT || 5000 }, () => {
  // eslint-disable-next-line no-console
  console.info(`Server is listening on port ${process.env.PORT || 5000}!`);
});
