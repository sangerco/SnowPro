import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../utils/config";

export interface SkiAreaData {
  slug: string;
  name: string;
  country: string;
  region: string;
  href: string;
  location: {
    latitude: number;
    longitude: number;
  };
  lifts: {
    status: { [key: string]: any };
    stats: { [key: string]: any };
  };
  twitter: {
    user: string;
    tweets: any[];
  };
}

export interface SkiAreaState {
  skiArea: SkiAreaData | null;
  skiAreas: SkiAreaData[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: SkiAreaState = {
  skiArea: null,
  skiAreas: null,
  loading: false,
  error: null,
};

export const fetchSkiAreas = createAsyncThunk(
  "ski-area/fetchSkiAreas",
  async () => {
    const response = await axios.get(`${URL}/ski-areas`);
    const skiAreas = response.data;
    return skiAreas;
  }
);

export const fetchOneSkiArea = createAsyncThunk(
  "ski-area/fetchOneSkiArea",
  async (slug: string) => {
    const response = await axios.get(`${URL}/ski-areas/${slug}`);
    const skiArea = response.data;
    return skiArea;
  }
);

const skiAreaSlice = createSlice({
  name: "skiArea",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkiAreas.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSkiAreas.fulfilled,
        (state, action: PayloadAction<SkiAreaData[]>) => {
          state.skiAreas = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSkiAreas.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOneSkiArea.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchOneSkiArea.fulfilled,
        (state, action: PayloadAction<SkiAreaData>) => {
          state.skiArea = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchOneSkiArea.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default skiAreaSlice.reducer;
