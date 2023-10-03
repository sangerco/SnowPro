import { store } from "../../../redux/store";
import {
  fetchSkiAreas,
  fetchOneSkiArea,
} from "../../../redux/slices/skiAreaSlice";

describe("test ski area slice", () => {
  it("should fetch ski areas", async () => {
    await store.dispatch(fetchSkiAreas());
    const skiAreas = store.getState().skiAreas.skiAreas;
    expect(skiAreas).toEqual(expect.any(Array));
  });
  it("should fetch one ski area", async () => {
    await store.dispatch(fetchOneSkiArea("beavercreek"));
    const skiArea = store.getState().skiAreas.skiArea;
    expect(skiArea).toEqual({
      slug: "beavercreek",
      name: "Beaver Creek",
      country: "US",
      region: "CO",
      href: "https://www.beavercreek.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx",
      location: {
        latitude: 39.600464,
        longitude: -106.517899,
      },
      lifts: {
        stats: {
          closed: expect.any(Number),
          open: expect.any(Number),
          hold: expect.any(Number),
          scheduled: expect.any(Number),
          percentage: expect.any(Object),
        },
        status: expect.any(Object),
      },
      units: "imperial",
      reviewData: expect.any(Array),
      usersFavoritedBy: expect.any(Array),
    });
  });
});
