import { Router } from "express";
import { bodySchema } from "../schema";
import { createValidator } from "express-joi-validation";
import { userControllers } from "../controllers";

export const userRouter = Router();
const validator = createValidator();

userRouter.get("/users/:id", userControllers.getUserById);
userRouter.get("/users", userControllers.getAutoSuggestUsers);
userRouter.post("/users", validator.body(bodySchema), userControllers.postUser);
userRouter.put(
  "/users/:id",
  validator.body(bodySchema),
  userControllers.putUser
);
userRouter.delete("/users/:id", userControllers.deleteUser);
