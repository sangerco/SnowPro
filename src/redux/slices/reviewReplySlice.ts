import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../utils/config";

export interface ReviewReplyData {
  id: string;
  reviewId: string;
  userId: string;
  username: string;
  body: string;
  slug: string;
  createdAt: Date;
}

export interface NewReviewReplyData {
  reviewId: string;
  userId: string;
  username: string;
  body: string;
  slug: string;
}

interface ReviewReplyState {
  reviewReply: ReviewReplyData | null;
  reviewReplies: ReviewReplyData[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReviewReplyState = {
  reviewReply: null,
  reviewReplies: null,
  loading: false,
  error: null,
};

export const createReviewReply = createAsyncThunk(
  "reviewReply/createReviewReply",
  async (newReviewReplyData: NewReviewReplyData) => {
    const response = await axios.post(
      `${URL}/api/reviews/${newReviewReplyData.reviewId}/reply`,
      newReviewReplyData
    );
    const reviewReply = response.data.reply;
    return reviewReply;
  }
);

export const fetchReviewReply = createAsyncThunk(
  "reviewReply/fetchReviewReply",
  async (id: string) => {
    const response = await axios.get(`${URL}/ski-areas/reviews/replies/${id}`);
    const reviewReply = response.data.reply;
    return reviewReply;
  }
);

export const fetchReviewRepliesByReviewId = createAsyncThunk(
  "reviewReply/fetchReviewRepliesByReviewId",
  async (id: string) => {
    const response = await axios.get(`${URL}/ski-areas/reviews/${id}/replies`);
    const reviewReplies = response.data.reviewReplies;
    return reviewReplies;
  }
);

export const updateReviewReply = createAsyncThunk(
  "reviewReply/updateReviewReply",
  async (updateData: ReviewReplyData) => {
    const response = await axios.patch(
      `${URL}/api/reviews/reply/${updateData.id}`
    );
    const reviewReply = response.data.reply;
    return reviewReply;
  }
);

export const deleteReviewReply = createAsyncThunk(
  "reviewReply/deleteReviewReply",
  async (id: string) => {
    await axios.delete(`${URL}/reviews/reply/${id}`);
    return null;
  }
);

const reviewReplySlice = createSlice({
  name: "reviewReply",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReviewReply.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createReviewReply.fulfilled,
        (state, action: PayloadAction<ReviewReplyData>) => {
          state.reviewReply = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        createReviewReply.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchReviewReply.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchReviewReply.fulfilled,
        (state, action: PayloadAction<ReviewReplyData>) => {
          state.reviewReply = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchReviewReply.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchReviewRepliesByReviewId.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchReviewRepliesByReviewId.fulfilled,
        (state, action: PayloadAction<ReviewReplyData[]>) => {
          state.reviewReplies = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchReviewRepliesByReviewId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(updateReviewReply.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateReviewReply.fulfilled,
        (state, action: PayloadAction<ReviewReplyData>) => {
          state.reviewReply = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        updateReviewReply.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(deleteReviewReply.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReviewReply.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        deleteReviewReply.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default reviewReplySlice.reducer;
