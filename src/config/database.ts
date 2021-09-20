import { ConnectionOptions } from "typeorm";
import { User } from "../models";

const databaseUrl =
  "postgres://feezxnyubcszpr:0bda4525b8d31713b3b7cd079f678d24080ea26d4de99070449853f34482e224@ec2-34-196-238-94.compute-1.amazonaws.com:5432/d1lvdled805fik";

const config: ConnectionOptions = {
  type: "postgres",
  name: "default",
  url: databaseUrl,
  ssl: { rejectUnauthorized: false },
  entities: [User],
  synchronize: true,
};

export default config;
