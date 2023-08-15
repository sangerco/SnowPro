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

interface PhotoState {
  data: PhotoData | null;
  error: string | null;
}

interface VideoState {
  data: VideoData | null;
  error: string | null;
}

const initialPhotoState: PhotoState = {
  data: null,
  error: null,
};

const initialVideoState: VideoState = {
  data: null,
  error: null,
};

export const photoReducer = (state = initialPhotoState, action: any) => {
  switch (action.type) {
    case SEND_NEW_PHOTO_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case SEND_NEW_PHOTO_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case SEND_NEW_PHOTO_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_PHOTO_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case FETCH_PHOTO_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case FETCH_PHOTO_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_PHOTO_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case UPDATE_PHOTO_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case UPDATE_PHOTO_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_PHOTO_REQUEST:
      return {
        ...state,
        error: null,
      };
    case DELETE_PHOTO_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case DELETE_PHOTO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
  }
};

export const videoReducer = (state = initialVideoState, action: any) => {
  switch (action.type) {
    case SEND_NEW_VIDEO_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case SEND_NEW_VIDEO_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case SEND_NEW_VIDEO_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_VIDEO_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case FETCH_VIDEO_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case FETCH_VIDEO_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_VIDEO_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case UPDATE_VIDEO_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case UPDATE_VIDEO_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_VIDEO_REQUEST:
      return {
        ...state,
        error: null,
      };
    case DELETE_VIDEO_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case DELETE_VIDEO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
  }
};
