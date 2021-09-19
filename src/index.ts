import "reflect-metadata";
import express, { Application } from "express";
import { createConnection } from "typeorm";

import { userRouter } from "./routes/userRouter";
import dbConfig from "./config/database";

const app: Application = express();
app.use(express.json());

const PORT = 8000;

app.use("/", userRouter);

createConnection(dbConfig)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch(err => {
    console.log("Unable to connect to db", err);
    process.exit(1);
  });
