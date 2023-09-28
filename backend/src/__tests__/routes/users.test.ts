import request from "supertest";
import { app } from "../../index";

let username: string;

describe("create a user", () => {
  describe("post /api/new-user", () => {
    it("should create a new user", async () => {
      const newUserData = {
        username: "test_user",
        firstName: "Test",
        lastName: "User",
        password: "password",
        email: "test@user.com",
      };
      const resp = await request(app).post("/api/new-user").send(newUserData);
      username = resp.body.user.username;
      expect(resp.status).toEqual(201);
      expect(resp.body).toEqual({
        token: expect.any(String),
        user: {
          username: "test_user",
          firstName: "Test",
          lastName: "User",
          email: "test@user.com",
        },
      });
    });
  });
});

describe("login a user", () => {
  describe("post /login", () => {
    it("should log a user in and return a token", async () => {
      const loginData = {
        username: username,
        password: "password",
      };
      const resp = await request(app).post("/login").send(loginData);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        token: expect.any(String),
        user: {
          id: expect.any(String),
          username: "test_user",
          firstName: "Test",
          lastName: "User",
          email: "test@user.com",
        },
      });
    });
  });
});

describe("retrieve users", () => {
  describe("get /users/all-users", () => {
    it(`should return all users' data`, async () => {
      const resp = await request(app).get(`/users/all-users`);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        users: [
          expect.any(Object),
          expect.any(Object),
          expect.any(Object),
          expect.any(Object),
          expect.any(Object),
        ],
      });
    });
  });

  describe("get /users/:username", () => {
    it(`should return a user's information`, async () => {
      const resp = await request(app).get(`/users/${username}`);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        user: {
          id: expect.any(String),
          username: "test_user",
          firstName: "Test",
          lastName: "User",
          email: "test@user.com",
          bio: null,
          avatar: null,
          photos: [],
          videos: [],
          favMountains: [],
          isAdmin: null,
        },
      });
    });
  });
});

describe("update user", () => {
  describe("patch /api/admin/:username", () => {
    it("should make a user an admin", async () => {
      const adminData = { isAdmin: true };
      const resp = await request(app)
        .patch(`/api/admin/${username}`)
        .send(adminData);
      console.log(resp.body);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({ "Made admin": "test_user" });
    });
  });

  describe("patch /api/users/:username", () => {
    it("should update a user", async () => {
      const updateUserData = {
        bio: "test bio for test user",
        avatar: "https://www.testdata.com/avatar.jpg",
        email: "update@testuser.com",
      };
      const resp = await request(app)
        .patch(`/api/users/${username}`)
        .send(updateUserData);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        user: {
          username: "test_user",
          firstName: "Test",
          lastName: "User",
          email: "update@testuser.com",
          bio: "test bio for test user",
          avatar: "https://www.testdata.com/avatar.jpg",
          isAdmin: "true",
        },
      });
    });
  });
});

describe("remove a user", () => {
  describe("delete /api/users/:username", () => {
    it("should delete a user", async () => {
      const resp = await request(app).delete(`/api/users/${username}`);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({ deleted: `${username}` });
    });
  });
});
