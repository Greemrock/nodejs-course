import express from "express";

import { errorInternalServer, morganMiddleware } from "./middlewares";
import { userRouter, groupRouter } from "./routers";

export const app = express();

app.use(express.json());
app.use(morganMiddleware);
app.use("/api/user", userRouter);
app.use("/api/group", groupRouter);
app.use(errorInternalServer);
