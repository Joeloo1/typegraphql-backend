import {
  Resolver,
  Query,
  Mutation,
  Arg,
  // FieldResolver,
  // Root,
} from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entities/user.entity";
import { RegisterInput } from "../../types/user.input";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }

  // @FieldResolver(() => String)
  // async name(@Root() parent: User) {
  //   return `${parent.firstName} ${parent.lastName}`;
  // }

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
    return user;
  }
}
