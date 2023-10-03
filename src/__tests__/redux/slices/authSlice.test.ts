import { store } from "../../../redux/store";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../../../redux/slices/authSlice";
import { deleteUser } from "../../../redux/slices/userSlice";

describe("test auth slice", () => {
  it("should create a user", async () => {
    let state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);

    await store.dispatch(
      createUser({
        username: "tester",
        password: "password",
        email: "test@user.com",
        firstName: "Tester",
        lastName: "User",
      })
    );

    state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
  });

  it("should logout a user", async () => {
    let state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);

    await store.dispatch(logoutUser());
    state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
  });

  it("should log in a user", async () => {
    let state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);

    await store.dispatch(
      loginUser({
        username: "tester",
        password: "password",
      })
    );
    state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
  });

  it("should delete a user", async () => {
    let state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);

    await store.dispatch(deleteUser("tester"));
    state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
  });
});
