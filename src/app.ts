import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import connectRedis from "connect-redis";
import { altairExpress } from "altair-express-middleware";
import cors from "cors";
import { resolvers } from "./resolvers/index";
import { formatError } from "./utils/formatError";
import session from "express-session";
import { redis } from "./config/redis";
import { config } from "./config/env";

export const createApp = async () => {
  const schema = await buildSchema({
    resolvers,
    validate: true,
    authChecker: ({ context: { req } }) => {
      // if (req.session.userId) {
      //   return true;
      // }
      // return false;
      return !!req.session.userId;
    },
  });

  const apolloServer = new ApolloServer({
    schema,
    formatError,
    context: ({ req }) => ({ req }),
  });

  await apolloServer.start();

  const app = express();

  app.use(express.json());
  app.use(
    "/altair",
    altairExpress({
      endpointURL: "/graphql",
      baseURL: "/altair/", // ← add this
    }),
  );

  app.use(
    cors({
      credentials: true,
      origin: ["https://studio.apollographql.com", "http://localhost:4000"],
    }),
  );

  const RedisStore = connectRedis(session);

  const redisStore = new RedisStore({
    client: redis,
    prefix: "qid",
  });

  app.use(
    session({
      store: redisStore,
      name: "qid",
      secret: config.SessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: config.NodeEnv === "production",
        sameSite: config.NodeEnv === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    }),
  );
  redis.on("connect", () => console.log("Redis connected"));
  redis.on("error", (err) => console.error("Redis error:", err));

  apolloServer.applyMiddleware({ app, cors: false });

  return app;
};
