import { Request, Response } from "express";

import { LoginModel } from "../../models";
import { LoginService, UserService } from "../../services";
import { HttpStatusCode } from "../../utils";

export const login = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body as LoginModel;
    const user = await UserService.getUserByLogin(login);

    if (user && user.password === password) {
      const token = await LoginService.login(user);

      res.status(HttpStatusCode.OK).send(token);
    } else {
      res
        .status(HttpStatusCode.FORBIDDEN_ERROR)
        .json("Bad login or password combination");
    }
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(e.message);
  }
};
