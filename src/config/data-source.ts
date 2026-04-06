import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "joel",
  password: "password",
  database: "typegraphql",
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});
