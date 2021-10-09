import { Router } from "express";

import { UserController } from "../../controllers";
import { validator } from "../../middlewares";

export const userRouter = Router();

userRouter
  .get("/:id", UserController.get)
  .get("/", UserController.getAll)
  .post("/", validator, UserController.create)
  .put("/:id", validator, UserController.update)
  .delete("/:id", UserController.remove);
