import { Request, Response } from "express";
import { UserModelPayload } from "../types";
import * as userRepository from "../services";
import { HttpStatusCode } from "../utils/error";

export const get = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await userRepository.getUserById(id);
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

export const getAll = async (req: Request, res: Response) => {
  const { loginSubstring, limit = "10" } = req.query;
  try {
    const user = await userRepository.getAutoSuggestUsers(
      loginSubstring as string,
      limit as string
    );
    if (user.length) {
      return res.status(HttpStatusCode.OK).send(user);
    }
    res.status(HttpStatusCode.NOT_FOUND).send("users not found");
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).send(e.message);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const baseUser = req.body as UserModelPayload;
    const findUser = await userRepository.getUserByLogin(baseUser.login);
    if (findUser) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .send("user already exists, please try another login");
    }
    const user = await userRepository.createUser(baseUser);
    res.status(HttpStatusCode.CREATE).send(user);
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER).send(e.message);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const baseUser = req.body as UserModelPayload;
    const user = await userRepository.updateUser(id, baseUser);
    if (user.isDeleted === true) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .send("User deleted, please try another request");
    }
    res.status(HttpStatusCode.OK).send(`User ${id} updated`);
  } catch (e) {
    res.status(HttpStatusCode.NOT_FOUND).send("User is not found");
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await userRepository.deleteUser(id);
    res.status(HttpStatusCode.OK).send(`User ${id} deleted`);
  } catch (e) {
    res.status(HttpStatusCode.NOT_FOUND).send("User is not found");
  }
};
