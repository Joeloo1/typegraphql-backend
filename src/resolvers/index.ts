import { RegisterResolver } from "./user/register.resolver";
import { LoginResolver } from "./user/login.resolver";
import { MeResolver } from "./user/me.resolver";
import { VerifyUserResolver } from "./user/verifyUser.resolver";
import { ForgotPasswordResolver } from "./user/forgotPassword.resolver";
import { ResetPasswordResolver } from "./user/resetPassword.resolver";
import { LogOutResolver } from "./user/logOut.resolver";

export const resolvers = [
  RegisterResolver,
  LoginResolver,
  MeResolver,
  VerifyUserResolver,
  ForgotPasswordResolver,
  ResetPasswordResolver,
  LogOutResolver,
] as const;
