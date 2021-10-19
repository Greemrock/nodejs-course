import request from "supertest";

import { app } from "../../../src/app";
import { UserService } from "../../../src/services";
import { generateUsersData } from "../../../src/utils";

export const getAllUserTest = () => {
  describe("GET /api/user/ - getAll", () => {
    test("should return status 200 and user list", async () => {
      const usersData = generateUsersData(2);
      const spy = jest
        .spyOn(UserService, "getAutoSuggestUsers")
        .mockResolvedValueOnce(usersData);
      const response = await request(app).get("/api/user/");

      expect(response.body).toEqual(usersData);
      expect(response.status).toEqual(200);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 404 and message", async () => {
      const spy = jest
        .spyOn(UserService, "getAutoSuggestUsers")
        .mockResolvedValueOnce([]);
      const response = await request(app).get("/api/user/");

      expect(response.body).toEqual("Users not found");
      expect(response.status).toEqual(404);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 500 and message", async () => {
      const spy = jest.spyOn(UserService, "getAutoSuggestUsers");
      const response = await request(app).get("/api/user/");

      expect(response.status).toEqual(500);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
};
