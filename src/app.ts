import express from "express";
import cors from "cors";

import { errorInternalServer, morganMiddleware } from "./middlewares";
import { userRouter, groupRouter, loginRouter } from "./routers";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(morganMiddleware);
app.use("/api/", loginRouter);
app.use("/api/user", userRouter);
app.use("/api/group", groupRouter);
app.use(errorInternalServer);
