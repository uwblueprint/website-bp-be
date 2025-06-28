import {
  ApplicationDashboardDTO,
  ApplicationDTO,
  ApplicationDashboardRowDTO,
  ApplicantRole,
} from "../../types";

interface IAppDashboardService {
  getDashboardById(id: number): Promise<ApplicationDashboardDTO>;
  getApplicationsByRole(role: ApplicantRole): Promise<ApplicationDTO[]>;
  getApplicationsBySecondChoiceRole(
    role: ApplicantRole,
  ): Promise<ApplicationDTO[]>;
  getApplicationsById(id: number): Promise<ApplicationDTO>;
  getDashboardsByApplicationId(
    applicationId: number,
  ): Promise<ApplicationDashboardDTO[]>;
  getApplicationDashboardTable(
    role: ApplicantRole,
  ): Promise<ApplicationDashboardRowDTO[]>;
  getApplicationBySecondChoiceRoleDashboardTable(
    role: ApplicantRole,
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
   * Bulk updates applications in reviewer dashboard
   * @Param reviewerEmail the email of the reviewer
   * @param applicationId the id of the application (seperate from the postgres id field of the application)
   * @param reviewerAuthId the Firebase auth id of the user (This is NOT the same as the postgress id field of the user)
   * @param passionFSG passion for social good rating of application
   * @param teamPlayer teamwork rating of application
   * @param desireToLearn willingness to learn rating of application
   * @param skill skill rating of application
   * @param totalScore sum of passionFSG, teamPlayer, desireToLearn, and skill
   * @param skillCategory whether applicant is viewed as junior, intermediate, or senior
   * @param reviewerComments comments of the application from reviewer
   * @param adminComments comments of the application from admin
   * @param recommendedSecondChoice an indication of whether 2nd choice is recommended
   * @param reviewComplete whether the reviewer has finished the review
   * @returns an array of the updated dashboard entry ids
   * @throws Error if batch update failed
   */
  createApplicationDashboard(
    reviewerEmail: string,
    applicationId: number,
    reviewerAuthId: string,
    passionFSG: number,
    teamPlayer: number,
    desireToLearn: number,
    skill: number,
    totalScore: number,
    skillCategory: string,
    reviewerComments: string,
    adminComments: string,
    recommendedSecondChoice: string,
  ): Promise<ApplicationDashboardDTO>;

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
