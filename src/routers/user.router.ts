import { Router } from "express";
import { createValidator } from "express-joi-validation";
import * as UserControllers from "../controllers";
import { bodySchema } from "../models";

export const userRouter = Router();
const validator = createValidator();

userRouter
  .get("/:id", UserControllers.get)
  .get("/", UserControllers.getAll)
  .post("/", validator.body(bodySchema), UserControllers.create)
  .put("/:id", validator.body(bodySchema), UserControllers.update)
  .delete("/:id", UserControllers.remove);
