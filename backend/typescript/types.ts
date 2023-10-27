export type Role = "User" | "Admin";

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export type UserDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
};

export type ApplicationDashboardDTO = {
  id: number;
  reviewerEmail: string;
  passionFSG: number;
  teamPlayer: number;
  desireToLearn: number;
  skill: number;
  skillCategory: string;
  reviewerComments: string;
  recommendedSecondChoice: string;
  reviewerId: number;
  applicationId: number;
};

export type ApplicationDashboardInput = Omit<
  ApplicationDashboardDTO,
  "applicationId"
>;

export type ApplicationDTO = {
  id: number;
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
  shortAnswerQuestions: string[]
  status: string;
  secondChoiceStatus: string;
  term: string;
  timesApplied: string;
  timestamp: bigint;
};

export type ApplicationDashboardRowDTO = {
  application: ApplicationDTO;
  reviewDashboards: ApplicationDashboardDTO[];
  reviewers: UserDTO[];
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
