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
  reviewerId: number;
  applicationId: number;
};

export type ApplicationDTO = {
  id: number;
  academicYear: string;
  binaryQuestion1: string;
  binaryQuestion2: string;
  binaryQuestions: string[];
  dropdownQuestion1: string;
  dropdownQuestions: string[];
  email: string;
  firstName: string;
  lastName: string;
  positions: string[];
  program: string;
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  questions: string[];
  resume: string;
  resumeInput: string;
  resumeUrl: string;
  roleQuestion1: string;
  roleQuestion2: string;
  roleQuestion3: string;
  roleQuestion4: string;
  roleQuestion5: string;
  roleQuestion6: string;
  roleQuestion7: string;
  roleQuestion8: string;
  roleQuestion9: string;
  roleSpecificQuestions: string[];
  status: string;
  timestamp: bigint;
};

export type CreateUserDTO = Omit<UserDTO, "id"> & { password: string };

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
