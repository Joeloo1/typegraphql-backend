import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Authorized,
  UseMiddleware,
  // FieldResolver,
  // Root,
} from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entities/user.entity";
import { RegisterInput } from "../../types/user.input";
import { isAuth } from "../../middleware/isAuth.middleware";
import { sendEmail } from "../../utils/email";
import { verifyURL } from "../../utils/verificationURL";

@Resolver()
export class RegisterResolver {
  @Authorized()
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }

  @Mutation(() => User)
  async register(
    @Arg("data") { firstName, lastName, email, password }: RegisterInput,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();

    await sendEmail(email, await verifyURL(user.id));
    return user;
  }

  // // @FieldResolver(() => String)
  // // async name(@Root() parent: User) {
  // //   return `${parent.firstName} ${parent.lastName}`;
  // // }
}
