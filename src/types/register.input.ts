import { Length, IsEmail } from "class-validator";
import { IsEmailAlreadyExist } from "../error/validationError";
import { Field, InputType } from "type-graphql";

import { PasswordMixin } from "../mixins/password.mixin";

@InputType()
export class RegisterInput extends PasswordMixin(class {}) {
  @Field()
  @Length(1, 255)
  firstName!: string;

  @Field()
  @Length(1, 255)
  lastName!: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email already exists" })
  email!: string;

  @Field()
  password!: string;
}
