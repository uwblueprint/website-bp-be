import { sequelize } from "../../models";

import Application from '../../models/application.model';
import ApplicationDashboardModel from '../../models/applicationDashboard.model';
import User from '../../models/user.model';

import { roundRobinPairs, assignApplicationsToPairs } from './roundRobinPairs';


async function delegationAlgorithm() {
  sequelize.authenticate();

  const applications = await loadApplications();
  const reviewers = await loadReviewers();

  const uniquePairs = roundRobinPairs(reviewers);
  const totalPairs = assignApplicationsToPairs(uniquePairs, applications);

  await Promise.all(applications.map(async function (application, i) {
    return Promise.all(totalPairs[i].map(async function (reviewer) {
      await ApplicationDashboardModel.create({
        applicationId: application.id,
        reviewerId: reviewer.id,
        reviewerEmail: reviewer.email,
        passionFSG: 0,
        teamPlayer: 0,
        desireToLearn: 0,
        skill: 0,
        skillCategory: 'junior',
        reviewerComments: '',
        recommendedSecondChoice: 'N/A'
      });
    }))
  }))
}

async function loadReviewers(): Promise<User[]> {
  return await User.findAll({
    attributes: ['id', 'email'],
  });
}

async function loadApplications(): Promise<Application[]> {
  return await Application.findAll({
    attributes: ['id']
  });
}

delegationAlgorithm();
