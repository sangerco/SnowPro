import request from "supertest";
import { app } from "../../index";

let videoId: string;

describe("create new video", () => {
  describe("post /api/videos", () => {
    it("should create a new video", async () => {
      const newVideoData = {
        userId: "33",
        link: "https://www.fakelink.com/fake-video1.mp4",
        about: "video about test",
      };
      const resp = await request(app).post(`/api/videos`).send(newVideoData);
      videoId = resp.body.video.id;
      expect(resp.status).toEqual(201);
      expect(resp.body).toEqual({
        video: {
          id: expect.any(String),
          userId: "33",
          link: "https://www.fakelink.com/fake-video1.mp4",
          about: "video about test",
          createdAt: expect.any(String),
        },
      });
    });
  });
});

describe("get videos", () => {
  describe("get /video/:id", () => {
    it("should retrieve a video by id", async () => {
      const resp = await request(app).get("/video/video-1");
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        video: {
          id: "video-1",
          userId: "11",
          link: "https://youtube.com/video1",
          about: "Snowboarding adventure",
          createdAt: expect.any(String),
          username: "john_doe",
        },
      });
    });
  });

  describe("get /users/:username/videos", () => {
    it(`it should retrieve a user's videos`, async () => {
      const resp = await request(app).get(`/users/susan_brown/videos`);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        videos: [
          {
            userId: "44",
            username: "susan_brown",
            id: "video-4",
            link: "https://youtube.com/video4",
            about: "Alpine Paradise tour",
            createdAt: expect.any(String),
          },
        ],
      });
    });
  });
});

describe("edit video", () => {
  describe("patch /api/video/:id", () => {
    it(`should edit a user's photo`, async () => {
      const editVideoData = {
        link: "https://www.testedit.com/test-video.mp4",
        about: "test edit video about",
      };
      const resp = await request(app)
        .patch(`/api/video/${videoId}`)
        .send(editVideoData);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        video: {
          id: expect.any(String),
          userId: "33",
          link: "https://www.testedit.com/test-video.mp4",
          about: "test edit video about",
          createdAt: expect.any(String),
        },
      });
    });
  });
});

describe("delete videos", () => {
  describe("delete /api/video/:id", () => {
    it("should remove a video by id", async () => {
      const resp = await request(app).delete(`/api/video/${videoId}`);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({ deleted: `Video removed ${videoId}` });
    });
  });
});
