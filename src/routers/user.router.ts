import { Router } from "express";
import { createValidator } from "express-joi-validation";
import * as UserControllers from "../controllers";
import { bodySchema } from "../models";

export const userRouter = Router();
const validator = createValidator();

userRouter
  .get("/:id", UserControllers.getUserById)
  .get("/", UserControllers.getAutoSuggestUsers)
  .post("/", validator.body(bodySchema), UserControllers.postUser)
  .put("/:id", validator.body(bodySchema), UserControllers.putUser)
  .delete("/:id", UserControllers.deleteUser);
