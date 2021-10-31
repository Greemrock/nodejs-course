import { Router } from "express";

import { UserController } from "../../controllers";
import { validator } from "../../middlewares";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const userRouter = Router();

userRouter.use(authMiddleware);

userRouter
  .route("/")
  .get(UserController.getAll)
  .post(validator, UserController.create);

userRouter
  .route("/:id")
  .get(UserController.get)
  .put(validator, UserController.update)
  .delete(UserController.remove);
