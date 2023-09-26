import supertest from "supertest";
import { createToken } from "../../helpers/tokens";
import createServer from "../../server";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config";

const app = createServer();

describe("test create token", () => {
  describe("given the correct data", () => {
    it("should return a non-admin token", () => {
      const token = createToken({ username: "test", isAdmin: false });
      const payload = jwt.verify(token, SECRET_KEY);
      expect(payload).toEqual({
        iat: expect.any(Number),
        isAdmin: false,
        username: "test",
      });
    });

    it("should return an admin token", () => {
      const token = createToken({ username: "adminTest", isAdmin: true });
      const payload = jwt.verify(token, SECRET_KEY);
      expect(payload).toEqual({
        iat: expect.any(Number),
        isAdmin: true,
        username: "adminTest",
      });
    });

    it("should return a non-admin token by default", () => {
      const token = createToken({ username: "noAdminTest" });
      const payload = jwt.verify(token, SECRET_KEY);
      expect(payload).toEqual({
        iat: expect.any(Number),
        isAdmin: false,
        username: "noAdminTest",
      });
    });
  });
});
