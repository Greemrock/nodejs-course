import { ConnectionOptions } from "typeorm";
import { config } from "dotenv";
import { User } from "./src/models";

config();

const connectionOptions: ConnectionOptions = {
  name: "ST-2-REST-API",
  type: "postgres",
  ssl: { rejectUnauthorized: false },
  entities: [User],
  synchronize: true,
  host: process.env.PG_HOST,
  port: 5432,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
};

export = connectionOptions;
