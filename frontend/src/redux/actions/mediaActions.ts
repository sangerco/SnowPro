import axios from "axios";
import { AppDispatch } from "../store";
import { URL } from "../../utils/config";
import {
  PhotoData,
  VideoData,
  SEND_NEW_PHOTO_DATA_REQUEST,
  SEND_NEW_PHOTO_DATA_SUCCESS,
  SEND_NEW_PHOTO_DATA_FAILURE,
  SEND_NEW_VIDEO_DATA_REQUEST,
  SEND_NEW_VIDEO_DATA_SUCCESS,
  SEND_NEW_VIDEO_DATA_FAILURE,
  FETCH_PHOTO_DATA_REQUEST,
  FETCH_PHOTO_DATA_SUCCESS,
  FETCH_PHOTO_DATA_FAILURE,
  FETCH_VIDEO_DATA_REQUEST,
  FETCH_VIDEO_DATA_SUCCESS,
  FETCH_VIDEO_DATA_FAILURE,
  UPDATE_PHOTO_DATA_REQUEST,
  UPDATE_PHOTO_DATA_SUCCESS,
  UPDATE_PHOTO_DATA_FAILURE,
  UPDATE_VIDEO_DATA_REQUEST,
  UPDATE_VIDEO_DATA_SUCCESS,
  UPDATE_VIDEO_DATA_FAILURE,
  DELETE_PHOTO_REQUEST,
  DELETE_PHOTO_SUCCESS,
  DELETE_PHOTO_FAILURE,
  DELETE_VIDEO_REQUEST,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAILURE,
} from "../types/mediaTypes";

export const sendNewPhotoDataRequest = (newPhotoData: PhotoData) => ({
  type: SEND_NEW_PHOTO_DATA_REQUEST,
  payload: newPhotoData,
});

export const sendNewPhotoDataSuccess = (photoDataReturn: PhotoData) => ({
  type: SEND_NEW_PHOTO_DATA_SUCCESS,
  payload: photoDataReturn,
});

export const sendNewPhotoDataFailure = (error: string) => ({
  type: SEND_NEW_PHOTO_DATA_FAILURE,
  payload: error,
});

export const sendNewVideoDataRequest = (newVideoData: VideoData) => ({
  type: SEND_NEW_VIDEO_DATA_REQUEST,
  payload: newVideoData,
});

export const sendNewVideoDataSuccess = (videoDataReturn: VideoData) => ({
  type: SEND_NEW_VIDEO_DATA_SUCCESS,
  payload: videoDataReturn,
});

export const sendNewVideoDataFailure = (error: string) => ({
  type: SEND_NEW_VIDEO_DATA_FAILURE,
  payload: error,
});

export const fetchPhotoDataRequest = (id: string) => ({
  type: FETCH_PHOTO_DATA_REQUEST,
  payload: id,
});

export const fetchPhotoDataSuccess = (photoData: PhotoData) => ({
  type: FETCH_PHOTO_DATA_SUCCESS,
  payload: photoData,
});

export const fetchPhotoDataFailure = (error: string) => ({
  type: FETCH_PHOTO_DATA_FAILURE,
  payload: error,
});

export const fetchVideoDataRequest = (id: string) => ({
  type: FETCH_VIDEO_DATA_REQUEST,
  payload: id,
});

export const fetchVideoDataSuccess = (videoData: VideoData) => ({
  type: FETCH_VIDEO_DATA_SUCCESS,
  payload: videoData,
});

export const fetchVideoDataFailure = (error: string) => ({
  type: FETCH_VIDEO_DATA_FAILURE,
  payload: error,
});

export const fetchPhotoDataByUserRequest = (username: string) => ({
  type: FETCH_PHOTO_DATA_REQUEST,
  payload: username,
});

export const fetchPhotoDataByUserSuccess = (photoData: PhotoData[]) => ({
  type: FETCH_PHOTO_DATA_SUCCESS,
  payload: photoData,
});

export const fetchPhotoDataByUserFailure = (error: string) => ({
  type: FETCH_PHOTO_DATA_FAILURE,
  payload: error,
});

export const fetchVideoDataByUserRequest = (username: string) => ({
  type: FETCH_VIDEO_DATA_REQUEST,
  payload: username,
});

export const fetchVideoDataByUserSuccess = (videoData: VideoData[]) => ({
  type: FETCH_VIDEO_DATA_SUCCESS,
  payload: videoData,
});

export const fetchVideoDataByUserFailure = (error: string) => ({
  type: FETCH_VIDEO_DATA_FAILURE,
  payload: error,
});

export const updatePhotoDataRequest = (updatePhotoData: PhotoData) => ({
  type: UPDATE_PHOTO_DATA_REQUEST,
  payload: updatePhotoData,
});

export const updatePhotoDataSuccess = (photoData: PhotoData) => ({
  type: UPDATE_PHOTO_DATA_SUCCESS,
  payload: photoData,
});

export const updatePhotoDataFailure = (error: string) => ({
  type: UPDATE_PHOTO_DATA_FAILURE,
  payload: error,
});

export const updateVideoDataRequest = (updateVideoData: VideoData) => ({
  type: UPDATE_VIDEO_DATA_REQUEST,
  payload: updateVideoData,
});

