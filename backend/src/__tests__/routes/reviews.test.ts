import request from "supertest";
import { app } from "../../index";

let reviewId: string;

describe("create new review", () => {
  describe("post /api/ski-areas/:slug/review", () => {
    it("should create a new review", async () => {
      const newReviewData = {
        userId: "11",
        username: "john_doe",
        skiAreaSlug: "ski-area-3",
        header: "test review",
        body: "test review body",
        stars: 5,
        photos: [
          "https://www.testphotos.com/photo1.jpg",
          "https://www.testphotos.com/photo2.jpg",
        ],
      };
      const resp = await request(app)
        .post(`/api/ski-areas/ski-area-3/review`)
        .send(newReviewData);
      reviewId = resp.body.review.id;
      expect(resp.status).toEqual(201);
      expect(resp.body).toEqual({
        review: {
          id: expect.any(String),
          userId: "11",
          username: "john_doe",
          skiAreaSlug: "ski-area-3",
          skiAreaName: "Alpine Paradise",
          header: "test review",
          body: "test review body",
          stars: 5,
          photos: [expect.any(String), expect.any(String)],
        },
      });
    });
  });
});

describe("get reviews", () => {
  describe("get /ski-areas/reviews", () => {
    it("should fetch all reviews", async () => {
      const resp = await request(app).get(`/ski-areas/reviews`);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        reviews: [
          expect.any(Object),
          expect.any(Object),
          expect.any(Object),
          expect.any(Object),
          expect.any(Object),
        ],
      });
    });
  });

  describe("get /ski-areas/:slug/reviews", () => {
    it("should get reviews by ski area", async () => {
      const resp = await request(app).get("/ski-areas/ski-area-1/reviews");
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        reviews: [
          {
            id: expect.any(String),
            userId: "11",
            username: "john_doe",
            skiAreaSlug: "ski-area-1",
            skiAreaName: "Mountain Resort 1",
            header: "Amazing Experience",
            body: "Had a fantastic time at this resort!",
            stars: 5,
            photos: null,
            createdAt: expect.any(String),
          },
        ],
      });
    });
  });

  describe("get /ski-areas/reviews/:id", () => {
    it("should retrieve a review by id", async () => {
      const resp = await request(app).get(`/ski-areas/reviews/review-2`);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        review: {
          id: "review-2",
          userId: "22",
          username: "jane_smith",
          skiAreaSlug: "ski-area-2",
          skiAreaName: "Hilltop Ski Resort",
          header: "Great Skiing Spot",
          body: "The skiing trails are excellent here.",
          stars: 4,
          photos: null,
          createdAt: expect.any(String),
        },
        replies: [
          {
            reviewId: "review-2",
            id: expect.any(String),
            userId: "11",
            username: "john_doe",
            slug: "ski-area-2",
            body: "Thanks for the recommendation!",
            createdAt: expect.any(String),
          },
        ],
      });
    });
  });
});

describe("update review", () => {
  describe("patch /api/reviews/:id", () => {
    it("should update a review", async () => {
      const updateReviewData = {
        header: "update test review",
        body: "update test review body",
        stars: 3,
        photos: [
          "https://www.testphotos.com/photo1.jpg",
          "https://www.testphotos.com/photo2.jpg",
          "https://www.testphotos.com/photo3.jpg",
        ],
      };
      const resp = await request(app)
        .patch(`/api/reviews/${reviewId}`)
        .send(updateReviewData);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        review: {
          id: expect.any(String),
          userId: "11",
          skiAreaSlug: "ski-area-3",
          header: "update test review",
          body: "update test review body",
          stars: 3,
          photos: [expect.any(String), expect.any(String), expect.any(String)],
          createdAt: expect.any(String),
        },
      });
    });
  });
});

describe("remove review", () => {
  describe("delete /api/reviews/:id", () => {
    it("should delete a review", async () => {
      const resp = await request(app).delete(`/api/reviews/${reviewId}`);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({ deleted: `review ${reviewId}` });
    });
  });
});
