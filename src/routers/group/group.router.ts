import { Router } from "express";

import { GroupController } from "../../controllers";
import { authMiddleware } from "../../middlewares";

export const groupRouter = Router();

groupRouter.use(authMiddleware);

groupRouter.route("/").get(GroupController.getAll).post(GroupController.create);

groupRouter
  .route("/:id")
  .get(GroupController.get)
  .put(GroupController.update)
  .delete(GroupController.remove);

groupRouter.route("/:id/users").put(GroupController.addUsers);
