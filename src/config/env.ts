import dotenv from "dotenv";

dotenv.config();

export const config = {
  Port: Number(process.env.PORT),
};
