import { store } from "../../../redux/store";
import {
  createTag,
  fetchTag,
  fetchAllTags,
  fetchTagAssocItems,
  deleteTag,
} from "../../../redux/slices/tagSlice";

describe("test tag slice", () => {
  let tagId: string;
  it("should create a tag", async () => {
    const newTag = {
      tag: "test tag",
    };
    await store.dispatch(createTag(newTag));
    const tag = store.getState().tags.tag;
    tagId = tag!.id;
    expect(tag).toEqual({
      id: expect.any(String),
      tag: "test tag",
    });
  });
  it("should fetch a tag by id", async () => {
    await store.dispatch(fetchTag(tagId));
    const tag = store.getState().tags.tag;
    expect(tag).toEqual({
      id: expect.any(String),
      tag: "test tag",
    });
  });
  it("should fetch all tags", async () => {
    await store.dispatch(fetchAllTags());
    const tags = store.getState().tags.tags;
    expect(tags).toEqual(expect.any(Array));
  });
  it("should fetch tag associated items", async () => {
    await store.dispatch(fetchTagAssocItems(tagId));
    const assocItems = store.getState().tags.assocItems;
    expect(assocItems).toEqual({
      tagId: expect.any(String),
      tag: "test tag",
      reviewIds: expect.any(Array),
      photoIds: expect.any(Array),
      photoLinks: expect.any(Array),
      videoIds: expect.any(Array),
      videoLinks: expect.any(Array),
    });
  });
  it("should delete a tag", async () => {
    await store.dispatch(deleteTag(tagId));
    const tag = store.getState().tags.tag;
    expect(tag).toBeNull();
  });
});
