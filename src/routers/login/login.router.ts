import { Router } from "express";

import { LoginController } from "../../controllers";

export const loginRouter = Router();

loginRouter.get("/login", LoginController.login);
