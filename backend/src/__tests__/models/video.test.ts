import Video from "../../models/video";

let videoId: string;
let videoLink: string;

describe("create new video", () => {
  it("creates a video", async () => {
    const newVideo = {
      userId: "1",
      link: "https://www.fakelink.com/video.mp4",
      about: "test video",
    };

    const video = await Video.createVideo(
      newVideo.userId,
      newVideo.link,
      newVideo.about
    );
    videoId = video.id;
    console.log(videoId);
    videoLink = video.link;
    expect(video).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      link: "https://www.fakelink.com/video.mp4",
      about: "test video",
      createdAt: expect.any(Date),
    });
  });
});

describe("get videos", () => {
  it("retrieves videos by id", async () => {
    const video = await Video.getVideo("video-1");
    expect(video).toEqual({
      id: "video-1",
      userId: "1",
      link: "https://youtube.com/video1",
      about: "Snowboarding adventure",
      createdAt: expect.any(Date),
      username: "john_doe",
    });
  });

  it("retrieves videos by username", async () => {
    const videos = await Video.getVideosByUsername("john_doe");
    expect(videos).toEqual([
      {
        username: "john_doe",
        id: expect.any(String),
        userId: "1",
        link: "https://youtube.com/video1",
        about: "Snowboarding adventure",
        createdAt: expect.any(Date),
      },
      {
        username: "john_doe",
        id: expect.any(String),
        userId: "1",
        link: "https://www.fakelink.com/video.mp4",
        about: "test video",
        createdAt: expect.any(Date),
      },
    ]);
  });
});

describe("update videos", () => {
  it("updates a video", async () => {
    const updateData = {
      id: videoId,
      userId: "1",
      about: "test update data",
    };
    const video = await Video.updateVideo(updateData.id, updateData);
    expect(video).toEqual({
      id: videoId,
      userId: expect.any(String),
      link: "https://www.fakelink.com/video.mp4",
      about: "test update data",
      createdAt: expect.any(Date),
    });
  });
});

describe("delete video", () => {
  it("deletes video by id", async () => {
    const video = await Video.removeVideo(videoId);
    expect(video).toBeUndefined();
  });
});
