import { combineReducers } from 'redux';
import userReducer from './userReducer';
import newUserReducer from './createUserReducer';
import loginReducer from './loginReducer';
import { messageReducer, newMessageReducer, deleteMessageReducer } from './messageReducer';
import { replyReducer, newReplyReducer, deleteReplyReducer } from './messageReplyReducer';
import { tagReducer, newTagReducer, deleteTagReducer } from './tagReducer';
import { deletePhotoReducer, deleteVideoReducer, newPhotoReducer, newVideoReducer, photoReducer, videoReducer } from './mediaReducer';

const rootReducer = combineReducers({
  user: userReducer,
  newUser: newUserReducer,
  login: loginReducer,
  message: messageReducer,
  newMessage: newMessageReducer,
  deleteMessage: deleteMessageReducer,
  messageReply: replyReducer,
  newMessageReply: newReplyReducer,
  deleteMessageReply: deleteReplyReducer,
  tag: tagReducer,
  newTag: newTagReducer,
  deleteTag: deleteTagReducer,
  photo: photoReducer,
  newPhoto: newPhotoReducer,
  deletePhoto: deletePhotoReducer,
  video: videoReducer,
  newVideo: newVideoReducer,
  delete: deleteVideoReducer
});

export default rootReducer;