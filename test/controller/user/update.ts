import { Request, Response } from "express";

import { UserController } from "../../../src/controllers";
import { UserService } from "../../../src/services";
import { generateUserPayload, generateUserData } from "../../../src/utils";

export const updateUserTest = () => {
  describe("PUT /api/user/:id - update", () => {
    const payload = generateUserPayload();
    const userData = generateUserData(payload);
    const req = { params: userData.id, body: payload } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const error = new Error("Internal error");

    test("should return status 200", async () => {
      const spy = jest
        .spyOn(UserService, "updateUser")
        .mockResolvedValueOnce(userData);

      await UserController.update(req, res);

      expect(res.status).toBeCalledWith(200);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 400", async () => {
      const spy = jest
        .spyOn(UserService, "updateUser")
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ ...userData, isDeleted: true });

      await UserController.update(req, res);

      expect(res.status).toBeCalledWith(400);
      expect(res.status).toBeCalledWith(400);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 500", async () => {
      const spy = jest
        .spyOn(UserService, "updateUser")
        .mockRejectedValueOnce(error);

      await UserController.update(req, res);

      expect(res.status).toBeCalledWith(500);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
};
