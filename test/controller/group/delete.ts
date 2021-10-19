import { DeleteResult } from "typeorm";
import request from "supertest";

import { app } from "../../../src/app";
import { GroupService } from "../../../src/services";
import { generateGroupData } from "../../../src/utils";

export const deleteGroupTest = () => {
  describe("DELETE /api/group/:id - remove", () => {
    test("should return status 200 and message", async () => {
      const groupData = generateGroupData();
      const spy = jest
        .spyOn(GroupService, "deleteGroup")
        .mockResolvedValueOnce(new DeleteResult());

      const response = await request(app)
        .delete("/api/group/" + groupData.id)
        .send(groupData.id);

      expect(response.status).toEqual(200);
      expect(response.body).toEqual("Group deleted");
      expect(spy).toHaveBeenCalledWith(groupData.id);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return 400 and message", async () => {
      const groupData = generateGroupData();
      const spy = jest
        .spyOn(GroupService, "deleteGroup")
        .mockResolvedValueOnce(null);

      const response = await request(app)
        .delete("/api/group/" + groupData.id)
        .send(groupData.id);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual("Check id group");
      expect(spy).toHaveBeenCalledWith(groupData.id);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
};
