import request from "supertest";

import { app } from "../../../src/app";
import { UserService } from "../../../src/services";
import { generateUserData } from "../../../src/utils";

export const deleteUserTest = () => {
  describe("DELETE /api/user/:id - remove", () => {
    test("should return status 200 and message", async () => {
      const userData = generateUserData({ isDeleted: true });
      const spy = jest
        .spyOn(UserService, "deleteUser")
        .mockResolvedValueOnce(userData);

      const response = await request(app)
        .delete("/api/user/" + userData.id)
        .send(userData.id);

      expect(response.body).toEqual("User deleted");
      expect(response.status).toEqual(200);
      expect(spy).toHaveBeenCalledWith(userData.id);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return 400 and message", async () => {
      const userData = generateUserData({ isDeleted: true });
      const spy = jest
        .spyOn(UserService, "deleteUser")
        .mockResolvedValueOnce(null);

      const response = await request(app)
        .delete("/api/user/" + userData.id)
        .send(userData.id);

      expect(response.body).toEqual("Check id user");
      expect(response.status).toEqual(400);
      expect(spy).toHaveBeenCalledWith(userData.id);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
};
