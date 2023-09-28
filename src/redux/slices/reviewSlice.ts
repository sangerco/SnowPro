import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../utils/config";
import { ReviewReplyData } from "./reviewReplySlice";

export interface NewReviewData {
  userId: string;
  username: string;
  skiAreaSlug: string;
  header: string;
  body: string;
  stars: number;
  photos: string[];
}

export interface ReviewData {
  id: string;
  userId: string;
  username: string;
  skiAreaSlug: string;
  skiAreaName: string;
  header: string;
  body: string;
  stars: number;
  photos: string[];
  createdAt: Date;
  replies?: ReviewReplyData[];
}

export interface ReviewDataReturn {
  id: string;
  userId: string;
  username: string;
  skiAreaSlug: string;
  skiAreaName: string;
  header: string;
  body: string;
  stars: number;
  photos: string[];
  createdAt: Date;
  replies: ReviewReplyData[];
}

interface ReviewState {
  review: ReviewDataReturn | ReviewData | null;
  reviews: ReviewData[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  review: null,
  reviews: null,
  loading: false,
  error: null,
};

export const createReview = createAsyncThunk(
  "review/createReview",
  async (newReviewData: NewReviewData) => {
    const response = await axios.post(
      `${URL}/api/ski-areas/${newReviewData.skiAreaSlug}/review`,
      newReviewData
    );
    const review = response.data.review;
    return review;
  }
);

export const fetchReview = createAsyncThunk(
  "review/fetchReview",
  async (id: string) => {
    const response = await axios.get(`${URL}/ski-areas/reviews/${id}`);
    const review: ReviewData = response.data.review;
    const replies: ReviewReplyData[] = response.data.replies;
    const fullReview = { ...review, replies: replies };
    return fullReview;
  }
);

export const fetchReviewsBySkiArea = createAsyncThunk(
  "review/fetchReviewsBySkiArea",
  async (slug: string) => {
    const response = await axios.get(`${URL}/ski-areas/${slug}/reviews`);
    const reviews = response.data.reviews;
    return reviews;
  }
);

export const fetchAllReviews = createAsyncThunk(
  "review/fetchAllReviews",
  async () => {
    const response = await axios.get(`${URL}/ski-areas/reviews`);
    const reviews = response.data.reviews;
    return reviews;
  }
);

export const updateReview = createAsyncThunk(
  "review/updateReview",
  async (updateReviewData: ReviewData) => {
    const response = await axios.patch(
      `${URL}/api/reviews/${updateReviewData.id}`,
      updateReviewData
    );
    const review = response.data.review;
    return review;
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (id: string) => {
    await axios.delete(`${URL}/api/reviews/${id}`);
    return null;
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createReview.fulfilled,
        (state, action: PayloadAction<ReviewData>) => {
          state.review = action.payload;
          state.loading = false;
        }
      )
      .addCase(createReview.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchReview.fulfilled,
        (state, action: PayloadAction<ReviewDataReturn>) => {
          state.review = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchReview.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchReviewsBySkiArea.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchReviewsBySkiArea.fulfilled,
        (state, action: PayloadAction<ReviewData[]>) => {
          state.reviews = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchReviewsBySkiArea.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchAllReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllReviews.fulfilled,
        (state, action: PayloadAction<ReviewData[]>) => {
          state.reviews = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchAllReviews.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateReview.fulfilled,
        (state, action: PayloadAction<ReviewData>) => {
          state.review = action.payload;
          state.loading = false;
        }
      )
      .addCase(updateReview.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteReview.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
