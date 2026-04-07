import { RegisterResolver } from "./user/register.resolver";
import { LoginResolver } from "./user/login.resolver";
import { MeResolver } from "./user/me.resolver";

export const resolvers = [RegisterResolver, LoginResolver, MeResolver] as const;
