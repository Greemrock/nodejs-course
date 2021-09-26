import { ConnectionOptions } from "typeorm";
import { config } from "dotenv";
import { User, Group } from "./src/data-access/entity";

config();

// const connectionOptions: ConnectionOptions = {
//   name: "ST-2-REST-API",
//   type: "postgres",
//   host: process.env.PG_HOST,
//   port: 5432,
//   username: process.env.PG_USERNAME,
//   password: process.env.PG_PASSWORD,
//   database: process.env.PG_DATABASE,
//   // ssl: { rejectUnauthorized: false },
//   synchronize: true,
//   entities: [User, Group],
//   migrations: ["src/migration/**/*.ts"],
// };

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  name: "default",
  url: "postgres://feezxnyubcszpr:0bda4525b8d31713b3b7cd079f678d24080ea26d4de99070449853f34482e224@ec2-34-196-238-94.compute-1.amazonaws.com:5432/d1lvdled805fik",
  ssl: { rejectUnauthorized: false },
  entities: [User, Group],
  synchronize: true,
};

export = connectionOptions;
