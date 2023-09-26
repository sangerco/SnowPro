import jwt from "jsonwebtoken";
import { authenticateJWT } from "../../middleware/auth";
import { SECRET_KEY } from "../../config";

const testJwt = jwt.sign({ username: "test", isAdmin: false }, SECRET_KEY);
const wrongJwt = jwt.sign(
  { username: "test", isAdmin: false },
  "this_is_the_wrong_key"
);
const adminJwt = jwt.sign({ username: "test", isAdmin: true }, SECRET_KEY);

describe("test authenticateJWT", () => {
  describe("test via header", () => {
    it("returns the correct data if given the correct header data", () => {
      expect.assertions(2);
      const req = { headers: { authorization: `Bearer ${testJwt}` } };
      const res = { locals: {} };
      const next = (err: any) => {
        expect(err).toBeFalsy();
      };
      // @ts-ignore
      authenticateJWT(req, res, next);
      expect(res.locals).toEqual({
        user: {
          iat: expect.any(Number),
          username: "test",
          isAdmin: false,
        },
      });
    });

    it("returns the admin data if given the correct header data", () => {
      expect.assertions(2);
      const req = { headers: { authorization: `Bearer ${adminJwt}` } };
      const res = { locals: {} };
      const next = (err: any) => {
        expect(err).toBeFalsy();
      };
      // @ts-ignore
      authenticateJWT(req, res, next);
      expect(res.locals).toEqual({
        user: {
          iat: expect.any(Number),
          username: "test",
          isAdmin: true,
        },
      });
    });

    it("returns no data if given no header", () => {
      expect.assertions(2);
      const req = {};
      const res = { locals: {} };
      const next = (err: any) => {
        expect(err).toBeFalsy();
      };
      // @ts-ignore
      authenticateJWT(req, res, next);
      expect(res.locals).toEqual({});
    });

    it("returns no data when given a bad jwt", () => {
      expect.assertions(2);
      const req = { headers: { authorization: `Bearer ${wrongJwt}` } };
      const res = { locals: {} };
      const next = (err: any) => {
        expect(err).toBeFalsy();
      };
      // @ts-ignore
      authenticateJWT(req, res, next);
      expect(res.locals).toEqual({});
    });
  });
});
