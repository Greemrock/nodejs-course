import { Request, Response } from "express";

import { UserService } from "../../../src/services";
import { generateUserData } from "../../../src/utils";
import { UserController } from "../../../src/controllers";

export const deleteUserTest = () => {
  describe("DELETE /api/user/:id - remove", () => {
    const userData = generateUserData({ isDeleted: true });
    const req = { params: userData.id } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const error = new Error("Internal error");

    test("should return status 200", async () => {
      const spy = jest
        .spyOn(UserService, "deleteUser")
        .mockResolvedValueOnce(userData);

      await UserController.remove(req, res);

      expect(res.status).toBeCalledWith(200);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 400", async () => {
      const spy = jest
        .spyOn(UserService, "deleteUser")
        .mockResolvedValueOnce(null);

      await UserController.remove(req, res);

      expect(res.status).toBeCalledWith(400);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 500", async () => {
      const spy = jest
        .spyOn(UserService, "deleteUser")
        .mockRejectedValueOnce(error);

      await UserController.remove(req, res);

      expect(res.status).toBeCalledWith(500);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
};
