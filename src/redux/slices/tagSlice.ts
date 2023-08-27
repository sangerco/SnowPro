import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../utils/config";

export interface NewTag {
  tag: string;
}

export interface TagData {
  tagId: string;
  tag: string;
}

export interface TagAssocItems {
  tagId: string;
  tag: string;
  reviewIds: string[];
  photoIds: string[];
  photoLinks: string[];
  videoIds: string[];
  videoLinks: string[];
}

interface TagState {
  tag: TagData | null;
  tags: TagData[] | null;
  assocItems: TagAssocItems | null;
  loading: boolean;
  error: string | null;
}

const initialState: TagState = {
  tag: null,
  tags: null,
  assocItems: null,
  loading: false,
  error: null,
};

export const createTag = createAsyncThunk(
  "tag/createTag",
  async (tagData: NewTag) => {
    const response = await axios.post(`${URL}/api/tags`, tagData);
    const tag = response.data.result;
    return tag;
  }
);

export const fetchAllTags = createAsyncThunk("tag/fetchAllTags", async () => {
  const response = await axios.get(`${URL}/tags`);
  const tags = response.data.tags;
  return tags;
});

export const fetchTagAssocItems = createAsyncThunk(
  "tag/fetchTagAssocItems",
  async (id: string) => {
    const response = await axios.get(`${URL}/tags/${id}`);
    const tagData = response.data.tag;
    return tagData;
  }
);

export const deleteTag = createAsyncThunk(
  "tag/deleteTag",
  async (id: string) => {
    await axios.delete(`${URL}/api/tags/${id}`);
    return null;
  }
);

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTag.fulfilled, (state, action: PayloadAction<TagData>) => {
        state.tag = action.payload;
        state.loading = false;
      })
      .addCase(createTag.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllTags.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllTags.fulfilled,
        (state, action: PayloadAction<TagData[]>) => {
          state.tags = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchAllTags.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTagAssocItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTagAssocItems.fulfilled,
        (state, action: PayloadAction<TagAssocItems>) => {
          state.assocItems = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchTagAssocItems.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(deleteTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTag.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTag.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tagSlice.reducer;
