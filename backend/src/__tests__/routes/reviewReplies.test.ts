import request from "supertest";
import { app } from "../../index";

let reviewReplyId: string;

describe("create review reply", () => {
  describe("post /api/reviews/:id/reply", () => {
    it("should create a new review reply", async () => {
      const newReviewReplyData = {
        userId: "44",
        reviewId: "review-3",
        body: "test reply to review",
        slug: "ski-area-3",
      };
      const resp = await request(app)
        .post(`/api/reviews/review-3/reply`)
        .send(newReviewReplyData);
      reviewReplyId = resp.body.reply.id;
      expect(resp.status).toEqual(201);
      expect(resp.body).toEqual({
        reply: {
          id: expect.any(String),
          reviewId: "review-3",
          userId: "44",
          username: "susan_brown",
          slug: "ski-area-3",
          body: "test reply to review",
          createdAt: expect.any(String),
        },
      });
    });
  });
});

describe("get review replies", () => {
  describe("get /ski-areas/reviews/replies/:id", () => {
    it("should retrieve a review reply by id", async () => {
      const resp = await request(app).get(
        `/ski-areas/reviews/replies/${reviewReplyId}`
      );
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        reply: {
          id: expect.any(String),
          reviewId: "review-3",
          userId: "44",
          username: "susan_brown",
          slug: "ski-area-3",
          body: "test reply to review",
          createdAt: expect.any(String),
        },
      });
    });
  });
  describe("get /ski-areas/reviews/:id/replies", () => {
    it("should retrieve replies by review id", async () => {
      const resp = await request(app).get(
        "/ski-areas/reviews/review-1/replies"
      );
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        reviewReplies: [
          {
            id: "review-reply-1",
            reviewId: "review-1",
            userId: "22",
            username: "jane_smith",
            slug: "ski-area-1",
            body: "Glad you had a great time!",
            createdAt: expect.any(String),
          },
        ],
      });
    });
  });
});

describe("update a review reply", () => {
  describe("patch /api/reviews/reply/:id", () => {
    it("should update a review reply by id", async () => {
      const updateReviewReplyData = {
        body: "update test review reply data",
      };
      const resp = await request(app)
        .patch(`/api/reviews/reply/${reviewReplyId}`)
        .send(updateReviewReplyData);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        reply: {
          id: expect.any(String),
          reviewId: "review-3",
          userId: "44",
          slug: "ski-area-3",
          body: "update test review reply data",
          createdAt: expect.any(String),
        },
      });
    });
  });
});

describe("remove a reply to a review", () => {
  describe("delete /api/reviews/reply/:id", () => {
    it("should delete a review reply", async () => {
      const resp = await request(app).delete(
        `/api/reviews/reply/${reviewReplyId}`
      );
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        deleted: `reply: ${reviewReplyId}`,
      });
    });
  });
});
