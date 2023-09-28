import Review from "../../models/review";

let reviewId: string;

describe("create review", () => {
  const newReview = {
    username: "susan_brown",
    userId: "44",
    skiAreaSlug: "ski-area-2",
    header: "test review",
    body: "test review body",
    stars: 3,
    photos: [
      "https://fakelink.com/fake1.jpg",
      "https://fakelink.com/fake2.jpg",
    ],
  };

  it("should create a new review", async () => {
    const review = await Review.createReview(
      newReview.userId,
      newReview.username,
      newReview.skiAreaSlug,
      newReview.header,
      newReview.body,
      newReview.stars,
      newReview.photos
    );
    reviewId = review.id;
    expect(review).toEqual({
      id: expect.any(String),
      username: "susan_brown",
      userId: "44",
      skiAreaSlug: "ski-area-2",
      skiAreaName: "Hilltop Ski Resort",
      header: "test review",
      body: "test review body",
      stars: 3,
      photos: [expect.any(String), expect.any(String)],
    });
  });
});

describe("update review", () => {
  it("should update a review", async () => {
    const updateData = {
      id: reviewId,
      userId: "44",
      header: "updated header",
      body: "updated body",
    };

    const review = await Review.updateReview(updateData.id, updateData);
    expect(review).toEqual({
      id: expect.any(String),
      userId: "44",
      skiAreaSlug: "ski-area-2",
      header: "updated header",
      body: "updated body",
      stars: 3,
      photos: null,
      createdAt: expect.any(Date),
    });
  });
});

describe("delete review", () => {
  it("should remove a review", async () => {
    const review = await Review.removeReview(reviewId);
    expect(review).toBeUndefined();
  });
});

describe("get reviews", () => {
  it("should fetch reviews by ski area", async () => {
    const reviews = await Review.fetchReviewsBySkiArea("Mountain Resort 1");
    expect(reviews).toEqual([
      {
        id: "review-1",
        userId: "11",
        skiAreaSlug: "ski-area-1",
        header: "Amazing Experience",
        body: "Had a fantastic time at this resort!",
        stars: 5,
        link: null,
        username: "john_doe",
        skiAreaName: "Mountain Resort 1",
        createdAt: expect.any(Date),
      },
    ]);
  });

  it("should fetch reviews by review id", async () => {
    const review = await Review.fetchReviewById("review-3");
    expect(review).toEqual({
      id: "review-3",
      userId: "33",
      skiAreaSlug: "ski-area-3",
      header: "Incredible Views",
      body: "Scenic beauty everywhere!",
      stars: 5,
      photos: null,
      username: "mike_jones",
      skiAreaName: "Alpine Paradise",
      createdAt: expect.any(Date),
    });
  });

  it("should fetch all reviews", async () => {
    const reviews = await Review.getAllReviews();
    expect(reviews).toEqual([
      expect.any(Object),
      expect.any(Object),
      expect.any(Object),
      expect.any(Object),
    ]);
  });
});
