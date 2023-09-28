import ReviewReply from "../../models/reviewReply";

let reviewReplyId: string;

describe("create review reply", () => {
  it("should create a new review reply", async () => {
    const reviewReplyData = {
      userId: "33",
      reviewId: "review-1",
      skiAreaSlug: "ski-area-3",
      body: "test review reply",
    };
    const reviewReply = await ReviewReply.replyToReview(
      reviewReplyData.userId,
      reviewReplyData.reviewId,
      reviewReplyData.body,
      reviewReplyData.skiAreaSlug
    );
    reviewReplyId = reviewReply.id;
    expect(reviewReply).toEqual({
      id: expect.any(String),
      userId: "33",
      username: "mike_jones",
      reviewId: "review-1",
      slug: "ski-area-3",
      body: "test review reply",
      createdAt: expect.any(Date),
    });
  });
});

describe("fetch review replies", () => {
  it("should fetch replies by review id", async () => {
    const replies = await ReviewReply.fetchRepliesByReviewId("review-2");
    expect(replies).toEqual([
      {
        id: expect.any(String),
        reviewId: "review-2",
        userId: "11",
        username: "john_doe",
        body: "Thanks for the recommendation!",
        slug: "ski-area-2",
        createdAt: expect.any(Date),
      },
    ]);
  });
  it("should fetch replies by reply id", async () => {
    const reply = await ReviewReply.fetchReplyId("review-reply-3");
    expect(reply).toEqual({
      id: "review-reply-3",
      reviewId: "review-3",
      userId: "44",
      username: "susan_brown",
      body: "Yes, the views are breathtaking!",
      slug: "ski-area-3",
      createdAt: expect.any(Date),
    });
  });
});

describe("update review reply", () => {
  it("should update a reply", async () => {
    const updateData = {
      id: reviewReplyId,
      userId: "33",
      body: "updated body",
    };
    const reply = await ReviewReply.replyToReviewUpdate(
      reviewReplyId,
      updateData
    );
    expect(reply).toEqual({
      id: expect.any(String),
      userId: "33",
      reviewId: "review-1",
      slug: "ski-area-3",
      body: "updated body",
      createdAt: expect.any(Date),
    });
  });
});

describe("remove review reply", () => {
  it("should delete a reply by id", async () => {
    const reply = await ReviewReply.removeReply(reviewReplyId);
    expect(reply).toBeUndefined();
  });
});
