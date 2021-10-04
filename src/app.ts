import express from "express";
import { morganMiddleware } from "./loggers/margan.logger";
import { userRouter, groupRouter } from "./routers";

export const app = express();

app.use(morganMiddleware);
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/group", groupRouter);
