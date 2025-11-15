export type Role = "User" | "Admin";

export enum StatusType {
  ACCEPTED = "accepted",
  APPLIED = "applied",
  INTERVIEWED = "interviewed",
  IN_REVIEW = "in review",
  PENDING = "pending",
  REJECTED = "rejected",
}

export enum SecondChoiceStatusType {
  CONSIDERED = "considered",
  NOT_CONSIDERED = "not considered",
  NOT_APPLICABLE = "n/a",
  RECOMMENDED = "recommended",
  IN_REVIEW = "in review",
  INTERVIEW = "interview",
  NO_INTERVIEW = "no interview",
}

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export type UserDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position?: string;
  role: Role;
};

export type ApplicationDTO = {
  id: string;
  academicOrCoop: string;
  academicYear: string;
  email: string;
  firstChoiceRole: string;
  firstName: string;
  heardFrom: string;
  lastName: string;
  locationPreference: string;
  program: string;
  pronouns: string;
  pronounsSpecified: string;
  resumeUrl: string;
  roleSpecificQuestions: string[];
  secondChoiceRole: string;
  shortAnswerQuestions: string[];
  status: string;
  secondChoiceStatus: string;
  term: string;
  timesApplied: string;
  timestamp?: bigint;
};

export type ApplicantDTO = {
  id: string;
  academicOrCoop: string;
  academicYear: string; // MAYBE CHANGE WITH ENUM
  email: string;
  firstName: string;
  lastName: string;
  heardFrom: string;
  locationPreference: string;
  program: string;
  pronouns: string;
  pronounsSpecified: string;
  resumeUrl: string;
  timesApplied: string;
  shortAnswerQuestions: string[];
  term: string;
  submittedAt: Date;
};

export type ApplicantRecordDTO = {
  id: string;
  applicantId: string;
  position: string;
  roleSpecificQuestions: string[];
  choice: number;
  status: ApplicationStatus;
  skillCategory?: SkillCategory;
  combined_score?: number | null;
  isApplicantFlagged: boolean;
};

export type ApplicationStatus =
  | "Applied"
  | "In Review"
  | "Reviewed"
  | "Interview"
  | "Interview Complete"
  | "Offer"
  | "Not Considered";

export type SkillCategory = "Junior" | "Intermediate" | "Senior";

export type ApplicantRecordExtraInfo = {
  adminReview?: string;
};

export type ReviewerDTO = {
  firstName: string;
  lastName: string;
};

export type ReviewDashboardRowDTO = {
  firstName: string;
  lastName: string;
  position: string;
  timesApplied: string;
  applicationStatus: ApplicationStatus;
  choice: number;
  reviewers: ReviewerDTO[];
  totalScore: number | null;
};

export type CreateUserDTO = Omit<UserDTO, "id" | "firstName" | "lastName">;

export type UpdateUserDTO = Omit<UserDTO, "id">;

export type RegisterUserDTO = Omit<CreateUserDTO, "role">;

export type AuthDTO = Token & UserDTO;

export type Letters = "A" | "B" | "C" | "D";

export type NodemailerConfig = {
  service: "gmail";
  auth: {
    type: "OAuth2";
    user: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
  };
};

export type SignUpMethod = "PASSWORD" | "GOOGLE";

export enum Department {
  Engineering = "Engineering",
  Design = "Design",
  Product = "Product",
  Community = "Community",
}

export const EngineeringPositionTitles = [
  "Project Lead",
  "Developer",
  "VP Engineering",
] as const;
export const DesignPositionTitles = ["Designer", "VP Design"] as const;
export const ProductPositionTitles = ["Product Manager", "VP Product"] as const;
export const CommunityPositionTitles = [
  "President",
  "VP Scoping",
  "VP Talent",
  "VP Finance",
  "Director Lead",
  "Internal Director",
  "External Director",
  "Content Strategist",
  "Graphic Designer",
] as const;

export const PositionTitles = [
  ...EngineeringPositionTitles,
  ...DesignPositionTitles,
  ...ProductPositionTitles,
  ...CommunityPositionTitles,
] as const;

// Union types
export type EngineeringPositionTitle =
  (typeof EngineeringPositionTitles)[number];
export type DesignPositionTitle = (typeof DesignPositionTitles)[number];
export type ProductPositionTitle = (typeof ProductPositionTitles)[number];
export type CommunityPositionTitle = (typeof CommunityPositionTitles)[number];
export type PositionTitle = (typeof PositionTitles)[number];

export enum ReviewStatusEnum {
  TODO = "Todo",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
  CONFLICT = "Conflict",
}

export type ReviewStatus = `${ReviewStatusEnum}`;

export type Review = {
  passionFSG?: number;
  teamPlayer?: number;
  desireToLearn?: number;
  skill?: number;
  skillCategory?: SkillCategory;
  comments?: string;
};

export type ReviewedApplicantRecordDTO = {
  applicantRecordId: string;
  reviewerId: number;
  review: Review;
  status: ReviewStatus;
  score?: number | null;
  reviewerHasConflict: boolean;
};

export type CreateReviewedApplicantRecordDTO = {
  applicantRecordId: string;
  reviewerId: number;
  review?: Review;
  reviewerHasConflict?: boolean;
};

export type DeleteReviewedApplicantRecordDTO = {
  applicantRecordId: string;
  reviewerId: number;
};

export type ReviewDetails = {
  reviewerFirstName: string;
  reviewerLastName: string;
  review: Review;
};

export type ReviewDashboardSidePanelDTO = {
  firstName: string;
  lastName: string;
  positionTitle: PositionTitle;
  program: string;
  resumeUrl: string;
  applicationStatus: ApplicationStatus;
  skillCategory: SkillCategory | null;
  reviewDetails: ReviewDetails[];
};

export type ReviewedApplicantsDTO = {
  applicantRecordId: string;
  reviewStatus: ReviewStatus;
  applicantFirstName: string;
  applicantLastName: string;
};

export type AdminCommentDTO = {
  id: string;
  userId: number;
  applicantRecordId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateAdminCommentDTO = Pick<
  AdminCommentDTO,
  "userId" | "applicantRecordId" | "comment"
>;
