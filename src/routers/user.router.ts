import { Router } from "express";
import { createValidator } from "express-joi-validation";
import { UserController } from "../controllers";
import { bodyValidationSchema } from "../models";

export const userRouter = Router();
const validator = createValidator();

userRouter
  .get("/:id", UserController.get)
  .get("/", UserController.getAll)
  .post("/", validator.body(bodyValidationSchema), UserController.create)
  .put("/:id", validator.body(bodyValidationSchema), UserController.update)
  .delete("/:id", UserController.remove);
