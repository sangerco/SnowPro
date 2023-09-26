import request from "supertest";
import createServer from "../../server";

const app = createServer();
const api = request(app);

describe("create fav mountain", () => {
  describe("post /api/favmountain", () => {
    it("creates a new fav mountain", async () => {
      const favMountainData = { user_id: "1", ski_area_slug: "ski-area-1" };
      const resp = await api.post(`/api/fav-mountain`).send(favMountainData);
      expect(resp.status).toEqual(201);
      expect(resp.body).toEqual({
        userId: "2",
        skiAreaSlug: "ski-area-1",
      });
    });
  });
});

describe("get favorite mountain", () => {
  describe("get /users/:username/fav-mountains", () => {
    it(`should get a user's favorite mountains`, async () => {
      const resp = await api.get(`/users/john_doe/fav-mountains`);
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({});
    });
  });
});

describe("get users who favorited a mountain", () => {
  describe("get /ski-areas/:slug/users-favorited-by", () => {
    it("should get all users who favorited a mountain", async () => {
      const resp = await api.get("/ski-areas/ski-area-1/users-favorited-by");
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual([
        {
          slug: "ski-area-1",
          userId: "1",
          username: "john_doe",
        },
        {
          slug: "ski-area-1",
          userId: "2",
          username: "jane_smith",
        },
      ]);
    });
  });
});

describe("delete a favorite mountain", () => {
  describe("delete /api/fav-mountain/:username/:slug", () => {
    it("should delete the favorite mountain", async () => {
      const resp = await api.delete("/api/fav-mountain/jane_smith/ski-area-1");
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({
        deleted: "Favorite jane_smith, ski-area-1",
      });
    });
  });
});
