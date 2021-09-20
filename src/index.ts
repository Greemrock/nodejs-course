import "reflect-metadata";
import express, { Application } from "express";
import { createConnection } from "typeorm";
import cors from "cors";

import { userRouter } from "./routers";
import dbConfig from "./config/database";

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    console.log(`Server started on port ${PORT}`);
    await createConnection(dbConfig);
    console.log("Connected to Postgres");
  } catch (err) {
    console.error(err);
    throw new Error("Unable to connect to db");
  }
});
