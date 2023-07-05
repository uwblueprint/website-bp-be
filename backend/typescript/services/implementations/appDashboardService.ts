import {
  ApplicationDashboardDTO,
  ApplicationDTO,
  ApplicationDashboardRowDTO,
  UserDTO,
} from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import ApplicationDashboardTable from "../../models/applicationDashboard.model";
import IAppDashboardService from "../interfaces/appDashboardService";
import Application from "../../models/application.model";
import UserService from "./userService";
import IUserService from "../interfaces/userService";
import User from "../../models/user.model";

const userService: IUserService = new UserService();
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
      reviewerComments: dashboard.reviewerComments,
      recommendedSecondChoice: dashboard.recommendedSecondChoice,
      reviewerId: dashboard.reviewerId,
      applicationId: dashboard.applicationId,
      reviewComplete: dashboard.reviewComplete,
    };
  }

  async getApplicationsByRole(role: string): Promise<Array<ApplicationDTO>> {
    let applications: Array<Application> | null;
    let applicationsByRole: Array<Application> | null;
    let applicationsByRoleDTO: Array<ApplicationDTO> = [];
    try {
      applications = await Application.findAll();
      applicationsByRole = await applications.filter((application) => {
        return application.positions[0].toLowerCase() === role.toLowerCase();
      });
      applicationsByRoleDTO = await applicationsByRole.map((application) => {
        return {
          id: application.id,
          academicYear: application.academicYear,
          binaryQuestion1: application.binaryQuestion1,
          binaryQuestion2: application.binaryQuestion2,
          binaryQuestions: application.binaryQuestions,
          dropdownQuestion1: application.dropdownQuestion1,
          dropdownQuestions: application.dropdownQuestions,
          email: application.email,
          firstName: application.firstName,
          lastName: application.lastName,
          positions: application.positions,
          program: application.program,
          question1: application.question1,
          question2: application.question2,
          question3: application.question3,
          question4: application.question4,
          question5: application.question5,
          questions: application.questions,
          resume: application.resume,
          resumeInput: application.resumeInput,
          resumeUrl: application.resumeUrl,
          roleQuestion1: application.roleQuestion1,
          roleQuestion2: application.roleQuestion2,
          roleQuestion3: application.roleQuestion3,
          roleQuestion4: application.roleQuestion4,
          roleQuestion5: application.roleQuestion5,
          roleQuestion6: application.roleQuestion6,
          roleQuestion7: application.roleQuestion7,
          roleQuestion8: application.roleQuestion8,
          roleQuestion9: application.roleQuestion9,
          roleSpecificQuestions: application.roleSpecificQuestions,
          status: application.status,
          timestamp: application.timestamp,
        };
      });
    } catch (error: unknown) {
      Logger.error(
        `Failed to get applications by this role = ${role}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
    return applicationsByRoleDTO;
  }

  async getDashboardsByApplicationId(
    applicationId: number,
  ): Promise<ApplicationDashboardDTO[]> {
    let dashboards: ApplicationDashboardTable[] = [];
    let applicationDashboardDTOs: Array<ApplicationDashboardDTO> = [];
    try {
      dashboards = await ApplicationDashboardTable.findAll({
        where: { applicationId },
      });
      applicationDashboardDTOs = await dashboards.map((dashboard) => {
        return {
          id: dashboard.id,
          reviewerEmail: dashboard.reviewerEmail,
          passionFSG: dashboard.passionFSG,
          teamPlayer: dashboard.teamPlayer,
          desireToLearn: dashboard.desireToLearn,
          skill: dashboard.skill,
          skillCategory: dashboard.skillCategory,
          reviewerComments: dashboard.reviewerComments,
          recommendedSecondChoice: dashboard.recommendedSecondChoice,
          reviewerId: dashboard.reviewerId,
          applicationId: dashboard.applicationId,
          reviewComplete: dashboard.reviewComplete,
        };
      });
    } catch (error: unknown) {
      Logger.error(
        `Failed to get dashboards by this applicationId = ${applicationId}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
    return applicationDashboardDTOs;
  }

  async getApplicationDashboardTable(
    role: string,
  ): Promise<ApplicationDashboardRowDTO[]> {
    // get all the applications for the role
    const applications: Array<ApplicationDTO> = await this.getApplicationsByRole(
      role,
    );
    // get the dashboards associated with the applications
    const appDashRows: Array<ApplicationDashboardRowDTO> = await Promise.all(
      applications.map(async (application) => {
        const reviewDashboards: Array<ApplicationDashboardDTO> = await this.getDashboardsByApplicationId(
          application.id,
        );
        const reviewers: Array<UserDTO> = await Promise.all(
          reviewDashboards.map(async (dash) => {
            return userService.getUserByEmail(dash.reviewerEmail);
          }),
        );
        return {
          application,
          reviewDashboards,
          reviewers,
        };
      }),
    );
    return appDashRows;
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
      dashboard.passionFSG =
        ratingToBeChanged === ratings[0] ? newValue : dashboard.passionFSG;
      dashboard.teamPlayer =
        ratingToBeChanged === ratings[1] ? newValue : dashboard.teamPlayer;
      dashboard.desireToLearn =
        ratingToBeChanged === ratings[2] ? newValue : dashboard.desireToLearn;
      dashboard.skill =
        ratingToBeChanged === ratings[3] ? newValue : dashboard.skill;
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
      reviewerComments: dashboard.reviewerComments,
      recommendedSecondChoice: dashboard.recommendedSecondChoice,
      reviewerId: dashboard.reviewerId,
      applicationId: dashboard.applicationId,
      reviewComplete: dashboard.reviewComplete,
    };
  }

  async createApplicationDashboard(
    reviewerEmail: string,
    applicationId: number,
    reviewerAuthId: string,
    passionFSG: number,
    teamPlayer: number,
    desireToLearn: number,
    skill: number,
    skillCategory: string,
    reviewerComments: string,
    recommendedSecondChoice: string,
    reviewComplete: boolean
  ): Promise<ApplicationDashboardDTO> {
    try {
      const reviewerId = await userService.getUserIdByAuthId(reviewerAuthId);
      await ApplicationDashboardTable.sync();
      Logger.error(`the creation:`);
      const dashboard = await ApplicationDashboardTable.create({
        reviewerEmail,
        applicationId,
        reviewerId,
        passionFSG,
        teamPlayer,
        desireToLearn,
        skill,
        skillCategory,
        reviewerComments,
        recommendedSecondChoice,
        reviewComplete
      });
      Logger.error(`the data: ${JSON.stringify(dashboard)}`);
      return {
        id: dashboard.id,
        reviewerEmail: dashboard.reviewerEmail,
        passionFSG: dashboard.passionFSG,
        teamPlayer: dashboard.teamPlayer,
        desireToLearn: dashboard.desireToLearn,
        skill: dashboard.skill,
        skillCategory: dashboard.skillCategory,
        reviewerComments: dashboard.reviewerComments,
        recommendedSecondChoice: dashboard.recommendedSecondChoice,
        reviewerId: dashboard.reviewerId,
        applicationId: dashboard.applicationId,
        reviewComplete: dashboard.reviewComplete,
      };
    } catch (error: unknown) {
      Logger.error(
        `Failed to create application dashboard. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
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
      reviewerComments: dashboard.reviewerComments,
      recommendedSecondChoice: dashboard.recommendedSecondChoice,
      reviewerId: dashboard.reviewerId,
      applicationId: dashboard.applicationId,
      reviewComplete: dashboard.reviewComplete,
    };
  }

  async mutateFinalComments(
    id: number,
    newComments: string,
    newSkillCategory: string,
    newRecommendedSecondChoice: string,
  ): Promise<ApplicationDashboardDTO> {
    const dashboard = await grabDashboard(id);
    try {
      dashboard.reviewerComments = newComments;
      dashboard.skillCategory = newSkillCategory;
      dashboard.recommendedSecondChoice = newRecommendedSecondChoice;
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
      reviewerComments: dashboard.reviewerComments,
      recommendedSecondChoice: dashboard.recommendedSecondChoice,
      reviewerId: dashboard.reviewerId,
      applicationId: dashboard.applicationId,
      reviewComplete: dashboard.reviewComplete,
    };
  }

  async updateBulkApplications(
    applicationData: Array<Partial<ApplicationDashboardDTO>>,
  ): Promise<Array<number>> {
    const res: number[] = [];
    await Promise.all(
      applicationData.map((update) => {
        const { id, ...values } = update;
        if (id !== undefined && id) {
          res.push(id);
        }

        return ApplicationDashboardTable.update(values, {
          where: { id },
          returning: true,
        }).catch((err: Error) => {
          Logger.error(
            `Error in application dashboard batch update: ${err.toString()}`,
          );
          throw err;
        });
      }),
    ).catch((err) => {
      Logger.error("Failed application dashboard batch update");
      throw err;
    });
    return res;
  }

  async getDashboardsByApplicationAuthId(
    authId: string,
  ): Promise<ApplicationDashboardDTO[]> {
    const reviewerId = await userService.getUserIdByAuthId(authId)
    const dashboards = await ApplicationDashboardTable.findAll({
      where: {
        reviewerId,
      },
    });

    return dashboards.map((dashboard) => {
      return {
        id: dashboard.id,
        reviewerEmail: dashboard.reviewerEmail,
        passionFSG: dashboard.passionFSG,
        teamPlayer: dashboard.teamPlayer,
        desireToLearn: dashboard.desireToLearn,
        skill: dashboard.skill,
        skillCategory: dashboard.skillCategory,
        reviewerComments: dashboard.reviewerComments,
        recommendedSecondChoice: dashboard.recommendedSecondChoice,
        reviewerId: dashboard.reviewerId,
        applicationId: dashboard.applicationId,
        reviewComplete: dashboard.reviewComplete,
      };
    });
  }
}

export default AppDashboardService;
