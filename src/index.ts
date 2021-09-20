import "reflect-metadata";
import express, { Application } from "express";
import { createConnection } from "typeorm";

import { userRouter } from "./routes/userRouter";
import dbConfig from "./config/database";

const app: Application = express();
app.use(express.json());

app.use("/", userRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
  createConnection(dbConfig)
    .then(() => {
      console.log("Connected to Postgres");
    })
    .catch(err => {
      console.error(err);
      throw new Error("Unable to connect to db");
    });
});
