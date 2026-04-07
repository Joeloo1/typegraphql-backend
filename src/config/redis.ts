import Redis from "ioredis";
import { config } from "./env";

export const redis = new Redis({
  host: config.RedisHost || "127.0.0.1",
  port: 6379,
});
