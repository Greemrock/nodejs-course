import { UpdateResult } from "typeorm";
import request from "supertest";

import { app } from "../../../src/app";
import { GroupService } from "../../../src/services";
import { generateGroupPayload, generateGroupData } from "../../../src/utils";

export const updateGroupTest = () => {
  describe("PUT /api/group/:id - update", () => {
    test("should return status 200 and message", async () => {
      const payload = generateGroupPayload();
      const groupData = generateGroupData(payload);
      const spy = jest
        .spyOn(GroupService, "updateGroup")
        .mockResolvedValueOnce(new UpdateResult());

      const response = await request(app)
        .put("/api/group/" + groupData.id)
        .send(payload);

      expect(response.body).toEqual("Group updated");
      expect(response.status).toEqual(200);
      expect(spy).toHaveBeenCalledWith(groupData.id, payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return 400 and message", async () => {
      const payload = generateGroupPayload();
      const groupData = generateGroupData(payload);
      const spy = jest
        .spyOn(GroupService, "updateGroup")
        .mockResolvedValueOnce(null);

      const response = await request(app)
        .put("/api/group/" + groupData.id)
        .send(payload);

      expect(response.body).toEqual("Check id group");
      expect(response.status).toEqual(400);
      expect(spy).toHaveBeenCalledWith(groupData.id, payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
};
