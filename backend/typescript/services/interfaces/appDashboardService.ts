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
   * @Param reviewerEmail the email of the reviewer
   * @param applicationId the id of the application (seperate from the postgres id field of the application)
   * @param reviewerAuthId the Firebase auth id of the user (This is NOT the same as the postgress id field of the user)
   * @param passionFSG passion for social good rating of applicant
   * @param teamPlayer teamwork rating of applicant
   * @param desireToLearn:desire to learn rating of applicant
   * @param skill skill rating of applicant
   * @param skillCategory whether applicant is viewed as junior, intermediate, or senior
   * @param reviewerComments comments of the application from reviewer
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
    skillCategory: string,
    reviewerComments: string,
    recommendedSecondChoice: string,
    reviewComplete: boolean
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

    /**
   * Bulk updates applications in reviewer dashboard. Identifies the application by application Id and the review firebase auth id
   * @param application object with fields that should be updated in the application
   * @param authid firebase auth id
   * @param applicationId the id of the application
   * @returns an array of the updated dashboard entry ids
   * @throws Error if batch update failed
   */
    updateApplicationByAuthIdAndApplicationId(
      applicationId: number, 
      authId: string, 
      application: Partial<ApplicationDashboardDTO>
    ): Promise<ApplicationDashboardDTO>;
    
    mutateFinalComments(
      id: number,
      newComments: string,
      newSkillCategory: string,
      newRecommendedSecondChoice: string,
    ): Promise<ApplicationDashboardDTO>;
}

export default IAppDashboardService;
