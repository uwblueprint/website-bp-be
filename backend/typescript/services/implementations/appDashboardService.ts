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
    };
  }

  async getApplicationsByRole(role: string): Promise<Array<ApplicationDTO>> {
    let applications: Array<Application> | null;
    let applicationsByRole: Array<Application> | null;
    let applicationsByRoleDTO: Array<ApplicationDTO> = [];
    try {
      applications = await Application.findAll();
      applicationsByRole = await applications.filter((application) => {
        return application.firstChoiceRole.toLowerCase() === role.toLowerCase();
      });
      applicationsByRoleDTO = await applicationsByRole.map((application) => {
        return {
          id: application.id,
          academicOrCoop: application.academicOrCoop,
          academicYear: application.academicYear,
          email: application.email,
          firstChoiceRole: application.firstChoiceRole,
          firstName: application.firstName,
          heardFrom: application.heardFrom,
          lastName: application.lastName,
          locationPreference: application.locationPreference,
          program: application.program,
          pronouns: application.pronouns,
          pronounsSpecified: application.pronounsSpecified,
          resumeUrl: application.resumeUrl,
          roleSpecificQuestions: application.roleSpecificQuestions,
          secondChoiceRole: application.secondChoiceRole,
          shortAnswerQuestions: application.shortAnswerQuestions,
          status: application.status,
          secondChoiceStatus: application.secondChoiceStatus,
          term: application.term,
          timesApplied: application.timesApplied,
          timestamp: application.timestamp
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

//Takes in an application id and returns an array of applicants with same id
  async getApplicationsById(id: number): Promise<ApplicationDTO> {
    let applications: Array<Application> | null;
    let applicationById: Application |undefined;
    let applicationByIdDTO: ApplicationDTO;
    try {
      applications = await Application.findAll();
      applicationById =  applications.find(application => application.id == id);

      if (applicationById === undefined) {
        // Handle the case when no application is found
        throw new Error(`Application with id ${id} not found`);
      }
  
      applicationByIdDTO = {
          id: applicationById.id,
          academicYear: applicationById.academicYear,
          binaryQuestion1: applicationById.binaryQuestion1,
          binaryQuestion2: applicationById.binaryQuestion2,
          binaryQuestions: applicationById.binaryQuestions,
          dropdownQuestion1: applicationById.dropdownQuestion1,
          dropdownQuestions: applicationById.dropdownQuestions,
          email: applicationById.email,
          firstName: applicationById.firstName,
          lastName: applicationById.lastName,
          positions: applicationById.positions,
          program: applicationById.program,
          question1: applicationById.question1,
          question2: applicationById.question2,
          question3: applicationById.question3,
          question4: applicationById.question4,
          question5: applicationById.question5,
          questions: applicationById.questions,
          resume: applicationById.resume,
          resumeInput: applicationById.resumeInput,
          resumeUrl: applicationById.resumeUrl,
          roleQuestion1: applicationById.roleQuestion1,
          roleQuestion2: applicationById.roleQuestion2,
          roleQuestion3: applicationById.roleQuestion3,
          roleQuestion4: applicationById.roleQuestion4,
          roleQuestion5: applicationById.roleQuestion5,
          roleQuestion6: applicationById.roleQuestion6,
          roleQuestion7: applicationById.roleQuestion7,
          roleQuestion8: applicationById.roleQuestion8,
          roleQuestion9: applicationById.roleQuestion9,
          roleSpecificQuestions: applicationById.roleSpecificQuestions,
          status: applicationById.status,
          timestamp: applicationById.timestamp,
        };
    } catch (error: unknown) {
      Logger.error(
        `Failed to get applications by id = ${id}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
    return applicationByIdDTO;
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

        ApplicationDashboardTable.update(values, {
          where: { id },
          returning: true,
        }).catch((err: Error) => {
          Logger.error(
            `Error in application dashboard batch update: ${err.toString()}`,
          );
          throw err;
        });
        return id;
      }),
    ).catch((err) => {
      Logger.error("Failed application dashboard batch update");
      throw err;
    });

    return res;
  }
}

export default AppDashboardService;
