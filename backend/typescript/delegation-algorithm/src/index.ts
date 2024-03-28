import Sequelize from "sequelize"

import Application from "../../models/application.model";
import ApplicationDashboardModel from "../../models/applicationDashboard.model";
import User from "../../models/user.model";
import { sequelize } from "../../models";

import { roundRobinPairs, assignApplicationsToPairs } from "./roundRobinPairs";


const roles = ["Developer", "Designer"];

async function runDelegationAlgorithms() {
  await Promise.all(roles.map(async function (role) {
    await delegationAlgorithm(role);
  }))
}

async function delegationAlgorithm(role: string) {
  sequelize.authenticate();

  const applications = await loadApplications(role);
  const reviewers = await loadReviewers(role);

  const uniquePairs = roundRobinPairs(reviewers);
  const totalPairs = assignApplicationsToPairs(uniquePairs, applications);

  await Promise.all(
    applications.map(async function (application, i) {
      return Promise.all(
        totalPairs[i].map(async function (reviewer) {
          await ApplicationDashboardModel.create({
            applicationId: application.id,
            reviewerId: reviewer.id,
            reviewerEmail: reviewer.email,
            passionFSG: 0,
            teamPlayer: 0,
            desireToLearn: 0,
            skill: 0,
            skillCategory: "junior",
            reviewerComments: "",
            recommendedSecondChoice: "N/A"
          });
        })
      );
    })
  );
}

async function loadReviewers(role: string): Promise<User[]> {
  return await User.findAll({
    attributes: ["id", "email"],
    where: { role: role }
  });
}

async function loadApplications(role: string): Promise<Application[]> {
  return await Application.findAll({
    attributes: ["id"],
    where: { firstChoiceRole: { [Sequelize.Op.like]: `%${role}%` } }
  });
}

runDelegationAlgorithms()
