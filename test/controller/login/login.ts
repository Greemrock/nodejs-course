import { generateToken } from "./../../../src/utils/generate";
import request from "supertest";

import { app } from "../../../src/app";
import { LoginService, UserService } from "../../../src/services";
import { generateUserData } from "../../../src/utils";

export const loginTest = () => {
  describe("POST /api/login/ - login", () => {
    const payload = { login: "admin", password: "admin" };

    test("should return 200 and token", async () => {
      const userData = generateUserData(payload);
      const token = generateToken(userData.id);
      const spyUserService = jest
        .spyOn(UserService, "getUserByLogin")
        .mockResolvedValueOnce(userData);
      const spyLoginService = jest
        .spyOn(LoginService, "login")
        .mockResolvedValueOnce(token as never);

      const response = await request(app).post("/api/login").send(payload);

      expect(response.text).toEqual(token);
      expect(response.status).toEqual(200);
      expect(spyUserService).toHaveBeenCalledTimes(1);
      expect(spyLoginService).toHaveBeenCalledTimes(1);
    });

    test("should return 401 and message ", async () => {
      const userData = generateUserData(payload);
      const token = generateToken(userData.id);
      const spyUserService = jest
        .spyOn(UserService, "getUserByLogin")
        .mockResolvedValueOnce(null);
      const spyLoginService = jest
        .spyOn(LoginService, "login")
        .mockResolvedValueOnce(token as never);

      const response = await request(app).post("/api/login").send(payload);

      expect(response.body).toEqual("Bad login or password combination");
      expect(response.status).toEqual(401);
      expect(spyUserService).toHaveBeenCalledTimes(1);
      expect(spyLoginService).toHaveBeenCalledTimes(0);
    });

    test("should return status 500 and message", async () => {
      const spyUserService = jest
        .spyOn(UserService, "getUserByLogin")
        .mockRejectedValueOnce(new Error("Internal error"));

      const response = await request(app)
        .post("/api/login")
        .send(payload)
        .expect(500);

      expect(response.body).toEqual("Internal error");
      expect(spyUserService).toHaveBeenCalledTimes(1);
    });
  });
};
