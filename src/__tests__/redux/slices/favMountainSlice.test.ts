import { store } from "../../../redux/store";
import { createUser } from "../../../redux/slices/authSlice";
import { deleteUser } from "../../../redux/slices/userSlice";
import {
  createFavMountain,
  fetchFavMountainsByUsername,
  fetchFavMountainsBySkiAreaSlug,
  removeFavMountain,
} from "../../../redux/slices/favMountainSlice";

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

describe("test FavMountain slice", () => {
  it("should create a new favorite mountain", async () => {
    let state = store.getState().favMountains;
    expect(state.favMountain).toBe(null);
    const favMountain = {
      userId: testUserId!,
      username: "testuser",
      skiAreaSlug: "vail",
    };
    await store.dispatch(createFavMountain(favMountain));
    state = store.getState().favMountains;
    expect(state).toEqual({
      favMountain: {
        userId: testUserId,
        skiAreaSlug: "vail",
      },
      favMountainData: null,
      loading: false,
      error: null,
    });
  });
  it("should get favorite mountains by user id", async () => {
    await store.dispatch(fetchFavMountainsByUsername(testUser.username));

    const favMountains = store.getState().favMountains;
    expect(favMountains.favMountainData).toEqual([
      { username: "testuser", skiAreaSlug: "vail", skiAreaName: "Vail" },
    ]);
  });
  it("should get favorite mountains by ski area slug", async () => {
    await store.dispatch(fetchFavMountainsBySkiAreaSlug("vail"));

    const favMountains = store.getState().favMountains;
    expect(favMountains.favMountainData).toEqual([
      {
        username: "testuser",
        userId: testUserId,
        skiAreaSlug: "vail",
      },
    ]);
  });
  it("should delete a favorite mountain", async () => {
    const favMountain = {
      userId: testUserId!,
      username: "testuser",
      skiAreaSlug: "vail",
    };
    await store.dispatch(removeFavMountain(favMountain));
  });
});
