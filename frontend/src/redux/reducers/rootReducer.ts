import { combineReducers } from 'redux';
import { userReducer, deleteUserReducer, makeUserAdminReducer } from './userReducer';
import newUserReducer from './createUserReducer';
import loginReducer from './loginReducer';
import { messageReducer, newMessageReducer, deleteMessageReducer } from './messageReducer';
import { replyReducer, newReplyReducer, deleteReplyReducer } from './messageReplyReducer';
import { tagReducer, newTagReducer, deleteTagReducer } from './tagReducer';
import {  deletePhotoReducer, 
          deleteVideoReducer, 
          newPhotoReducer, 
          newVideoReducer, 
          photoReducer, 
          videoReducer,
          updatePhotoReducer,
          updateVideoReducer } from './mediaReducer';

const rootReducer = combineReducers({
  user: userReducer,
  newUser: newUserReducer,
  deleteUser: deleteUserReducer,
  makeUserAdmin: makeUserAdminReducer,
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
  updatePhoto: updatePhotoReducer,
  deletePhoto: deletePhotoReducer,
  video: videoReducer,
  newVideo: newVideoReducer,
  updateVideo: updateVideoReducer,
  delete: deleteVideoReducer
});

export default rootReducer;