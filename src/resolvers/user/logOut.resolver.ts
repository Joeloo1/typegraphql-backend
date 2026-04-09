import { Resolver, Mutation, Ctx } from "type-graphql";

import { MyContext } from "src/context/MyContext";

@Resolver()
export class LogOutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<boolean> {
    return new Promise((resolve, reject) => {
      ctx.req.session.destroy((err) => {
        if (err) {
          throw new Error("Failed to log out");
          reject(false);
        }
      });

      ctx.res.clearCookie("qid");
      return resolve(true);
    });
  }
}
