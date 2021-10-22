import { Request, Response } from "express";

import { UserController } from "../../../src/controllers";
import { UserService } from "../../../src/services";
import { generateUserData, generateUserPayload } from "../../../src/utils";

export const createUserTest = () => {
  describe("POST /api/user/ - create", () => {
    const payload = generateUserPayload();
    const userData = generateUserData(payload);
    const req = { body: payload } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const error = new Error("Internal error");

    test("should return status 200", async () => {
      const spy = jest
        .spyOn(UserService, "createUser")
        .mockResolvedValueOnce(userData);

      await UserController.create(req, res);

      expect(res.status).toBeCalledWith(201);
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 400", async () => {
      const spy = jest
        .spyOn(UserService, "createUser")
        .mockResolvedValueOnce(null);

      await UserController.create(req, res);

      expect(res.status).toBeCalledWith(400);
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 500", async () => {
      const spy = jest
        .spyOn(UserService, "createUser")
        .mockRejectedValueOnce(error);

      await UserController.create(req, res);

      expect(res.status).toBeCalledWith(500);
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
};
