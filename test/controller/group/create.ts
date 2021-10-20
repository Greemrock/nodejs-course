import request from "supertest";

import { app } from "../../../src/app";
import { GroupService } from "../../../src/services";
import { generateGroupPayload, generateGroupData } from "../../../src/utils";

export const createGroupTest = () => {
  describe("POST /api/group/ - create", () => {
    test("should return 400 and message ", async () => {
      const payload = generateGroupPayload();
      const spy = jest
        .spyOn(GroupService, "createGroup")
        .mockResolvedValueOnce(null);

      const response = await request(app).post("/api/group").send(payload);

      expect(response.body).toEqual(
        "Group already exists, please try another name"
      );
      expect(response.status).toEqual(400);
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return new group", async () => {
      const payload = generateGroupPayload();
      const groupData = generateGroupData(payload);
      const spy = jest
        .spyOn(GroupService, "createGroup")
        .mockResolvedValueOnce(groupData);

      const response = await request(app).post("/api/group").send(payload);

      expect(response.body).toEqual(groupData);
      expect(response.status).toEqual(201);
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 500 and message", async () => {
      const payload = generateGroupPayload();
      const spy = jest
        .spyOn(GroupService, "createGroup")
        .mockRejectedValueOnce(new Error("Internal error"));

      const response = await request(app)
        .post("/api/group")
        .send(payload)
        .expect(500);

      expect(response.body).toEqual("Internal error");
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
};
