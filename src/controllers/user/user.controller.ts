import { Request, Response } from "express";

import { UserModelPayload } from "../../models";
import { UserService } from "../../services";
import { DEFAULT_USER_LIMIT } from "../../shared/constant";
import { HttpStatusCode } from "../../utils";

export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);

    if (!user || user.isDeleted) {
      res.status(HttpStatusCode.NOT_FOUND).json("User not found");
    } else {
      res.status(HttpStatusCode.OK).send(user);
    }
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER);
    res.json(e.message);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const { loginSubstring, limit = DEFAULT_USER_LIMIT } = req.query;
    const users = await UserService.getAutoSuggestUsers(
      loginSubstring as string,
      limit as string
    );

    if (users.length === 0) {
      res.status(HttpStatusCode.NOT_FOUND).json("Users not found");
    } else {
      res.status(HttpStatusCode.OK).send(users);
    }
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER);
    res.json(e.message);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const baseUser = req.body as UserModelPayload;
    const user = await UserService.createUser(baseUser);

    if (!user) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json("User already exists, please try another login");
    } else {
      res.status(HttpStatusCode.CREATE).send(user);
    }
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER);
    res.json(e.message);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const baseUser = req.body;
    const user = await UserService.updateUser(id, baseUser);

    if (!user || user.isDeleted) {
      res.status(HttpStatusCode.BAD_REQUEST).json("Check id user");
    } else {
      res.status(HttpStatusCode.OK).json(`User updated`);
    }
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER);
    res.json(e.message);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserService.deleteUser(id);

    if (!user) {
      res.status(HttpStatusCode.BAD_REQUEST).json("Check id user");
    } else {
      res.status(HttpStatusCode.OK).json("User deleted");
    }
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER);
    res.json(e.message);
  }
};
