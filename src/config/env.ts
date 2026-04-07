import dotenv from "dotenv";

dotenv.config();

export const config = {
  Port: Number(process.env.PORT),
  NodeEnv: process.env.NODE_ENV || "development",
  RedisHost: process.env.REDIS_HOST!,
  CORSOrigin: process.env.CORS_ORIGIN!,
  SessionSecret: process.env.SESSION_SECRET!,
};
