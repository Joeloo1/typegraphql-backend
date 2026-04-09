import { Field, InputType } from "type-graphql";
import { PasswordMixin } from "../mixins/password.mixin";

@InputType()
export class ResetPasswordInput extends PasswordMixin(class {}) {
  @Field()
  token!: string;

  @Field()
  password!: string;
}
