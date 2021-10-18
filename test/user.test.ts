import { Request, Response, NextFunction } from "express";
import request from "supertest";

import { authMiddleware, morganMiddleware } from "../src/middlewares";
import { app } from "../src/app";
import { UserService } from "../src/services";
import {
  generateUserData,
  generateUserPayload,
  generateUsersData,
} from "../src/utils/generate";

jest.mock("../src/middlewares/auth.middleware.ts");
jest.mock("../src/middlewares/morgan.middleware.ts");

describe("UserController", () => {
  beforeEach(() => {
    (authMiddleware as jest.Mock).mockImplementation(
      (req: Request, res: Response, next: NextFunction) =>
        new Promise(() => next())
    );
  });

  beforeEach(() => {
    (morganMiddleware as jest.Mock).mockImplementation(
      (req: Request, res: Response, next: NextFunction) =>
        new Promise(() => next())
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("GET /api/user/ - getAll", () => {
    test("should return status 200 and user list", async () => {
      const usersData = generateUsersData(2);
      const spy = jest
        .spyOn(UserService, "getAutoSuggestUsers")
        .mockResolvedValueOnce(usersData);
      const response = await request(app).get("/api/user/");

      expect(response.body).toEqual(usersData);
      expect(response.status).toEqual(200);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 404 and message", async () => {
      const spy = jest
        .spyOn(UserService, "getAutoSuggestUsers")
        .mockResolvedValueOnce([]);
      const response = await request(app).get("/api/user/");

      expect(response.body).toEqual("Users not found");
      expect(response.status).toEqual(404);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 500 and message", async () => {
      const spy = jest.spyOn(UserService, "getAutoSuggestUsers");
      const response = await request(app).get("/api/user/");

      expect(response.status).toEqual(500);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

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

  describe("GET /api/user/:id - getById", () => {
    test("should return user from the database", async () => {
      const userData = generateUserData();
      const spy = jest
        .spyOn(UserService, "getUserById")
        .mockResolvedValueOnce(userData);

      const response = await request(app)
        .get("/api/user/" + userData.id)
        .send(userData.id);

      expect(response.body).toEqual(userData);
      expect(response.body.id).toBe(userData.id);
      expect(spy).toHaveBeenCalledWith(userData.id);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return 404 - user not found", async () => {
      const userData = generateUserData();
      const spy = jest
        .spyOn(UserService, "getUserById")
        .mockResolvedValueOnce(null);

      const response = await request(app)
        .get("/api/user/" + userData.id)
        .send(userData.id);

      expect(response.body).toEqual("User not found");
      expect(response.status).toEqual(404);
      expect(spy).toHaveBeenCalledWith(userData.id);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return 400 - bad request", async () => {
      const userData = generateUserData({ isDeleted: true });
      const spy = jest
        .spyOn(UserService, "getUserById")
        .mockResolvedValueOnce(userData);

      const response = await request(app)
        .get("/api/user/" + userData.id)
        .send(userData.id);

      expect(response.body).toEqual("User deleted, please try another request");
      expect(response.status).toEqual(400);
      expect(spy).toHaveBeenCalledWith(userData.id);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test("should return status 500 and message", async () => {
      const userData = generateUserData();

      const response = await request(app).get("/api/user/").send(userData.id);

      expect(response.status).toEqual(500);
    });
  });

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
});
