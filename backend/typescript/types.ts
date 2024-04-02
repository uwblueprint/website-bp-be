export type Permission = "VP Talent" | "Eteam" | "Engineering" | "Product" | "Design" | "Reviewers";

export type Role = "Co-President" | "Director Lead" | "Internal Director" | "External Director" |
  "VP Engineering" | "VP Design" | "VP Product" | "VP Project Scoping" | "VP Finance & Operations" | "VP Talent" |
  "Graphic Designer" | "Marketing & Outreach Director" | "Product Manager" | "Project Lead" | "Project Developer" | "Product Designer";

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
  shortAnswerQuestions: string[];
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

export enum ApplicantRole {
  pres = "president", // community tab
  int_dir = "internal director",
  ext_dir = "external director",
  vpe = "vp engineering", // eng tab
  vpd = "vp design", // design tab
  vpp = "vp product", // prod tab
  vpt = "vp talent", // community tab
  vp_ext = "vp external", // community tab
  vp_int = "vp internal", // community tab
  vp_comms = "vp communications", // community tab
  vp_scoping = "vp scoping", // community tab
  vp_finance = "vp finance & operations", // community tab
  pm = "project manager", // prod tab
  pl = "project lead", // eng tab
  design_mentor = "design mentor", // design tab
  graphic_design = "graphic designer", // design tab
  product_design = "product designer", // design tab
  uxr = "user researcher", // design tab
  dev = "project developer", // eng tab
}
