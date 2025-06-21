import Sequelize from "sequelize"

import Application from "../../models/application.model";
import ApplicationDashboardModel from "../../models/applicationDashboard.model";
import User from "../../models/user.model";
import { sequelize } from "../../models";

import { roundRobinPairs, assignApplicationsToPairs } from "./roundRobinPairs";

// Mapping of application roles to possible reviewers
const roleMapping = new Map([
  ["Project Developer", ["VP Engineering", "Project Lead", "Project Developer"]],
  ["Product Designer", ["VP Design", "VP Product", "Product Manager", "Product Designer"]],
  ["Project Lead", ["VP Engineering", "Project Lead"]],
  ["Product Manager", ["VP Product", "Product Manager"]],
  ["VP Design", ["VP Design"]],
  ["VP Product", ["VP Product"]],
  ["VP Engineering", ["VP Engineering"]]
]);


async function runDelegationAlgorithms() {
  sequelize.authenticate();

  await Promise.all([...roleMapping.keys()].map(async function (role) {
    await delegationAlgorithm(role);
  }))
}

async function delegationAlgorithm(role: string) {
  const applications = await loadApplications(role);
  const reviewers = await loadReviewers(roleMapping.get(role) as string[]);

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

async function loadApplications(role: string): Promise<Application[]> {
  return await Application.findAll({
    attributes: ["id"],
    where: { firstChoiceRole: { [Sequelize.Op.like]: `%${role}%` } }
  });
}

async function loadReviewers(roles: string[]): Promise<User[]> {
  return await User.findAll({
    attributes: ["id", "email"],
    where: { role: { [Sequelize.Op.in]: roles } }
  });
}

runDelegationAlgorithms()
