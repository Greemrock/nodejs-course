import { Request, Response } from "express";
import * as UserService from "../user/user.service";
import { HttpStatusCode } from "../error";
import { BaseUser } from "../user/user.type";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UserService.getUser(id);
    if (!user) {
      return res.status(HttpStatusCode.NOT_FOUND).send("User not found");
    } else if (user.isDeleted === true) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .send("User deleted, please try another request");
    }
    res.status(HttpStatusCode.OK).send(user);
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).send(e.message);
  }
};

export const getAutoSuggestUsers = async (req: Request, res: Response) => {
  const { loginSubstring = "", limit = "10" } = req.query;
  if (typeof loginSubstring !== "string") {
    res.status(HttpStatusCode.INTERNAL_SERVER).send("Invalid loginSubstring");
    return;
  }
  if (typeof limit !== "string") {
    res.status(HttpStatusCode.INTERNAL_SERVER).send("Invalid limit");
    return;
  }
  try {
    const user = await UserService.getAutoSuggestUsers(loginSubstring, limit);
    if (user) {
      return res.status(HttpStatusCode.OK).send(user);
    }
    res.status(HttpStatusCode.NOT_FOUND).send("item not found");
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).send(e.message);
  }
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const baseUser = req.body as BaseUser;
    const user = await UserService.createUser(baseUser);
    res.status(HttpStatusCode.CREATE).send(user);
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).send(e.message);
  }
};

export const putUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const baseUser = req.body as BaseUser;
    const user = await UserService.updateUser(id, baseUser);
    if (Object.keys(user).length === 0) {
      return res.status(HttpStatusCode.NOT_FOUND).send("User is not found");
    } else if (user.isDeleted === true) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .send("User deleted, please try another request");
    }
    res.status(HttpStatusCode.OK).send();
  } catch (e) {
    res.status(HttpStatusCode.NOT_FOUND).send("User is not found");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await UserService.deleteUser(id);
    res.status(HttpStatusCode.OK).send();
  } catch (e) {
    res.status(HttpStatusCode.NOT_FOUND).send("User is not found");
  }
};
