import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
  type: "postgres",
  host: "ec2-34-196-238-94.compute-1.amazonaws.com" || "localhost",
  port: 5432,
  username: "feezxnyubcszpr" || "postgres",
  password:
    "0bda4525b8d31713b3b7cd079f678d24080ea26d4de99070449853f34482e224" ||
    "postgres",
  database: "d1lvdled805fik" || "postgres",
  entities: [],
  synchronize: true,
};

export default config;
