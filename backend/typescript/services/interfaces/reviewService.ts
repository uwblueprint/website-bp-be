interface IReviewService {
  /**
   * Determine if the reviewerUserId has been assigned to the application with id applicationId
   * with the specified email address
   * @param applicationId the id of the application the reviewer is trying to review
   * @param reviewerUserId the firebase user id of the revieweer
   * @returns true if user is authorized to review the application and authorized, false otherwise
   */
  isAuthorizedToReview(applicationId: number, userId: string): Promise<boolean>;
}

export default IReviewService;
