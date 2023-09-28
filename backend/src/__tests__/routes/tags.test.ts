import request from "supertest";
import { app } from "../../index";

let tagId: string;

describe("create tag", () => {
  describe("post /api/tags", () => {
    it("should create a tag", async () => {
      const newTagData = {
        tag: "test tag",
      };
      const resp = await request(app).post("/api/tags").send(newTagData);
      tagId = resp.body.result.id;
      expect(resp.status).toEqual(201);
      expect(resp.body).toEqual({
        result: {
          id: expect.any(String),
          tag: "test tag",
        },
      });
    });
  });
});

describe("get tags", () => {
  describe("get /tags", () => {
    it("should get all tags", async () => {
      const resp = await request(app).get("/tags");
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        tags: [
          {
            id: "tag-1",
            tag: "Adventure",
          },
          {
            id: "tag-2",
            tag: "Family-Friendly",
          },
          {
            id: "tag-3",
            tag: "Scenic Views",
          },
          {
            id: "tag-4",
            tag: "Snowboarding",
          },
          {
            id: expect.any(String),
            tag: "test tag",
          },
        ],
      });
    });
  });

  describe("get /tags/:id", () => {
    it("should get a tag by id", async () => {
      const resp = await request(app).get("/tags/tag-3");
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        tag: {
          tagId: "tag-3",
          tag: "Scenic Views",
        },
      });
    });
  });

  describe("get /tags/:id/assoc-items", () => {
    it("should get all items associated with a given tag", async () => {
      const resp = await request(app).get("/tags/tag-1/assoc-items");
      console.log(resp.body);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        tag: {
          tagId: "tag-1",
          tag: "Adventure",
          photoIds: [],
          photoLinks: [],
          reviewIds: ["review-1"],
          videoIds: [],
          videoLinks: [],
        },
      });
    });
  });
});

describe("remove tag", () => {
  describe("delete /api/tags/:id", () => {
    it("should delete a tag", async () => {
      const resp = await request(app).delete(`/api/tags/${tagId}`);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({ deleted: `Tag deleted: ${tagId}` });
    });
  });
});
