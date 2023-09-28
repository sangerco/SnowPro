import db from "../../db";
import FavMountain from "../../models/favMountain";

describe("create new favorite mountain", () => {
  const newFavMountain = {
    user_id: "11",
    ski_area_slug: "ski-area-2",
  };

  it("should create a new favorite mountain", async () => {
    const favMountain = await FavMountain.createFavMountain(
      newFavMountain.user_id,
      newFavMountain.ski_area_slug
    );
    expect(favMountain).toEqual({
      userId: "11",
      skiAreaSlug: "ski-area-2",
    });
  });
});

describe("Find favorite mountains", () => {
  it("should find favorite mountains by username", async () => {
    const favMountains = await FavMountain.fetchFavMountainDataByUsername(
      "jane_smith"
    );
    expect(favMountains).toEqual([
      {
        skiAreaName: "Hilltop Ski Resort",
        skiAreaSlug: "ski-area-2",
        username: "jane_smith",
      },
    ]);
  });

  it("should find favorite mountains by ski area slug", async () => {
    const favMountains = await FavMountain.fetchFavMountainDataBySkiAreaSlug(
      "ski-area-3"
    );
    expect(favMountains).toEqual([
      { skiAreaSlug: "ski-area-3", userId: "33", username: "mike_jones" },
    ]);
  });
});

describe("delete favorite mountains", () => {
  it("should delete a favorite mountain", async () => {
    const favMountainData = {
      username: "john_doe",
      ski_area_slug: "ski-area-2",
    };
    await FavMountain.remove(
      favMountainData.username,
      favMountainData.ski_area_slug
    );
    const result = await db.query(
      `SELECT * FROM fav_mountains WHERE user_id = '11' and ski_area_slug = 'ski-area-2'`
    );
    expect(result.rows.length).toEqual(0);
  });
});
