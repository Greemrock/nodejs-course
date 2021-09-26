import { config } from "dotenv";
import { ConnectionOptions } from "typeorm-seeding";
import { User, Group } from "./src/data-access/entity";

config();

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  name: "default",
  host: process.env.PG_HOST,
  port: 5432,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: { rejectUnauthorized: false },
  entities: [User, Group],
  synchronize: true,
  cli: {
    entitiesDir: "src/model/entity",
    migrationsDir: "src/database/migration",
    subscribersDir: "src/subscriber",
  },
  seeds: [process.env.TYPEORM_SEEDING_SEEDS],
  factories: [process.env.TYPEORM_SEEDING_FACTORIES],
};

export = connectionOptions;
