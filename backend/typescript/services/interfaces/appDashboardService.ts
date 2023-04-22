import ApplicationDashboardTable from "../../models/applicationDashboard.model";
import { ApplicationDashboardDTO, ApplicationDTO } from "../../types";

interface IAppDashboardService {
  /**
   * Get user associated with id
   * @param id user's id
   * @returns a UserDTO with user's information
   * @throws Error if user retrieval fails
   */
  getDashboardById(id: number): Promise<ApplicationDashboardDTO>;
  getApplicationsByRole(role: string): Promise<ApplicationDTO[]>;
  getDashboardsByApplicationId(applicationId: number): Promise<ApplicationDashboardDTO[]>;
  mutateRating(
    id: number,
    ratingToBeChanged: string,
    newValue: number,
  ): Promise<ApplicationDashboardDTO>;
  mutateSkillCategory(
    id: number,
    newValue: string,
  ): Promise<ApplicationDashboardDTO>;
}

export default IAppDashboardService;
