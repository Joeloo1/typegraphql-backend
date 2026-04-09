import { PasswordMixin } from "src/mixins/password.mixin";
import { Field, InputType } from "type-graphql";

@InputType()
export class ResetPasswordInput extends PasswordMixin(class {}) {
  @Field()
  token!: string;

  @Field()
  password!: string;
}
