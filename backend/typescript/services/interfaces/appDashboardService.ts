import {
  ApplicationDashboardDTO,
  ApplicationDTO,
  ApplicationDashboardRowDTO,
} from "../../types";

interface IAppDashboardService {
  getDashboardById(id: number): Promise<ApplicationDashboardDTO>;
  getApplicationsByRole(role: string): Promise<ApplicationDTO[]>;
  getDashboardsByApplicationId(
    applicationId: number,
  ): Promise<ApplicationDashboardDTO[]>;
  getApplicationDashboardTable(
    role: string,
  ): Promise<ApplicationDashboardRowDTO[]>;
  mutateRating(
    id: number,
    ratingToBeChanged: string,
    newValue: number,
  ): Promise<ApplicationDashboardDTO>;
  mutateSkillCategory(
    id: number,
    newValue: string,
  ): Promise<ApplicationDashboardDTO>;

  /**
   * Retireves all ApplicationDashboardDTO associated with the given reviewer's firebase auth id
   * @param authId firstbase user auth id of the reviewer
   * @returns an array of the updated dashboard entry ids
   * @throws Error is multiple or no user(s) with the same authId found
   */
  getDashboardsByApplicationAuthId(
    authId: string,
  ): Promise<ApplicationDashboardDTO[]>;

  /**
   * Bulk updates applications in reviewer dashboard
   * @param applicationData
   * @returns an array of the updated dashboard entry ids
   * @throws Error if batch update failed
   */
  updateBulkApplications(
    applicationData: Array<Partial<ApplicationDashboardDTO>>,
  ): Promise<Array<number>>;
  mutateFinalComments(
    id: number,
    newComments: string,
    newSkillCategory: string,
    newRecommendedSecondChoice: string,
  ): Promise<ApplicationDashboardDTO>;
}

export default IAppDashboardService;
