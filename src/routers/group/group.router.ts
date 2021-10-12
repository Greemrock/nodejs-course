import { Router } from "express";

import { GroupController } from "../../controllers";
import { authMiddleware } from "../../middlewares";

export const groupRouter = Router();

groupRouter
  .route("/")
  .get(authMiddleware, GroupController.getAll)
  .post(authMiddleware, GroupController.create);

groupRouter
  .route("/:id")
  .get(authMiddleware, GroupController.get)
  .put(authMiddleware, GroupController.update)
  .delete(authMiddleware, GroupController.remove);

groupRouter.route("/:id/users").put(authMiddleware, GroupController.addUsers);
