import { Resolver, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entities/user.entity";
import { ResetPasswordInput } from "../../types/resetpassword.input";
import { forgotPasswordPrefix } from "../../constants/redisPrefixes";
import { redis } from "../../config/redis";

@Resolver()
export class ResetPasswordResolver {
  @Mutation(() => User, { nullable: true })
  async resetPassword(
    @Arg("data") { token, password }: ResetPasswordInput,
  ): Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);

    if (!userId) {
      throw new Error("Invalid or expired token");
    }

    const user = await User.findOne({ where: { id: parseInt(userId) } });

    if (!user) {
      throw new Error("User not found");
    }

    await redis.del(forgotPasswordPrefix + token);

    user.password = await bcrypt.hash(password, 12);
    await user.save();

    return user;
  }
}
