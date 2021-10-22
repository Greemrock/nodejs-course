import { Request, Response } from "express";

import { UserController } from "../../../src/controllers";
import { UserService } from "../../../src/services";
import { generateUsersData } from "../../../src/utils";

export const getAllUserTest = () => {
  describe("GET /api/user/ - getAll", () => {
    const usersData = generateUsersData(2);
    const req = {
      query: { loginSubstring: "", limit: 10 },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;
    const error = new Error("Internal error");

    test("should return status 200 with query ", async () => {
      const spy = jest
        .spyOn(UserService, "getAutoSuggestUsers")
        .mockResolvedValueOnce(usersData);

      await UserController.getAll(req, res);

      expect(res.status).toBeCalledWith(200);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 200 without query", async () => {
      const req = { query: {} } as unknown as Request;
      const spy = jest
        .spyOn(UserService, "getAutoSuggestUsers")
        .mockResolvedValueOnce(usersData);

      await UserController.getAll(req, res);

      expect(res.status).toBeCalledWith(200);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 404", async () => {
      const spy = jest
        .spyOn(UserService, "getAutoSuggestUsers")
        .mockResolvedValueOnce([]);

      await UserController.getAll(req, res);

      expect(res.status).toBeCalledWith(404);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 500", async () => {
      const spy = jest
        .spyOn(UserService, "getAutoSuggestUsers")
        .mockRejectedValueOnce(error);

      await UserController.getAll(req, res);

      expect(res.status).toBeCalledWith(500);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
};
