import Photo from "../../models/photo";

let photoId: string;
let photoLink: string;

describe("create new photo", () => {
  it("creates a photo", async () => {
    const newPhoto = {
      username: "john_doe",
      link: "https://www.fakelink.com/image.jpg",
      about: "test photo",
    };

    const photo = await Photo.createPhoto(
      newPhoto.username,
      newPhoto.link,
      newPhoto.about
    );
    photoId = photo.id;
    console.log(photoId);
    photoLink = photo.link;
    expect(photo).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      link: "https://www.fakelink.com/image.jpg",
      about: "test photo",
      createdAt: expect.any(Date),
    });
  });
});

describe("get photos", () => {
  it("retrieves photos by id", async () => {
    const photo = await Photo.getPhoto("photo-1");
    expect(photo).toEqual({
      id: "photo-1",
      userId: "11",
      link: "https://example.com/photo1.jpg",
      about: "test update",
      createdAt: expect.any(Date),
      username: "john_doe",
    });
  });

  it("retrieves photos by username", async () => {
    const photos = await Photo.getPhotosByUsername("john_doe");
    expect(photos).toEqual([
      {
        username: "john_doe",
        id: expect.any(String),
        userId: "11",
        link: "https://example.com/photo1.jpg",
        about: "test update",
        createdAt: expect.any(Date),
      },
      {
        username: "john_doe",
        id: expect.any(String),
        userId: "11",
        link: "https://www.fakelink.com/image.jpg",
        about: "test photo",
        createdAt: expect.any(Date),
      },
    ]);
  });
});

describe("update photos", () => {
  it("updates a photo", async () => {
    const updateData = {
      id: photoId,
      userId: "11",
      about: "test update data",
    };
    const photo = await Photo.updatePhoto(updateData.id, updateData);
    expect(photo).toEqual({
      id: photoId,
      userId: expect.any(String),
      link: "https://www.fakelink.com/image.jpg",
      about: "test update data",
      createdAt: expect.any(Date),
    });
  });
});

describe("delete photo", () => {
  it("deletes photo by id", async () => {
    const photo = await Photo.removePhoto(photoId);
    expect(photo).toBeUndefined();
  });
});
