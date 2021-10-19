import request from "supertest";

import { app } from "../../../src/app";
import { UserService } from "../../../src/services";
import { generateUserData, generateUserPayload } from "../../../src/utils";

export const createUserTest = () => {
  describe("POST /api/user/ - create", () => {
    test("should return 400 and message ", async () => {
      const payload = generateUserPayload();
      const spy = jest
        .spyOn(UserService, "createUser")
        .mockResolvedValueOnce(null);

      const response = await request(app).post("/api/user").send(payload);

      expect(response.body).toEqual(
        "User already exists, please try another login"
      );
      expect(response.status).toEqual(400);
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return new user", async () => {
      const payload = generateUserPayload();
      const userData = generateUserData(payload);
      const spy = jest
        .spyOn(UserService, "createUser")
        .mockResolvedValueOnce(userData);

      const response = await request(app).post("/api/user").send(payload);

      expect(response.body).toEqual(userData);
      expect(response.status).toEqual(201);
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
};
