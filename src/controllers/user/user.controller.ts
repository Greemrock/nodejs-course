import { Request, Response } from "express";
import { UserModelPayload } from "../../models";
import { UserService } from "../../services";
import { HttpStatusCode } from "../../utils";

export const get = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UserService.getUserById(id);
    if (!user) {
      return res.status(HttpStatusCode.NOT_FOUND).json("User not found");
    } else if (user.isDeleted === true) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json("User deleted, please try another request");
    }
    res.status(HttpStatusCode.OK).send(user);
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(e.message);
  }
};

export const getAll = async (req: Request, res: Response) => {
  const { loginSubstring, limit = "10" } = req.query;
  try {
    const user = await UserService.getAutoSuggestUsers(
      loginSubstring as string,
      limit as string
    );
    if (user.length) {
      return res.status(HttpStatusCode.OK).send(user);
    }
    res.status(HttpStatusCode.NOT_FOUND).json("users not found");
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(e.message);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const baseUser = req.body as UserModelPayload;
    const findUser = await UserService.getUserByLogin(baseUser.login);
    if (findUser) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json("user already exists, please try another login");
    }
    const user = await UserService.createUser(baseUser);
    res.status(HttpStatusCode.CREATE).send(user);
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json(e.message);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const baseUser = req.body as UserModelPayload;
    const user = await UserService.updateUser(id, baseUser);
    if (user.isDeleted === true) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json("User deleted, please try another request");
    }
    res.status(HttpStatusCode.OK).json(`User ${id} updated`);
  } catch (e) {
    res.status(HttpStatusCode.NOT_FOUND).json("User is not found");
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await UserService.deleteUser(id);
    res.status(HttpStatusCode.OK).json(`User ${id} deleted`);
  } catch (e) {
    res.status(HttpStatusCode.NOT_FOUND).json("User not found");
  }
};
