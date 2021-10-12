import { Router } from "express";

import { UserController } from "../../controllers";
import { validator } from "../../middlewares";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const userRouter = Router();

userRouter
  .route("/")
  .get(authMiddleware, UserController.getAll)
  .post(validator, UserController.create);

userRouter
  .route("/:id")
  .get(authMiddleware, UserController.get)
  .put(authMiddleware, validator, UserController.update)
  .delete(authMiddleware, UserController.remove);
