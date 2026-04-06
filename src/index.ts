import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { createApp } from "./app";
import { config } from "./config/env";

const main = async () => {
  const port = config.Port;
  await AppDataSource.initialize();
  console.log("PostgreSQL connected via TypeORM");

  const app = await createApp();

  app.listen(port, () => {
    console.log("Server is running on http://localhost:3000/graphql");
  });
};

main().catch(console.error);
