import "reflect-metadata";

import { AppDataSource } from "./config/data-source";
import { createApp } from "./app";
import { config } from "./config/env";
import { redis } from "./config/redis";

const main = async () => {
  redis.on("connect", () => console.log("Redis connected"));
  redis.on("error", (err) => console.error("Redis error:", err));

  const port = config.Port;

  await AppDataSource.initialize();
  console.log("PostgreSQL connected via TypeORM");

  const app = await createApp();

  app.listen(port, () => {
    console.log("Server is running on http://localhost:4000/graphql");
    console.log(
      "Altair GraphQL Client available at http://localhost:4000/altair",
    );
  });
};

main().catch(console.error);
