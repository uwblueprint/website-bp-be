import AppDashboardService from "../../services/implementations/appDashboardService";
import IAppDashboardService from "../../services/interfaces/appDashboardService";
import {
  ApplicationDashboardDTO,
  ApplicationDTO,
  ApplicationDashboardInput,
} from "../../types";

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
      const applications = await dashboardService.getApplicationsByRole(
        firstChoice,
      );
      return applications;
    },
    dashboardsByApplicationId: async (
      _parent: undefined,
      { applicationId }: { applicationId: number },
    ): Promise<Array<ApplicationDashboardDTO>> => {
      const dashboards = await dashboardService.getDashboardsByApplicationId(
        applicationId,
      );
      return dashboards;
    },
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
    updateApplications: async (
      _parent: undefined,
      { applications }: { applications: Array<ApplicationDashboardInput> },
    ): Promise<Array<number>> => {
      return dashboardService.updateBulkApplications(applications);
    },
    modifyFinalComments: async (
      _parent: undefined,
      {
        id,
        newComments,
        newSkillCategory,
        newRecommendedSecondChoice,
      }: {
        id: number;
        newComments: string;
        newSkillCategory: string;
        newRecommendedSecondChoice: string;
      },
    ): Promise<ApplicationDashboardDTO> => {
      const dashboard = dashboardService.mutateFinalComments(
        id,
        newComments,
        newSkillCategory,
        newRecommendedSecondChoice,
      );
      return dashboard;
    },
  },
};

export default dashboardResolvers;
