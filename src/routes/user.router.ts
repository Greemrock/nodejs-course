import { Router } from "express";
import { bodySchema } from "../schema";
import { createValidator } from "express-joi-validation";
import * as UserControllers from "../controllers";

export const userRouter = Router();
const validator = createValidator();

userRouter.get("/:id", UserControllers.getUserById);
userRouter.get("/", UserControllers.getAutoSuggestUsers);
userRouter.post("/", validator.body(bodySchema), UserControllers.postUser);
userRouter.put("/:id", validator.body(bodySchema), UserControllers.putUser);
userRouter.delete("/:id", UserControllers.deleteUser);
