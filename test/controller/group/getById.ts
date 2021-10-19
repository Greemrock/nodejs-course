import request from "supertest";

import { app } from "../../../src/app";
import { GroupService } from "../../../src/services";
import { generateGroupData } from "../../../src/utils";

export const getByIdGroupTest = () => {
  describe("GET /api/group/:id - getById", () => {
    test("should return group from the database", async () => {
      const groupData = generateGroupData();
      const spy = jest
        .spyOn(GroupService, "getGroupById")
        .mockResolvedValueOnce(groupData);

      const response = await request(app)
        .get("/api/group/" + groupData.id)
        .send(groupData.id);

      expect(response.body).toEqual(groupData);
      expect(response.body.id).toBe(groupData.id);
      expect(spy).toHaveBeenCalledWith(groupData.id);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return 404 - group not found", async () => {
      const groupData = generateGroupData();
      const spy = jest
        .spyOn(GroupService, "getGroupById")
        .mockResolvedValueOnce(null);

      const response = await request(app)
        .get("/api/group/" + groupData.id)
        .send(groupData.id);

      expect(response.body).toEqual("Group not found");
      expect(response.status).toEqual(404);
      expect(spy).toHaveBeenCalledWith(groupData.id);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
};
