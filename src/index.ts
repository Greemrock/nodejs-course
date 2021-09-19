import express from "express";
import { userRouter } from "./routes/userRouter";

const app = express();
app.use(express.json());
const port = 3000;

app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}.`);
});
