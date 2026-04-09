import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../context/MyContext";

export const isAuth: MiddlewareFn<MyContext> = async (
  { context: { req } },
  next,
) => {
  if (!req.session.userId) {
    throw new Error("Not authenticated");
  }
  return next();
};
