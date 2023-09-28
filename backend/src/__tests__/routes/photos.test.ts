import request from "supertest";
import { app } from "../../index";

let photoId: string;

describe("create new photo", () => {
  describe("post /api/photos", () => {
    it("should create a new photo", async () => {
      const newPhotoData = {
        userId: "33",
        link: "https://www.fakelink.com/fake-image2.jpg",
        about: "photo about test",
      };
      const resp = await request(app).post(`/api/photos`).send(newPhotoData);
      photoId = resp.body.photo.id;
      expect(resp.status).toEqual(201);
      expect(resp.body).toEqual({
        photo: {
          id: expect.any(String),
          userId: "33",
          link: "https://www.fakelink.com/fake-image2.jpg",
          about: "photo about test",
          createdAt: expect.any(String),
        },
      });
    });
  });
});

describe("get photos", () => {
  describe("get /photo/:id", () => {
    it("should retrieve a photo by id", async () => {
      const resp = await request(app).get("/photo/photo-1");
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        photo: {
          id: "photo-1",
          userId: "11",
          link: "https://example.com/photo1.jpg",
          about: "Skiing at Mountain Resort 1",
          createdAt: expect.any(String),
          username: "john_doe",
        },
      });
    });
  });

  describe("get /users/:username/photos", () => {
    it(`it should retrieve a user's photos`, async () => {
      const resp = await request(app).get(`/users/mike_jones/photos`);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        photos: [
          {
            userId: "33",
            username: "mike_jones",
            id: "photo-3",
            link: "https://example.com/photo3.jpg",
            about: "Snowy Peaks Resort adventure",
            createdAt: expect.any(String),
          },
          {
            userId: "33",
            username: "mike_jones",
            id: expect.any(String),
            link: "https://www.fakelink.com/fake-image2.jpg",
            about: "photo about test",
            createdAt: expect.any(String),
          },
        ],
      });
    });
  });
});

describe("edit photo", () => {
  describe("patch /api/photo/:id", () => {
    it(`should edit a user's photo`, async () => {
      const editPhotoData = {
        link: "https://www.testedit.com/test-image.jpg",
        about: "test edit photo about",
      };
      const resp = await request(app)
        .patch(`/api/photo/${photoId}`)
        .send(editPhotoData);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({
        photo: {
          id: expect.any(String),
          userId: "33",
          link: "https://www.testedit.com/test-image.jpg",
          about: "test edit photo about",
          createdAt: expect.any(String),
        },
      });
    });
  });
});

describe("delete photos", () => {
  describe("delete /api/photo/:id", () => {
    it("should remove a photo by id", async () => {
      const resp = await request(app).delete(`/api/photo/${photoId}`);
      expect(resp.status).toEqual(200);
      expect(resp.body).toEqual({ deleted: `Photo removed ${photoId}` });
    });
  });
});
