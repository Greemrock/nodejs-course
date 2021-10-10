import { Router } from "express";

import { UserController } from "../../controllers";
import { validator } from "../../middlewares";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const userRouter = Router();

userRouter
  .get("/:id", authMiddleware, UserController.get)
  .get("/", authMiddleware, UserController.getAll)
  .post("/", validator, UserController.create)
  .put("/:id", authMiddleware, validator, UserController.update)
  .delete("/:id", authMiddleware, UserController.remove);
