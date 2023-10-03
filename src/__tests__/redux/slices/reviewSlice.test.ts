import { store } from "../../../redux/store";
import {
  createReview,
  fetchReview,
  fetchAllReviews,
  fetchReviewsBySkiArea,
  updateReview,
  deleteReview,
} from "../../../redux/slices/reviewSlice";
import { createUser } from "../../../redux/slices/authSlice";
import { deleteUser } from "../../../redux/slices/userSlice";
import { deletePhoto } from "../../../redux/slices/mediaSlices";

const testUser = {
  username: "testuser",
  password: "password",
  firstName: "Test",
  lastName: "User",
  email: "test@user.com",
};

let testUserId: string | undefined;

beforeAll(async () => {
  await store.dispatch(createUser(testUser));
  testUserId = store.getState().auth.data!.id;
});

afterAll(async () => {
  await store.dispatch(deleteUser(testUser.username));
});

describe("test review slice", () => {
  let reviewId: string;
  let photoId: string;
  let photoId2: string;

  it("should create a review", async () => {
    const newReviewData = {
      userId: testUserId!,
      skiAreaSlug: "vail",
      header: "test review header",
      body: "test review body",
      stars: 5,
      photos: [
        "https://www.testlinks.com/image1.jpg",
        "https://www.testlinks.com/image2.jpg",
      ],
    };
    await store.dispatch(createReview(newReviewData));
    const review = store.getState().reviews.review;
    reviewId = review!.id;
    photoId = review!.photos[0];
    photoId2 = review!.photos[1];
    expect(review).toEqual({
      id: expect.any(String),
      userId: testUserId,
      skiAreaSlug: "vail",
      skiAreaName: "Vail",
      header: "test review header",
      body: "test review body",
      stars: 5,
      photos: [expect.any(String), expect.any(String)],
    });
  });
  it("should retrieve a review by id", async () => {
    await store.dispatch(fetchReview(reviewId));
    const review = store.getState().reviews.review;
    expect(review).toEqual({
      id: expect.any(String),
      userId: testUserId,
      username: "testuser",
      skiAreaSlug: "vail",
      skiAreaName: "Vail",
      header: "test review header",
      body: "test review body",
      stars: 5,
      photos: [expect.any(String), expect.any(String)],
      replies: [],
      createdAt: expect.any(String),
    });
  });
  it("should retrieve reviews by ski area slug", async () => {
    await store.dispatch(fetchReviewsBySkiArea("vail"));
    const reviews = store.getState().reviews.reviews;
    expect(reviews).toEqual([
      {
        id: expect.any(String),
        userId: testUserId,
        username: "testuser",
        skiAreaSlug: "vail",
        skiAreaName: "Vail",
        header: "test review header",
        body: "test review body",
        stars: 5,
        photos: null,
        createdAt: expect.any(String),
      },
    ]);
  });
  it("should retrieve all reviews", async () => {
    await store.dispatch(fetchAllReviews());
    const reviews = store.getState().reviews.reviews;
    expect(reviews).toEqual([
      expect.any(Object),
      expect.any(Object),
      expect.any(Object),
      expect.any(Object),
      expect.any(Object),
      expect.any(Object),
      expect.any(Object),
      expect.any(Object),
    ]);
  });
  it("should update a review", async () => {
    const updateReviewData = {
      id: reviewId,
      header: "updated review header",
      body: "updated review body",
      stars: 3,
    };
    await store.dispatch(updateReview(updateReviewData));
    const review = store.getState().reviews.review;
    expect(review).toEqual({
      id: reviewId,
      userId: testUserId,
      skiAreaSlug: "vail",
      header: "updated review header",
      body: "updated review body",
      stars: 3,
      photos: [expect.any(String), expect.any(String)],
      createdAt: expect.any(String),
    });
  });
  it("should delete a review", async () => {
    await store.dispatch(deleteReview(reviewId));
    await store.dispatch(deletePhoto(photoId));
    await store.dispatch(deletePhoto(photoId2));
    const reviewState = store.getState().reviews.review;
    expect(reviewState).toBeNull();
  });
});
