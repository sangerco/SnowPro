import request from "supertest";
import { app } from "../../index";

describe("retrieve ski areas", () => {
  describe("get /ski-areas", () => {
    it("should return a list of ski areas", async () => {
      const resp = await request(app).get("/ski-areas");
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual(expect.any(Array));
    });
  });

  describe("get /ski-areas/:slug", () => {
    it("it retrieve a ski area by its slug", async () => {
      const resp = await request(app).get("/ski-areas/vail");
      console.log(resp.body);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        country: "US",
        href: "https://www.vail.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx",
        lifts: expect.any(Object),
        location: {
          latitude: 39.605026,
          longitude: -106.356155,
        },
        name: "Vail",
        region: "CO",
        reviewData: [],
        slug: "vail",
        units: "imperial",
        usersFavoritedBy: [],
      });
    });
  });
});
