import { Router } from "express";
import { GroupController } from "../../controllers";

export const groupRouter = Router();

groupRouter
  .get("/:id", GroupController.get)
  .get("/", GroupController.getAll)
  .post("/", GroupController.create)
  .put("/:id", GroupController.update)
  .delete("/:id", GroupController.remove);
