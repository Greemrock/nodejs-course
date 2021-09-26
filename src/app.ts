import express from "express";
import { userRouter, groupRouter } from "./routers";

export const app = express();

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/group", groupRouter);