export const updateVideoDataSuccess = (videoData: VideoData) => ({
  type: UPDATE_VIDEO_DATA_SUCCESS,
  payload: videoData,
});

export const updateVideoDataFailure = (error: string) => ({
  type: UPDATE_VIDEO_DATA_FAILURE,
  payload: error,
});

export const deletePhotoRequest = (id: string) => ({
  type: DELETE_PHOTO_REQUEST,
  payload: id,
});

export const deletePhotoSuccess = (success: string) => ({
  type: DELETE_PHOTO_SUCCESS,
  payload: success,
});

export const deletePhotoFailure = (error: string) => ({
  type: DELETE_PHOTO_FAILURE,
  payload: error,
});

export const deleteVideoRequest = (id: string) => ({
  type: DELETE_VIDEO_REQUEST,
  payload: id,
});

export const deleteVideoSuccess = (success: string) => ({
  type: DELETE_VIDEO_SUCCESS,
  payload: success,
});

export const deleteVideoFailure = (error: string) => ({
  type: DELETE_VIDEO_FAILURE,
  payload: error,
});

export const sendNewPhotoData = (newPhotoData: PhotoData) => {
  return async (dispatch: AppDispatch) => {
    dispatch(sendNewPhotoDataRequest(newPhotoData));

    try {
      const response = await axios.post(`${URL}/api/photos`, {
        username: newPhotoData.username,
        link: newPhotoData.link,
        about: newPhotoData.about,
        tags: newPhotoData.tags,
      });
      const responseData = response.data.photo;
      dispatch(sendNewPhotoDataSuccess(responseData));
    } catch (error: any) {
      dispatch(sendNewPhotoDataFailure(error.message));
    }
  };
};

export const sendNewVideoData = (newVideoData: VideoData) => {
  return async (dispatch: AppDispatch) => {
    dispatch(sendNewVideoDataRequest(newVideoData));

    try {
      const response = await axios.post(`${URL}/api/videos`, {
        username: newVideoData.username,
        link: newVideoData.link,
        about: newVideoData.about,
        tags: newVideoData.tags,
      });
      const responseData = response.data.video;
      dispatch(sendNewPhotoDataSuccess(responseData));
    } catch (error: any) {
      dispatch(sendNewPhotoDataFailure(error.message));
    }
  };
};

export const fetchPhotoData = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchPhotoDataRequest(id));

    try {
      const response = await axios.get(`${URL}/photo/${id}`);
      const responseData = response.data.photo;
      dispatch(fetchPhotoDataSuccess(responseData));
    } catch (error: any) {
      dispatch(fetchPhotoDataFailure(error.message));
    }
  };
};

export const fetchVideoData = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchVideoDataRequest(id));

    try {
      const response = await axios.get(`${URL}/video/${id}`);
      const responseData = response.data.video;
      dispatch(fetchVideoDataSuccess(responseData));
    } catch (error: any) {
      dispatch(fetchVideoDataFailure(error.message));
    }
  };
};

export const fetchPhotoDataByUser = (username: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchPhotoDataByUserRequest(username));

    try {
      const response = await axios.get(`${URL}/users/${username}/photos`);
      const responseData = response.data.photos;
      dispatch(fetchPhotoDataByUserSuccess(responseData));
    } catch (error: any) {
      dispatch(fetchPhotoDataByUserFailure(error.message));
    }
  };
};

export const fetchVideoDataByUser = (username: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchVideoDataByUserRequest(username));

    try {
      const response = await axios.get(`${URL}/users/${username}/videos`);
      const responseData = response.data.photos;
      dispatch(fetchVideoDataByUserSuccess(responseData));
    } catch (error: any) {
      dispatch(fetchVideoDataByUserFailure(error.message));
    }
  };
};

export const updatePhotoData = (data: PhotoData) => {
  return async (dispatch: AppDispatch) => {
    dispatch(updatePhotoDataRequest(data));

    try {
      const response = await axios.patch(`${URL}/api/photo/${data.id}`, {
        data,
      });
      const responseData = response.data.photo;
      dispatch(updatePhotoDataSuccess(responseData));
    } catch (error: any) {
      dispatch(updatePhotoDataFailure(error.message));
    }
  };
};

export const updateVideoData = (data: VideoData) => {
  return async (dispatch: AppDispatch) => {
    dispatch(updateVideoDataRequest(data));

    try {
      const response = await axios.patch(`${URL}/api/video/${data.id}`, {
        data,
      });
      const responseData = response.data.video;
      dispatch(updateVideoDataSuccess(responseData));
    } catch (error: any) {
      dispatch(updateVideoDataFailure(error.message));
    }
  };
};

export const deletePhoto = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(deletePhotoRequest(id));

    try {
      const response = await axios.delete(`${URL}/api/photo/${id}`);
      dispatch(deletePhotoSuccess(response.data));
    } catch (error: any) {
      dispatch(deletePhotoFailure(error.message));
    }
  };
};

export const deleteVideo = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(deleteVideoRequest(id));

    try {
      const response = await axios.delete(`${URL}/api/video/${id}`);
      dispatch(deleteVideoSuccess(response.data));
    } catch (error: any) {
      dispatch(deleteVideoFailure(error.message));
    }
  };
};
