import request from "supertest";

import { app } from "../../../src/app";
import { GroupService } from "../../../src/services";
import { generateGroupsData } from "../../../src/utils";

export const getAllGroupTest = () => {
  describe("GET /api/group/ - getAll", () => {
    test("should return status 200 and user list", async () => {
      const groupData = generateGroupsData(2);
      const spy = jest
        .spyOn(GroupService, "getGroupAll")
        .mockResolvedValueOnce(groupData);

      const response = await request(app).get("/api/group/");

      expect(response.body).toEqual(groupData);
      expect(response.status).toEqual(200);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 404 and message", async () => {
      const spy = jest
        .spyOn(GroupService, "getGroupAll")
        .mockResolvedValueOnce([]);

      const response = await request(app).get("/api/group/");

      expect(response.body).toEqual("Groups not found");
      expect(response.status).toEqual(404);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 500 and message", async () => {
      const spy = jest
        .spyOn(GroupService, "getGroupAll")
        .mockRejectedValueOnce(new Error("Internal error"));

      const response = await request(app).get("/api/group/").expect(500);

      expect(response.body).toEqual("Internal error");
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
};
