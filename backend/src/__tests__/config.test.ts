import { describe, expect, test } from "@jest/globals";
import {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseURI,
} from "../config";

describe("config can come from env", function () {
  test("works", function () {
    process.env.SECRET_KEY = "this-is-my-secret-key";
    process.env.PORT = "5000";
    process.env.DATABASE_URL = "other";
    process.env.NODE_ENV = "other";

    expect(SECRET_KEY).toEqual("this-is-my-secret-key");
    expect(PORT).toEqual(5000);
    expect(getDatabaseURI()).toEqual("other");
    expect(BCRYPT_WORK_FACTOR).toEqual(1);

    delete process.env.SECRET_KEY;
    delete process.env.PORT;
    delete process.env.BCRYPT_WORK_FACTOR;
    delete process.env.DATABASE_URL;

    expect(getDatabaseURI()).toEqual("postgresql:///snowpro");
    process.env.NODE_ENV = "test";

    expect(getDatabaseURI()).toEqual("postgresql:///snowpro_test");
  });
});
