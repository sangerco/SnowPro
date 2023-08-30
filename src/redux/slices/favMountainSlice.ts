import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../utils/config";

export interface FavMountainData {
  userId: string;
  username: string;
  skiAreaSlug: string;
}

export interface FavMountainState {
  favMountain: FavMountainData | null;
  favMountainData: FavMountainData[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: FavMountainState = {
  favMountain: null,
  favMountainData: null,
  loading: false,
  error: null,
};

export const createFavMountain = createAsyncThunk(
  "favMountain/createFavMountain",
  async (favMountainData: FavMountainData) => {
    const response = await axios.post(
      `${URL}/api/fav-mountain`,
      favMountainData
    );
    const favMountain = response.data.favMountain;
    return favMountain;
  }
);

export const fetchFavMountainsByUserId = createAsyncThunk(
  "favMountain/fetchFavMountainsByUsername",
  async (userId: string) => {
    const response = await axios.get(`${URL}/users/${userId}/fav-mountains`);
    const favMountains = response.data.favMountains;
    return favMountains;
  }
);

export const fetchFavMountainsBySkiAreaSlug = createAsyncThunk(
  "favMountains/fetchFavMountainsBySkiAreaSlug",
  async (skiAreaSlug: string) => {
    const response = await axios.get(
      `${URL}/ski-areas/${skiAreaSlug}/users-favorited-by`
    );
    const favMountains = response.data.favMountains;
    return favMountains;
  }
);

export const removeFavMountain = createAsyncThunk(
  "favMountains/removeFavMountain",
  async (favMountainData: FavMountainData) => {
    await axios.delete(
      `${URL}/api/fav-mountains/${favMountainData.username}/${favMountainData.skiAreaSlug}`
    );
    return null;
  }
);

const favMountainSlice = createSlice({
  name: "favMountain",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFavMountain.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createFavMountain.fulfilled,
        (state, action: PayloadAction<FavMountainData>) => {
          state.favMountain = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        createFavMountain.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchFavMountainsByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchFavMountainsByUserId.fulfilled,
        (state, action: PayloadAction<FavMountainData[]>) => {
          state.favMountainData = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchFavMountainsByUserId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchFavMountainsBySkiAreaSlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchFavMountainsBySkiAreaSlug.fulfilled,
        (state, action: PayloadAction<FavMountainData[]>) => {
          state.favMountainData = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchFavMountainsBySkiAreaSlug.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
        }
      )
      .addCase(removeFavMountain.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFavMountain.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        removeFavMountain.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default favMountainSlice.reducer;
