import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../utils/config";

export interface NewMessageReplyData {
  messageId: string;
  senderId: string;
  recipientId: string;
  subject: string;
  body: string;
}

export interface MessageReplyData {
  id: string;
  messageId: string;
  senderId: string;
  recipientId: string;
  subject: string;
  body: string;
  //   isRead: boolean;
  createdAt: Date;
  senderUsername: string;
  senderFirstName: string;
  senderLastName: string;
  recipientUsername: string;
  recipientFirstName: string;
  recipientLastName: string;
}

interface MessageReplyState {
  messageReply: MessageReplyData | MessageReplyData[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: MessageReplyState = {
  messageReply: null,
  loading: false,
  error: null,
};

export const createMessageReply = createAsyncThunk(
  "messageReply/newMessageReply",
  async (newMessageReply: NewMessageReplyData) => {
    const messageId = newMessageReply.messageId;
    const response = await axios.post(
      `${URL}/api/messages/${messageId}/reply`,
      newMessageReply
    );
    const reply = response.data.reply;
    return reply;
  }
);

export const fetchMessageReply = createAsyncThunk(
  "messageReply/fetchMessageReply",
  async (id: string) => {
    const response = await axios.get(`${URL}/messages/replies/${id}`);
    const reply = response.data.reply;
    return reply;
  }
);

export const fetchMessageRepliesByMessageId = createAsyncThunk(
  "messageReply/fetchMessageRepliesByMessageId",
  async (messageId) => {
    const response = await axios.get(`${URL}/messages/${messageId}/replies`);
    const replies = response.data.replies;
    return replies;
  }
);

export const markMessageReplyAsRead = createAsyncThunk(
  "messageReply/markMessageReplyAsRead",
  async (id: string) => {
    await axios.patch(`${URL}/api/messages/replies/${id}/read`);
    return null;
  }
);

export const markMessageReplyAsUnread = createAsyncThunk(
  "messageReply/markMessageReplyAsUnread",
  async (id: string) => {
    await axios.patch(`${URL}/api/messages/replies/${id}/unread`);
    return null;
  }
);

export const deleteMessageReply = createAsyncThunk(
  "messageReply/deleteMessageReply",
  async (id: string) => {
    await axios.delete(`${URL}/messages/replies/${id}`);
    return null;
  }
);

const messageReplySlice = createSlice({
  name: "MessageReply",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMessageReply.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        createMessageReply.fulfilled,
        (state, action: PayloadAction<MessageReplyData>) => {
          state.messageReply = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        createMessageReply.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchMessageReply.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        fetchMessageReply.fulfilled,
        (state, action: PayloadAction<MessageReplyData>) => {
          state.messageReply = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchMessageReply.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchMessageRepliesByMessageId.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        fetchMessageRepliesByMessageId.fulfilled,
        (state, action: PayloadAction<MessageReplyData[]>) => {
          state.messageReply = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchMessageRepliesByMessageId.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(markMessageReplyAsRead.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(markMessageReplyAsRead.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(
        markMessageReplyAsRead.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(markMessageReplyAsUnread.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(markMessageReplyAsUnread.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(
        markMessageReplyAsUnread.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(deleteMessageReply.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteMessageReply.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(
        deleteMessageReply.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default messageReplySlice.reducer;
