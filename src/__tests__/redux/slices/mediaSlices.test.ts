import { store } from "../../../redux/store";
import {
  createPhoto,
  createVideo,
  fetchPhoto,
  fetchVideo,
  fetchPhotosByUsername,
  fetchVideosByUsername,
  updatePhoto,
  updateVideo,
  deletePhoto,
  deleteVideo,
} from "../../../redux/slices/mediaSlices";
import { createUser } from "../../../redux/slices/authSlice";
import { deleteUser } from "../../../redux/slices/userSlice";

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

describe("test photo slice", () => {
  let photoId: string;
  it("should create a photo", async () => {
    const newPhoto = {
      userId: testUserId!,
      link: "https://www.testlinks.com/photo1.jpg",
      about: "test about photo",
    };

    let photo = store.getState().media.photo;
    expect(photo).toBe(null);
    await store.dispatch(createPhoto(newPhoto));

    photo = store.getState().media.photo;
    photoId = photo!.id;
    expect(photo).toEqual({
      id: expect.any(String),
      userId: testUserId,
      link: "https://www.testlinks.com/photo1.jpg",
      about: "test about photo",
      createdAt: expect.any(String),
    });
  });

  it("should fetch a photo", async () => {
    await store.dispatch(fetchPhoto(photoId));
    const photo = store.getState().media.photo;
    expect(photo).toEqual({
      id: photoId,
      userId: testUserId,
      username: "testuser",
      link: "https://www.testlinks.com/photo1.jpg",
      about: "test about photo",
      createdAt: expect.any(String),
    });
  });
  it("should fetch photos by username", async () => {
    await store.dispatch(fetchPhotosByUsername(testUser.username));
    const photos = store.getState().media.photos;
    expect(photos).toEqual([
      {
        id: photoId,
        userId: testUserId,
        username: "testuser",
        link: "https://www.testlinks.com/photo1.jpg",
        about: "test about photo",
        createdAt: expect.any(String),
      },
    ]);
  });
  it("should update a photo", async () => {
    const updateData = {
      id: photoId,
      link: "https://www.testlinks.com/photo2.jpg",
      about: "updated about photo",
    };
    await store.dispatch(updatePhoto(updateData));
    const photo = store.getState().media.photo;
    expect(photo).toEqual({
      id: photoId,
      userId: testUserId,
      link: "https://www.testlinks.com/photo2.jpg",
      about: "updated about photo",
      createdAt: expect.any(String),
    });
  });
  it("should delete a photo", async () => {
    let photo = store.getState().media.photo;
    expect(photo).toEqual(expect.any(Object));

    await store.dispatch(deletePhoto(photoId));
    photo = store.getState().media.photo;
    expect(photo).toBeNull();
  });
});

describe("test video slice", () => {
  let videoId: string;
  it("should create a video", async () => {
    const newVideo = {
      userId: testUserId!,
      link: "https://www.testlinks.com/video1.mp4",
      about: "test about video",
    };

    let video = store.getState().media.video;
    expect(video).toBe(null);
    await store.dispatch(createVideo(newVideo));

    video = store.getState().media.video;
    videoId = video!.id;
    expect(video).toEqual({
      id: expect.any(String),
      userId: testUserId,
      link: "https://www.testlinks.com/video1.mp4",
      about: "test about video",
      createdAt: expect.any(String),
    });
  });

  it("should fetch a video", async () => {
    await store.dispatch(fetchVideo(videoId));
    const video = store.getState().media.video;
    expect(video).toEqual({
      id: videoId,
      userId: testUserId,
      username: "testuser",
      link: "https://www.testlinks.com/video1.mp4",
      about: "test about video",
      createdAt: expect.any(String),
    });
  });
  it("should fetch videos by username", async () => {
    await store.dispatch(fetchVideosByUsername(testUser.username));
    const videos = store.getState().media.videos;
    expect(videos).toEqual([
      {
        id: videoId,
        userId: testUserId,
        username: "testuser",
        link: "https://www.testlinks.com/video1.mp4",
        about: "test about video",
        createdAt: expect.any(String),
      },
    ]);
  });
  it("should update a video", async () => {
    const updateData = {
      id: videoId,
      link: "https://www.testlinks.com/video2.mp4",
      about: "updated about video",
    };
    await store.dispatch(updateVideo(updateData));
    const video = store.getState().media.video;
    expect(video).toEqual({
      id: videoId,
      userId: testUserId,
      link: "https://www.testlinks.com/video2.mp4",
      about: "updated about video",
      createdAt: expect.any(String),
    });
  });
  it("should delete a video", async () => {
    let video = store.getState().media.video;
    expect(video).toEqual(expect.any(Object));

    await store.dispatch(deleteVideo(videoId));
    console.log(store.getState().media);
    video = store.getState().media.video;
    expect(video).toBeNull();
  });
});
