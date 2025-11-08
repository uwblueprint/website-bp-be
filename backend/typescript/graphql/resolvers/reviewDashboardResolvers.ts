import ReviewDashboardService from "../../services/implementations/reviewDashboardService";
import {
  ReviewDashboardRowDTO,
  ReviewDashboardSidePanelDTO,
  ReviewedApplicantRecordDTO,
} from "../../types";
import { getErrorMessage } from "../../utilities/errorUtils";

const reviewDashboardService = new ReviewDashboardService();

const reviewDashboardResolvers = {
  Query: {
    reviewDashboard: async (
      _parent: undefined,
      args: { pageNumber: number; resultsPerPage: number },
    ): Promise<ReviewDashboardRowDTO[]> => {
      try {
        return await reviewDashboardService.getReviewDashboard(
          args.pageNumber,
          args.resultsPerPage,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
    reviewDashboardSidePanel: async (
      _parent: undefined,
      args: { applicantId: string },
    ): Promise<ReviewDashboardSidePanelDTO> => {
      try {
        return await reviewDashboardService.getReviewDashboardSidePanel(
          args.applicantId,
        );
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
  Mutation: {
    delegateReviewers: async (): Promise<ReviewedApplicantRecordDTO[]> => {
      try {
        return await reviewDashboardService.delegateReviewers();
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  },
};

export default reviewDashboardResolvers;
