import request from "supertest";

import { app } from "../../../src/app";
import { UserService } from "../../../src/services";
import { generateUserData } from "../../../src/utils";

export const getByIdUserTest = () => {
  describe("GET /api/user/:id - getById", () => {
    test("should return user from the database", async () => {
      const userData = generateUserData();
      const spy = jest
        .spyOn(UserService, "getUserById")
        .mockResolvedValueOnce(userData);

      const response = await request(app)
        .get("/api/user/" + userData.id)
        .send(userData.id);

      expect(response.body).toEqual(userData);
      expect(response.body.id).toBe(userData.id);
      expect(spy).toHaveBeenCalledWith(userData.id);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return 404 - user not found", async () => {
      const userData = generateUserData();
      const spy = jest
        .spyOn(UserService, "getUserById")
        .mockResolvedValueOnce(null);

      const response = await request(app)
        .get("/api/user/" + userData.id)
        .send(userData.id);

      expect(response.body).toEqual("User not found");
      expect(response.status).toEqual(404);
      expect(spy).toHaveBeenCalledWith(userData.id);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return 400 - bad request", async () => {
      const userData = generateUserData({ isDeleted: true });
      const spy = jest
        .spyOn(UserService, "getUserById")
        .mockResolvedValueOnce(userData);

      const response = await request(app)
        .get("/api/user/" + userData.id)
        .send(userData.id);

      expect(response.body).toEqual("User deleted, please try another request");
      expect(response.status).toEqual(400);
      expect(spy).toHaveBeenCalledWith(userData.id);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 500 and message", async () => {
      const userData = generateUserData();
      const spy = jest
        .spyOn(UserService, "getUserById")
        .mockRejectedValueOnce(new Error("Internal error"));

      const response = await request(app)
        .get("/api/user/" + userData.id)
        .send(userData.id)
        .expect(500);

      expect(response.body).toEqual("Internal error");
      expect(spy).toHaveBeenCalledWith(userData.id);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
};
