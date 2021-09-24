import { Router } from "express";
import { createValidator } from "express-joi-validation";
import { UserController } from "../../controllers";
import { userValidate } from "../../validate";

export const userRouter = Router();
const validator = createValidator();

userRouter
  .get("/:id", UserController.get)
  .get("/", UserController.getAll)
  .post("/", validator.body(userValidate), UserController.create)
  .put("/:id", validator.body(userValidate), UserController.update)
  .delete("/:id", UserController.remove);
