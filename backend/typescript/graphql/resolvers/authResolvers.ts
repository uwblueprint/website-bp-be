// import { CookieOptions } from "express";
import * as firebaseAdmin from "firebase-admin";
import nodemailerConfig from "../../nodemailer.config";
import AuthService from "../../services/implementations/authService";
import EmailService from "../../services/implementations/emailService";
import UserService from "../../services/implementations/userService";
import IAuthService from "../../services/interfaces/authService";
import IEmailService from "../../services/interfaces/emailService";
import FirebaseRestClient from "../../utilities/firebaseRestClient";
import IUserService from "../../services/interfaces/userService";
import User from "../../models/user.model";
import { AuthDTO, RegisterUserDTO, Role } from "../../types";
import IReviewService from "../../services/interfaces/reviewService";
import ReviewService from "../../services/implementations/reviewService";

const userService: IUserService = new UserService();
const emailService: IEmailService = new EmailService(
  nodemailerConfig,
  "UW Blueprint Internal Tools Team",
);
const authService: IAuthService = new AuthService(userService, emailService);
const reviewService: IReviewService = new ReviewService();

// const cookieOptions: CookieOptions = {
//   httpOnly: true,
//   sameSite: process.env.PREVIEW_DEPLOY ? "none" : "strict",
//   secure: process.env.NODE_ENV === "production",
// };

// Object to pass back when frontend queries a login request
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LoginOK {
  canLogin: boolean;

  constructor(doesUserExist: boolean) {
    this.canLogin = doesUserExist;
  }
}

const splitName = (
  displayName: string,
): { firstName: string; lastName: string } => {
  const splitted = displayName.split(" ", 2);
  return { firstName: splitted[0], lastName: splitted[1] };
};

const authResolvers = {
  Query: {
    isAuthorizedByRole: async (
      _parent: undefined,
      { accessToken, roles }: { accessToken: string; roles: Role[] },
    ): Promise<boolean> => {
      const isAuthorized = await authService.isAuthorizedByRole(
        accessToken,
        new Set(roles),
      );
      return isAuthorized;
    },
  },
  Mutation: {
    login: async (
      _parent: undefined,
      { email, password }: { email: string; password: string },
    ): Promise<Omit<AuthDTO, "refreshToken">> => {
      try {
        // Trying to log in with the given user and email
        const authDTO = await authService.generateToken(email, password);
        const { refreshToken, ...rest } = authDTO;
        return rest;
      } catch {
        // If an error is thrown during generateToken we know that the user failed to login
        // checking if this user can sign in to firebase with the given credentials, if not an error will be thrown
        await FirebaseRestClient.signInWithPassword(email, password);
        const firebaseUser = await firebaseAdmin.auth().getUserByEmail(email);
        const { firstName, lastName } = firebaseUser.displayName
          ? splitName(firebaseUser.displayName)
          : { firstName: "", lastName: "" };
        // Creating the user in our postgres
        await User.create({
          first_name: firstName,
          last_name: lastName,
          auth_id: firebaseUser.uid,
          role: "User", // hard coding as user for now
        });
        // now generating a token
        const authDTO = await authService.generateToken(email, password);
        const { refreshToken, ...rest } = authDTO;
        return rest;
      }
    },
    loginWithGoogle: async (
      _parent: undefined,
      { idToken }: { idToken: string },
    ): // { res }: { res: Response },
    Promise<AuthDTO> => {
      const authDTO = await authService.generateTokenOAuth(idToken);
      return authDTO;
    },
    registerFirebaseUser: async (
      _parent: undefined,
      {
        user,
        authId,
        role,
      }: { user: RegisterUserDTO; authId: string; role: Role },
    ): Promise<boolean> => {
      // If User is already in postgres, don't create a new entry
      User.findOne({ where: { auth_id: authId } }).then(async (found) => {
        if (found) {
          User.update({ ...user, role }, { where: { auth_id: authId } });
        } else {
          await userService.createUser({ ...user, role }, authId, "GOOGLE");
        }
        await authService.sendEmailVerificationLink(user.email);
      });
      return true;
    },
    refresh: async (
      _parent: undefined,
      { refreshToken }: { refreshToken: string },
    ): Promise<string> => {
      const token = await authService.renewToken(refreshToken);
      return token.accessToken;
    },
    logout: async (
      _parent: undefined,
      { userId }: { userId: string },
    ): Promise<void> => {
      await authService.revokeTokens(userId);
    },
    resetPassword: async (
      _parent: undefined,
      { email }: { email: string },
    ): Promise<boolean> => {
      await authService.resetPassword(email);
      return true;
    },
    sendSignInLink: async (
      _parent: undefined,
      { email }: { email: string },
    ): Promise<boolean> => {
      await authService.sendSignInLink(email).catch((err) => {
        throw err;
      });
      return true;
    },
  },
};

export default authResolvers;
