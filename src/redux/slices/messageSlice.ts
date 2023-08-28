import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../utils/config";
import { MessageReplyData } from "./messageReplySlice";

export interface NewMessageData {
  sender_id: string;
  recipient_id: string;
  subject: string;
  body: string;
}

export interface MessageData {
  id: string;
  senderId: string;
  recipientId: string;
  subject: string;
  body: string;
  isRead: boolean;
  createdAt: Date;
  senderUsername: string;
  senderFirstName: string;
  senderLastName: string;
  recipientUsername: string;
  recipientFirstName: string;
  recipientLastName: string;
  replies?: MessageReplyData[];
}
interface MessageState {
  message: MessageData | null;
  messages: MessageData[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  message: null,
  messages: null,
  loading: false,
  error: null,
};

export const createMessage = createAsyncThunk(
  "message/newMessage",
  async (newMessageData: NewMessageData) => {
    const response = await axios.post(`${URL}/api/new-message`, newMessageData);
    const message = response.data.message;
    return message;
  }
);

export const fetchMessage = createAsyncThunk(
  "message/fetchMessage",
  async (id: string) => {
    const response = await axios.get(`${URL}/messages/${id}`);
    const message: MessageData = response.data.message;
    const replies: MessageReplyData[] = response.data.replies;
    const fullMessage = { ...message, replies: replies };
    return fullMessage;
  }
);

export const fetchUserMessages = createAsyncThunk(
  "message/fetchUserMessages",
  async (username: string) => {
    const response = await axios.get(`${URL}/messages/users/${username}`);
    const messages = response.data.messages;
    return messages;
  }
);

export const fetchSentMessages = createAsyncThunk(
  "message/fetchSentMessages",
  async (username: string) => {
    const response = await axios.get(`${URL}/messages/users/${username}/sent`);
    const messages = response.data.messages;
    return messages;
  }
);

export const markMessageAsRead = createAsyncThunk(
  "message/markMessageAsRead",
  async (id: string) => {
    await axios.patch(`${URL}/api/messages/${id}/read`);
    return null;
  }
);

export const markMessageAsUnread = createAsyncThunk(
  "message/markMessageAsUnread",
  async (id: string) => {
    await axios.patch(`${URL}/api/messages/${id}/unread`);
    return null;
  }
);

export const deleteMessage = createAsyncThunk(
  "message/deleteMessage",
  async (id: string) => {
    await axios.delete(`${URL}/messages/${id}`);
    return null;
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createMessage.fulfilled,
        (state, action: PayloadAction<MessageData>) => {
          state.message = action.payload;
          state.loading = false;
        }
      )
      .addCase(createMessage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchMessage.fulfilled,
        (state, action: PayloadAction<MessageData>) => {
          state.message = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchMessage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserMessages.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        fetchUserMessages.fulfilled,
        (state, action: PayloadAction<MessageData[]>) => {
          state.messages = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchUserMessages.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchSentMessages.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        fetchSentMessages.fulfilled,
        (state, action: PayloadAction<MessageData[]>) => {
          state.messages = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchSentMessages.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(markMessageAsRead.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(markMessageAsRead.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(
        markMessageAsRead.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(markMessageAsUnread.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(markMessageAsUnread.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(
        markMessageAsUnread.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(deleteMessage.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteMessage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default messageSlice.reducer;
