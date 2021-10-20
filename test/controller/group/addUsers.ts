import request from "supertest";

import { app } from "../../../src/app";
import { GroupService } from "../../../src/services";
import {
  generateGroupPayload,
  generateUsersToGroupData,
} from "../../../src/utils";

export const addUsersToGroupTest = () => {
  describe("PUT /api/group/:id/users - update", () => {
    test("should return status 200 and message", async () => {
      const payload = generateGroupPayload();
      const usersToGroup = generateUsersToGroupData();
      const groupData = { ...usersToGroup, ...payload };
      const spy = jest
        .spyOn(GroupService, "addUsersToGroup")
        .mockResolvedValueOnce(groupData);

      const response = await request(app)
        .put(`/api/group/${groupData.id}/users`)
        .send(usersToGroup);

      expect(response.body).toEqual("Group updated");
      expect(response.status).toEqual(200);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return 400 and message", async () => {
      const payload = generateGroupPayload();
      const usersToGroup = generateUsersToGroupData();
      const groupData = { ...usersToGroup, ...payload };
      const spy = jest
        .spyOn(GroupService, "addUsersToGroup")
        .mockResolvedValueOnce(null);

      const response = await request(app)
        .put(`/api/group/${groupData.id}/users`)
        .send(usersToGroup);

      expect(response.body).toEqual("Check id users");
      expect(response.status).toEqual(400);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 500 and message", async () => {
      const payload = generateGroupPayload();
      const usersToGroup = generateUsersToGroupData();
      const groupData = { ...usersToGroup, ...payload };
      const spy = jest
        .spyOn(GroupService, "addUsersToGroup")
        .mockRejectedValueOnce(new Error("Internal error"));

      const response = await request(app)
        .put(`/api/group/${groupData.id}/users`)
        .send(usersToGroup)
        .expect(500);

      expect(response.body).toEqual("Internal error");
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
};
