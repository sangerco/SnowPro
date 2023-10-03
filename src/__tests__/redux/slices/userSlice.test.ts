import { store } from "../../../redux/store";
import { createUser } from "../../../redux/slices/authSlice";
import {
  fetchOneUser,
  fetchUserData,
  makeUserAdmin,
  updateUser,
  deleteUser,
} from "../../../redux/slices/userSlice";

const newUser = {
  username: "testuser",
  password: "password",
  firstName: "Test",
  lastName: "User",
  email: "test@user.com",
};

describe("test user slice", () => {
  let userId: string | undefined;
  it("should create a user", async () => {
    await store.dispatch(createUser(newUser));
    const user = store.getState().auth.data;
    userId = user!.id;
    expect(user).toEqual({
      id: expect.any(String),
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      email: "test@user.com",
    });
  });
  it("should fetch one user", async () => {
    await store.dispatch(fetchOneUser(newUser.username));
    const user = store.getState().users.user;
    expect(user).toEqual({
      id: expect.any(String),
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      email: "test@user.com",
      avatar: null,
      bio: null,
      videos: [],
      photos: [],
      favMountains: [],
      isAdmin: null,
    });
  });
  it("should fetch all users", async () => {
    let users = store.getState().users.users;
    expect(users).toBeNull();

    await store.dispatch(fetchUserData());
    users = store.getState().users.users;
    expect(users).toEqual(expect.any(Array));
  });
  it("should update a user", async () => {
    const updateUserData = {
      username: "testuser",
      bio: "test user bio",
      avatar: "https://testlinks.com/avatar1.jpg",
    };
    await store.dispatch(updateUser(updateUserData));
    const user = store.getState().users.user;
    expect(user).toEqual({
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      email: "test@user.com",
      avatar: "https://testlinks.com/avatar1.jpg",
      bio: "test user bio",
      isAdmin: null,
    });
  });
  it("should make a user an admin", async () => {
    const makeAdmin = {
      username: "testuser",
      isAdmin: true,
    };
    await store.dispatch(makeUserAdmin(makeAdmin));
    const user = store.getState().users.user;
    expect(user).toEqual({
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      email: "test@user.com",
      bio: "test user bio",
      avatar: "https://testlinks.com/avatar1.jpg",
      isAdmin: "true",
    });
  });
  it("should delete a user", async () => {
    await store.dispatch(deleteUser(newUser.username));
    const user = store.getState().users.user;
    expect(user).toBeNull();
  });
});
