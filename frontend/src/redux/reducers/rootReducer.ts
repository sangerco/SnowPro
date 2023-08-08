import { combineReducers } from 'redux';
import {  userReducer, 
          deleteUserReducer, 
          makeUserAdminReducer, 
          updateUserReducer, 
          logoutReducer, 
          newUserReducer,
          loginReducer } from './userReducer';
import { messageReducer, newMessageReducer, deleteMessageReducer, userWithMessagesReducer } from './messageReducer';
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
import {  favMountainReducer,
          newFavMountainReducer,
          deleteFavMountainReducer } from './favMountainReducer';

const rootReducer = combineReducers({
  user: userReducer,
  newUser: newUserReducer,
  deleteUser: deleteUserReducer,
  updateUser: updateUserReducer,
  makeUserAdmin: makeUserAdminReducer,
  logout: logoutReducer,
  login: loginReducer,
  message: messageReducer,
  userWithMessages: userWithMessagesReducer,
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
  deleteReviewReply: deleteReviewReplyReducer,
  favMountain: favMountainReducer,
  newFavMountain: newFavMountainReducer,
  deleteFavMountain: deleteFavMountainReducer
});

export default rootReducer;