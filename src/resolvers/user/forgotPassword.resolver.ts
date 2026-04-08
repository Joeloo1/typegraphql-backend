import { Resolver, Mutation, Arg } from "type-graphql";

import { sendEmail } from "../../utils/email";
import { User } from "../../entities/user.entity";
import { forgotPasswordURL } from "../../utils/forgotpassword";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("No user found with that email address");
    }

    await sendEmail(email, await forgotPasswordURL(user.id));

    return true;
  }
}
