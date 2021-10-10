import { Router } from "express";

import { GroupController } from "../../controllers";
import { authMiddleware } from "../../middlewares";

export const groupRouter = Router();

groupRouter
  .get("/:id", authMiddleware, GroupController.get)
  .get("/", authMiddleware, GroupController.getAll)
  .post("/", authMiddleware, GroupController.create)
  .put("/:id", authMiddleware, GroupController.update)
  .delete("/:id", authMiddleware, GroupController.remove)
  .put("/:id/users", authMiddleware, GroupController.addUsers);
