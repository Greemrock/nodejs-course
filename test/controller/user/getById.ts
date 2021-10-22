import { Request, Response } from "express";

import { UserController } from "../../../src/controllers";
import { UserService } from "../../../src/services";
import { generateUserData } from "../../../src/utils";

export const getByIdUserTest = () => {
  describe("GET /api/user/:id - getById", () => {
    const userData = generateUserData();
    const req = { params: userData.id } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const error = new Error("Internal error");

    test("should return status 200", async () => {
      const spy = jest
        .spyOn(UserService, "getUserById")
        .mockResolvedValueOnce(userData);

      await UserController.get(req, res);

      expect(res.status).toBeCalledWith(200);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 404", async () => {
      const spy = jest
        .spyOn(UserService, "getUserById")
        .mockResolvedValueOnce(null);

      await UserController.get(req, res);

      expect(res.status).toBeCalledWith(404);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 500", async () => {
      const spy = jest
        .spyOn(UserService, "getUserById")
        .mockRejectedValueOnce(error);

      await UserController.get(req, res);

      expect(res.status).toBeCalledWith(500);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
};
