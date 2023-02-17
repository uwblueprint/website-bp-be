import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import * as admin from "firebase-admin"
import { ApolloServer } from "apollo-server-express";
import { sequelize } from "./models";
import schema from "./graphql";

// insert PATH to where this file is located at for you
var serviceAccount = require("./serviceAccount.json");

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

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://uw-blueprint.firebaseio.com"
});

const db = admin.database();
const ref = db.ref("nonProfitApplications");

app.get("/applications", async (req, res) => {
  try {
    const snapshot = await ref.once("value");
    const applications: any[] = [];
    snapshot.forEach((childSnapshot) => {
      applications.push(childSnapshot.val());
    });
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving the applications.");
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
      res.status(404).send("Application not found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving the application.");
  }
});

app.listen({ port: process.env.PORT || 5000 }, () => {
  console.info(`Server is listening on port ${process.env.PORT || 5000}!`);
});
