import { Resolver, Mutation, Arg } from "type-graphql";

import { verificationPrefix } from "./../../constants/redisPrefixes";
import { redis } from "../../config/redis";
import { User } from "../../entities/user.entity";

@Resolver()
export class VerifyUserResolver {
  @Mutation(() => Boolean)
  async verifyUser(@Arg("token") token: string): Promise<boolean> {
    const userId = await redis.get(verificationPrefix + token);

    if (!userId) {
      throw new Error("Invalid or expired token");
    }

    await User.update({ id: parseInt(userId) }, { isVerified: true });

    await redis.del(token);

    return true;
  }
}
