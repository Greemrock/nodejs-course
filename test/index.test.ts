import { Request, Response, NextFunction } from "express";

import { authMiddleware, morganMiddleware } from "../src/middlewares";
import {
  createUserTest,
  deleteUserTest,
  getAllUserTest,
  getByIdUserTest,
  updateUserTest,
} from "./controller/user";
import {
  addUsersToGroupTest,
  createGroupTest,
  deleteGroupTest,
  getAllGroupTest,
  getByIdGroupTest,
  updateGroupTest,
} from "./controller/group";
import { loginTest } from "./controller/login";

jest.mock("../src/middlewares/auth.middleware.ts");
jest.mock("../src/middlewares/morgan.middleware.ts");

describe("Controller tests", () => {
  beforeEach(() => {
    (authMiddleware as jest.Mock).mockImplementation(
      (req: Request, res: Response, next: NextFunction) =>
        new Promise(() => next())
    );
  });

  beforeEach(() => {
    (morganMiddleware as jest.Mock).mockImplementation(
      (req: Request, res: Response, next: NextFunction) =>
        new Promise(() => next())
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("User controller", () => {
    getByIdUserTest();
    createUserTest();
    deleteUserTest();
    getAllUserTest();
    updateUserTest();
  });

  describe("Group controller", () => {
    createGroupTest();
    deleteGroupTest();
    getAllGroupTest();
    getByIdGroupTest();
    updateGroupTest();
    addUsersToGroupTest();
  });

  describe("Login controller", () => {
    loginTest();
  });
});
