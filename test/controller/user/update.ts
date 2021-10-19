import request from "supertest";

import { app } from "../../../src/app";
import { UserService } from "../../../src/services";
import { generateUserPayload, generateUserData } from "../../../src/utils";

export const updateUserTest = () => {
  describe("PUT /api/user/:id - update", () => {
    test("should return status 200 and message", async () => {
      const payload = generateUserPayload();
      const userData = generateUserData(payload);
      const spy = jest
        .spyOn(UserService, "updateUser")
        .mockResolvedValueOnce(userData);

      const response = await request(app)
        .put("/api/user/" + userData.id)
        .send(payload);

      expect(response.body).toEqual("User updated");
      expect(response.status).toEqual(200);
      expect(spy).toHaveBeenCalledWith(userData.id, payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return 400 and message", async () => {
      const payload = generateUserPayload();
      const userData = generateUserData({ ...payload, isDeleted: true });
      const spy = jest
        .spyOn(UserService, "updateUser")
        .mockResolvedValueOnce(userData);

      const response = await request(app)
        .put("/api/user/" + userData.id)
        .send(payload);

      expect(response.body).toEqual("Check id user");
      expect(response.status).toEqual(400);
      expect(spy).toHaveBeenCalledWith(userData.id, payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return 400 and message", async () => {
      const payload = generateUserPayload();
      const userData = generateUserData({ ...payload, password: "qwe213" });
      const spy = jest
        .spyOn(UserService, "updateUser")
        .mockResolvedValueOnce(null);

      const response = await request(app)
        .put("/api/user/" + userData.id)
        .send(payload);

      expect(response.body).toEqual("Check id user");
      expect(response.status).toEqual(400);
      expect(spy).toHaveBeenCalledWith(userData.id, payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
};
