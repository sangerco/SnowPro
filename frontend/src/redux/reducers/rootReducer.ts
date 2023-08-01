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
import {  reviewReducer,
          newReviewReducer,
          updateReviewReducer,
          deleteReviewReducer } from './reviewReducer';
import {  newReviewReplyReducer,
          reviewReplyReducer,
          updateReviewReplyReducer,
          deleteReviewReplyReducer } from './reviewReplyReducer';

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
  deleteVideo: deleteVideoReducer,
  review: reviewReducer,
  newReview: newReviewReducer,
  updateReview: updateReviewReducer,
  deleteReview: deleteReviewReducer,
  reviewReply: reviewReplyReducer,
  newReviewReply: newReviewReplyReducer,
  updateReviewReply: updateReviewReplyReducer,
  deleteReviewReply: deleteReviewReplyReducer
});

export default rootReducer;