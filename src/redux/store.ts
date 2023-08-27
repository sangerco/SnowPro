import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import messageReducer from "./slices/messageSlice";
import messageReplyReducer from "./slices/messageReplySlice";
import reviewReducer from "./slices/reviewSlice";
import reviewReplyReducer from "./slices/reviewReplySlice";
import tagReducer from "./slices/tagSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["messages", "messageReplies", "reviews", "reviewReplies"],
};

const rootReducer = combineReducers({
  users: userReducer,
  auth: authReducer,
  messages: messageReducer,
  messageReplies: messageReplyReducer,
  reviews: reviewReducer,
  reviewReplies: reviewReplyReducer,
  tags: tagReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
