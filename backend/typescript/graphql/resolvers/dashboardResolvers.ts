import { application } from "express";
import ApplicationDashboardTable from "../../models/applicationDashboard.model";
import nodemailerConfig from "../../nodemailer.config";
import AppDashboardService from "../../services/implementations/appDashboardService";
import AuthService from "../../services/implementations/authService";
import EmailService from "../../services/implementations/emailService";
import UserService from "../../services/implementations/userService";
import IAppDashboardService from "../../services/interfaces/appDashboardService";
import IAuthService from "../../services/interfaces/authService";
import IEmailService from "../../services/interfaces/emailService";
import IUserService from "../../services/interfaces/userService";
import { ApplicationDashboardDTO, ApplicationDTO } from "../../types";
import { generateCSV } from "../../utilities/CSVUtils";

const userService: IUserService = new UserService();
const emailService: IEmailService = new EmailService(nodemailerConfig);
const dashboardService: IAppDashboardService = new AppDashboardService();

const dashboardResolvers = {
  Query: {
    dashboardById: async (
      _parent: undefined,
      { id }: { id: number },
    ): Promise<ApplicationDashboardDTO> => {
      const dashboard = dashboardService.getDashboardById(id);
      return dashboard;
    },
    applicationsByRole: async (
      _parent: undefined,
      { firstChoice }: { firstChoice: string },
    ): Promise<Array<ApplicationDTO>> => {
      const applications = await dashboardService.getApplicationsByRole(firstChoice);
      return applications;
    }
  },
  Mutation: {
    changeRating: async (
      _parent: undefined,
      {
        id,
        ratingToBeChanged,
        newValue,
      }: { id: number; ratingToBeChanged: string; newValue: number },
    ): Promise<ApplicationDashboardDTO> => {
      const dashboard = dashboardService.mutateRating(
        id,
        ratingToBeChanged,
        newValue,
      );
      return dashboard;
    },
    changeSkillCategory: async (
      _parent: undefined,
      { id, newValue }: { id: number; newValue: string },
    ): Promise<ApplicationDashboardDTO> => {
      const dashboard = dashboardService.mutateSkillCategory(id, newValue);
      return dashboard;
    },
  },
};

export default dashboardResolvers;
