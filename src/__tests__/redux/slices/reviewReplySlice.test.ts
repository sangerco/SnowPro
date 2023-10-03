import { store } from "../../../redux/store";
import { createUser } from "../../../redux/slices/authSlice";
import { deleteUser } from "../../../redux/slices/userSlice";
import {
  createReviewReply,
  fetchReviewReply,
  fetchReviewRepliesByReviewId,
  updateReviewReply,
  deleteReviewReply,
} from "../../../redux/slices/reviewReplySlice";
import { createReview, deleteReview } from "../../../redux/slices/reviewSlice";

const testUser = {
  username: "testuser",
  password: "password",
  firstName: "Test",
  lastName: "User",
  email: "test@user.com",
};

let testUserId: string | undefined;
let reviewId: string | undefined;

beforeAll(async () => {
  await store.dispatch(createUser(testUser));
  testUserId = store.getState().auth.data!.id;

  const testReview = {
    userId: testUserId!,
    skiAreaSlug: "vail",
    header: "test review header",
    body: "test review body",
    stars: 5,
    photos: [],
  };

  await store.dispatch(createReview(testReview));
  reviewId = store.getState().reviews.review!.id;
});

afterAll(async () => {
  await store.dispatch(deleteReview(reviewId!));
  await store.dispatch(deleteUser(testUser.username));
});

describe("test review reply slice", () => {
  let reviewReplyId: string | undefined;
  it("should create a review reply", async () => {
    const newReviewReplyData = {
      reviewId: reviewId!,
      userId: testUserId!,
      username: "testuser",
      body: "test review reply body",
      slug: "vail",
    };
    console.log(newReviewReplyData.userId);
    console.log(newReviewReplyData.reviewId);
    await store.dispatch(createReviewReply(newReviewReplyData));
    const reviewReply = store.getState().reviewReplies.reviewReply;
    reviewReplyId = reviewReply!.id;
    expect(reviewReply).toEqual({
      id: expect.any(String),
      reviewId: reviewId,
      userId: testUserId,
      username: "testuser",
      slug: "vail",
      body: "test review reply body",
      createdAt: expect.any(String),
    });
  });
  it("should retrieve review reply by id", async () => {
    await store.dispatch(fetchReviewReply(reviewReplyId!));
    const reviewReply = store.getState().reviewReplies.reviewReply;
    expect(reviewReply).toEqual({
      id: reviewReplyId,
      reviewId: reviewId,
      userId: testUserId,
      username: "testuser",
      slug: "vail",
      body: "test review reply body",
      createdAt: expect.any(String),
    });
  });
  it("should retrieve replies by review id", async () => {
    await store.dispatch(fetchReviewRepliesByReviewId(reviewId!));
    const reviewReplies = store.getState().reviewReplies.reviewReplies;
    expect(reviewReplies).toEqual([
      {
        id: reviewReplyId,
        reviewId: reviewId,
        userId: testUserId,
        username: "testuser",
        slug: "vail",
        body: "test review reply body",
        createdAt: expect.any(String),
      },
    ]);
  });
  it("should update review reply", async () => {
    const updateReviewReplyData = {
      id: reviewReplyId!,
      body: "updated review reply body",
    };
    await store.dispatch(updateReviewReply(updateReviewReplyData));
    const reviewReply = store.getState().reviewReplies.reviewReply;
    expect(reviewReply).toEqual({
      id: reviewReplyId,
      reviewId: reviewId,
      userId: testUserId,
      slug: "vail",
      body: "updated review reply body",
      createdAt: expect.any(String),
    });
  });
  it("should delete review reply", async () => {
    await store.dispatch(deleteReviewReply(reviewReplyId!));
    expect(store.getState().reviewReplies.reviewReply).toBeNull();
  });
});
