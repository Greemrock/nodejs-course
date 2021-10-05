import express from "express";
import { morganMiddleware, errorInternalServer } from "./loggers";
import { userRouter, groupRouter } from "./routers";

export const app = express();

app.use(express.json());
app.use(morganMiddleware);
app.use("/api/user", userRouter);
app.use("/api/group", groupRouter);
app.use(errorInternalServer);
