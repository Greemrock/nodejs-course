import { Router } from "express";

import { LoginController } from "../../controllers";

export const loginRouter = Router();

loginRouter.post("/login", LoginController.login);
