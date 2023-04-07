import * as firebaseAdmin from "firebase-admin";
import IUserService from "../interfaces/userService";
import { ApplicationDashboardDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import User from "../../models/user.model";
import ApplicationDashboardTable from "../../models/applicationDashboard.model";
import IAppDashboardService from "../interfaces/appDashboardService";

const Logger = logger(__filename);
const ratings = ["passionFSG", "teamPlayer", "desireToLearn", "skill"];
const grabDashboard = async (
  id: number,
): Promise<ApplicationDashboardTable> => {
  let dashboard: ApplicationDashboardTable | null;
  try {
    dashboard = await ApplicationDashboardTable.findByPk(id);

    if (!dashboard) {
      throw new Error(`applicationdashboardId ${id} not found.`);
    }
  } catch (error: unknown) {
    Logger.error(`Failed to get dashboard. Reason = ${getErrorMessage(error)}`);
    throw error;
  }
  return dashboard;
};

class AppDashboardService implements IAppDashboardService {
  /* eslint-disable class-methods-use-this */

  async getDashboardById(id: number): Promise<ApplicationDashboardDTO> {
    const dashboard = await grabDashboard(id);

    return {
      id: dashboard.id,
      reviewerEmail: dashboard.reviewerEmail,
      passionFSG: dashboard.passionFSG,
      teamPlayer: dashboard.teamPlayer,
      desireToLearn: dashboard.desireToLearn,
      skill: dashboard.skill,
      skillCategory: dashboard.skillCategory,
      reviewerId: dashboard.reviewerId,
      applicationId: dashboard.applicationId,
    };
  }

  async mutateRating(
    id: number,
    ratingToBeChanged: string,
    newValue: number,
  ): Promise<ApplicationDashboardDTO> {
    const dashboard = await grabDashboard(id);
    try {
      if (!ratings.includes(ratingToBeChanged)) {
        throw new Error(
          `no rating with key ${ratingToBeChanged} exists in applicationdashboardtable`,
        );
      }
      // updating the ratingToBeChanged
      ratingToBeChanged === ratings[0]
        ? (dashboard.passionFSG = newValue)
        : null;
      ratingToBeChanged === ratings[1]
        ? (dashboard.teamPlayer = newValue)
        : null;
      ratingToBeChanged === ratings[2]
        ? (dashboard.desireToLearn = newValue)
        : null;
      ratingToBeChanged === ratings[3] ? (dashboard.skill = newValue) : null;
      await dashboard.save();
    } catch (error: unknown) {
      Logger.error(
        `Failed to update rating. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }

    return {
      id: dashboard.id,
      reviewerEmail: dashboard.reviewerEmail,
      passionFSG: dashboard.passionFSG,
      teamPlayer: dashboard.teamPlayer,
      desireToLearn: dashboard.desireToLearn,
      skill: dashboard.skill,
      skillCategory: dashboard.skillCategory,
      reviewerId: dashboard.reviewerId,
      applicationId: dashboard.applicationId,
    };
  }

  async mutateSkillCategory(
    id: number,
    newValue: string,
  ): Promise<ApplicationDashboardDTO> {
    const dashboard = await grabDashboard(id);
    try {
      dashboard.skillCategory = newValue;
      await dashboard.save();
    } catch (error: unknown) {
      Logger.error(
        `Failed to update rating. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }

    return {
      id: dashboard.id,
      reviewerEmail: dashboard.reviewerEmail,
      passionFSG: dashboard.passionFSG,
      teamPlayer: dashboard.teamPlayer,
      desireToLearn: dashboard.desireToLearn,
      skill: dashboard.skill,
      skillCategory: dashboard.skillCategory,
      reviewerId: dashboard.reviewerId,
      applicationId: dashboard.applicationId,
    };
  }
}

export default AppDashboardService;
