import User from "../../models/user.model";
import IReviewService from "../interfaces/reviewService";
import ApplicationDashboardTable from "../../models/applicationDashboard.model";

class ReviewService implements IReviewService {
  /* eslint-disable class-methods-use-this */
  async isAuthorizedToReview(
    applicationId: number,
    userId: string,
  ): Promise<boolean> {
    const users: Array<User> | null = await User.findAll({
      where: {
        auth_id: userId,
      },
    });
    if (users && users.length === 1) {
      const user = users[0];
      const application: ApplicationDashboardTable | null =
        await ApplicationDashboardTable.findOne({
          where: {
            reviewerId: user.id,
            applicationId,
          },
        });
      if (application) return true;
      return false;
    }
    throw Error("Multiple or no user(s) found with same firebase userId");
  }
}

export default ReviewService;
