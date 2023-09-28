import request from "supertest";
import { app } from "../../index";

describe("create fav mountain", () => {
  describe("post /api/favmountain", () => {
    it("creates a new fav mountain", async () => {
      const favMountainData = { user_id: "33", ski_area_slug: "ski-area-1" };
      const resp = await request(app)
        .post(`/api/fav-mountain`)
        .send(favMountainData);
      expect(resp.status).toEqual(201);
      expect(resp.body).toEqual({
        favMountain: {
          userId: "33",
          skiAreaSlug: "ski-area-1",
        },
      });
    });
  });
});

describe("get favorite mountain", () => {
  describe("get /users/:username/fav-mountains", () => {
    it(`should get a user's favorite mountains`, async () => {
      const resp = await request(app).get(`/users/john_doe/fav-mountains`);
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({
        favMountains: [
          {
            skiAreaName: "Mountain Resort 1",
            skiAreaSlug: "ski-area-1",
            username: "john_doe",
          },
        ],
      });
    });
  });
});

describe("get users who favorited a mountain", () => {
  describe("get /ski-areas/:slug/users-favorited-by", () => {
    it("should get all users who favorited a mountain", async () => {
      const resp = await request(app).get(
        "/ski-areas/ski-area-1/users-favorited-by"
      );
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({
        favMountains: [
          {
            skiAreaSlug: "ski-area-1",
            userId: "11",
            username: "john_doe",
          },
          {
            skiAreaSlug: "ski-area-1",
            userId: "33",
            username: "mike_jones",
          },
        ],
      });
    });
  });
});

describe("delete a favorite mountain", () => {
  describe("delete /api/fav-mountain/:username/:slug", () => {
    it("should delete the favorite mountain", async () => {
      const resp = await request(app).delete(
        "/api/fav-mountain/mike_jones/ski-area-1"
      );
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({
        deleted: "Favorite",
      });
    });
  });
});
