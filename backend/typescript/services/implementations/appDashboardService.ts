import { app } from "firebase-admin";
import { ApplicationDashboardDTO, ApplicationDTO } from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import ApplicationDashboardTable from "../../models/applicationDashboard.model";
import IAppDashboardService from "../interfaces/appDashboardService";
import Application from "../../models/application.model";

const Logger = logger(__filename);
const ratings = ["passionFSG", "teamPlayer", "desireToLearn", "skill"];
enum ApplicantRole {
  pres = "president", // community tab
  vpe = "vp engineering", // eng tab
  vpd = "vp design", // design tab
  vpp = "vp product", // prod tab
  vpt = "vp talent", // community tab
  vp_ext = "vp external", // community tab
  vp_int = "vp internal", // community tab
  vp_comms = "vp communications", // community tab
  vp_scoping = "vp scoping", // community tab
  vp_finance = "vp finance", // community tab
  pm = "project manager", // prod tab
  pl = "project lead", // eng tab
  design_mentor = "design mentor", // design tab
  graphic_design = "graphic designer", // design tab
  product_design = "product designer", // design tab
  uxr = "user exp. researcher", // design tab
  dev = "project developer", // eng tab
}

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

  async getDashboardsByApplicationId(applicationId: number): Promise<ApplicationDashboardDTO[]> {
    let dashboards: ApplicationDashboardTable[] = [];
    let applicationDashboardDTOs: Array<ApplicationDashboardDTO> = [];
    try {
      dashboards = await ApplicationDashboardTable.findAll({where: {applicationId: applicationId}})
      applicationDashboardDTOs = await dashboards.map((dashboard) => {
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
      })
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
