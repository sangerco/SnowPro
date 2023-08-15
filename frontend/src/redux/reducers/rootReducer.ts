import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { tagReducer } from "./tagReducer";
import { reviewReplyReducer } from "./reviewReplyReducer";
import { reviewReducer } from "./reviewReducer";
import { messageReplyReducer } from "./messageReplyReducer";
import { messageReducer } from "./messageReducer";
import { photoReducer, videoReducer } from "./mediaReducer";
import { favMountainReducer } from "./favMountainReducer";
import { authReducer } from "./authReducer";

const rootReducer = combineReducers({
  user: userReducer,
  tag: tagReducer,
  reviewReply: reviewReplyReducer,
  review: reviewReducer,
  messageReply: messageReplyReducer,
  message: messageReducer,
  photo: photoReducer,
  video: videoReducer,
  favMountain: favMountainReducer,
  auth: authReducer,
});

export default rootReducer;
