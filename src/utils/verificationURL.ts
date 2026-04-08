import { verificationPrefix } from "./../constants/redisPrefixes";
import { v4 as uuidv4 } from "uuid";
import { redis } from "../config/redis";

export const verifyURL = async (userId: number) => {
  const token = uuidv4();

  await redis.set(
    verificationPrefix + token,
    String(userId),
    "EX",
    60 * 60 * 24,
  );
  return `http://localhost:4000/user/confirm/${token}`;
};
