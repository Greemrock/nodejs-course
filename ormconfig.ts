import { ConnectionOptions } from "typeorm";
import { config } from "dotenv";

config();

const connectionOptions: ConnectionOptions = {
  name: "ST-2-REST-API",
  type: "postgres",
  host: process.env.PG_HOST,
  port: 5432,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: { rejectUnauthorized: false },
  synchronize: true,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
};

export = connectionOptions;
