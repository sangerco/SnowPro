import { describe, expect, test } from "@jest/globals";
import { sqlForPartialUpdate } from "../helpers/sql";

describe("test sqlForPartialUpdate", function () {
  test("update", function () {
    const result = sqlForPartialUpdate(
      { test: "test" },
      { test: "test1", test2: "test2" }
    );
    expect(result).toEqual({
      setCols: '"test1"=$1',
      values: ["test"],
    });
  });

  test("update with two items", function () {
    const result = sqlForPartialUpdate(
      { test: "test", test2: "test2" },
      { test2: "test2" }
    );
    expect(result).toEqual({
      setCols: '"test"=$1, "test2"=$2',
      values: ["test", "test2"],
    });
  });
});
