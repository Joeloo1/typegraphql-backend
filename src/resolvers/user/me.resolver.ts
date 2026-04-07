import { Resolver, Query, Ctx } from "type-graphql";

import { User } from "../../entities/user.entity";
import { MyContext } from "src/context/MyContext";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | null> {
    if (!ctx.req.session.userId) {
      throw new Error("Not authenticated");
    }
    return User.findOne({ where: { id: ctx.req.session.userId } });
  }
}
