import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers/index";

export const createApp = async () => {
  const schema = await buildSchema({
    resolvers,
  });

  const apolloServer = new ApolloServer({ schema });
  await apolloServer.start();

  const app = express();

  apolloServer.applyMiddleware({ app });

  return app;
};
