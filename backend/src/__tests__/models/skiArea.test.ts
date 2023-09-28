import SkiArea from "../../models/skiArea";

describe("users favorited by", () => {
  it("should return users who favorited a ski area", async () => {
    const favoritedUsers = await SkiArea.returnUsersFavoritedBy("ski-area-1");
    expect(favoritedUsers).toEqual([
      {
        slug: "ski-area-1",
        userId: "11",
        username: "john_doe",
      },
    ]);
  });
});

describe("get reviews by ski area slug", () => {
  it("should return reviews by ski area slug", async () => {
    const reviews = await SkiArea.fetchReviewsBySkiAreaSlug("ski-area-2");
    expect(reviews).toEqual([
      {
        id: "review-2",
        userId: "22",
        skiAreaSlug: "ski-area-2",
        header: "Great Skiing Spot",
        body: "The skiing trails are excellent here.",
        stars: 4,
        photos: null,
        createdAt: expect.any(Date),
        username: "jane_smith",
        skiAreaName: "Hilltop Ski Resort",
      },
    ]);
  });
});
