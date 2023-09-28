import User from "../../models/user";

const username = "test_user";
const password = "test_password";

describe("create user", () => {
  it("should create a new user", async () => {
    const newUser = {
      username: username,
      password: password,
      firstName: "test",
      lastName: "user",
      email: "test@user.com",
    };
    const user = await User.register(
      newUser.username,
      newUser.password,
      newUser.firstName,
      newUser.lastName,
      newUser.email
    );
    expect(user).toEqual({
      username: "test_user",
      firstName: "test",
      lastName: "user",
      email: "test@user.com",
    });
  });
});

describe("authenticate user", () => {
  it("should log in a user", async () => {
    const user = await User.authenticate(username, password);
    expect(user).toEqual({
      id: expect.any(String),
      username: username,
      firstName: "test",
      lastName: "user",
      email: "test@user.com",
    });
  });
});

describe("get users", () => {
  it("should return all users", async () => {
    const users = await User.findAllUsers();
    expect(users).toEqual([
      {
        id: expect.any(String),
        username: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        email: expect.any(String),
        avatar: null,
        bio: expect.any(String),
        isAdmin: expect.any(String),
      },
      {
        id: expect.any(String),
        username: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        email: expect.any(String),
        avatar: null,
        bio: expect.any(String),
        isAdmin: expect.any(String),
      },
      {
        id: expect.any(String),
        username: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        email: expect.any(String),
        avatar: null,
        bio: expect.any(String),
        isAdmin: expect.any(String),
      },
      {
        id: expect.any(String),
        username: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        email: expect.any(String),
        avatar: null,
        bio: expect.any(String),
        isAdmin: expect.any(String),
      },
      {
        id: expect.any(String),
        username: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        email: expect.any(String),
        avatar: null,
        bio: null,
        isAdmin: null,
      },
    ]);
  });

  it("should retrieve a user by username", async () => {
    const user = await User.getUser("john_doe");
    expect(user).toEqual({
      id: expect.any(String),
      username: "john_doe",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      avatar: null,
      bio: "Sample bio for John Doe.",
      isAdmin: "true",
      videos: [],
      photos: [],
      favMountains: ["ski-area-1"],
    });
  });
});

describe("update user", () => {
  it("should update a user", async () => {
    const updateUserData = {
      username: username,
      bio: "test bio",
      isAdmin: "true",
      firstName: "tester",
      lastName: "userz",
    };
    const user = await User.updateUser(username, updateUserData);
    expect(user).toEqual({
      username: username,
      firstName: "tester",
      lastName: "userz",
      email: "test@user.com",
      avatar: null,
      bio: "test bio",
      isAdmin: "true",
    });
  });
});

describe("remove user", () => {
  it("should delete a user", async () => {
    const user = await User.remove(username);
    expect(user).toBeUndefined();
  });
});
