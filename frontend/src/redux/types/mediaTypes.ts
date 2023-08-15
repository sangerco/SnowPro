export interface PhotoData {
  id?: string;
  link: string;
  username: string;
  about?: string;
  tags?: string[];
  createdAt?: Date;
}

export const SEND_NEW_PHOTO_DATA_REQUEST = "SEND_NEW_PHOTO_DATA_REQUEST";
export const SEND_NEW_PHOTO_DATA_SUCCESS = "SEND_NEW_PHOTO_DATA_SUCCESS";
export const SEND_NEW_PHOTO_DATA_FAILURE = "SEND_NEW_PHOTO_DATA_FAILURE";
export const FETCH_PHOTO_DATA_REQUEST = "FETCH_PHOTO_DATA_REQUEST";
export const FETCH_PHOTO_DATA_SUCCESS = "FETCH_PHOTO_DATA_SUCCESS";
export const FETCH_PHOTO_DATA_FAILURE = "FETCH_PHOTO_DATA_FAILURE";
export const UPDATE_PHOTO_DATA_REQUEST = "UPDATE_PHOTO_DATA_REQUEST";
export const UPDATE_PHOTO_DATA_SUCCESS = "UPDATE_PHOTO_DATA_SUCCESS";
export const UPDATE_PHOTO_DATA_FAILURE = "UPDATE_PHOTO_DATA_FAILURE";
export const DELETE_PHOTO_REQUEST = "DELETE_PHOTO_REQUEST";
export const DELETE_PHOTO_SUCCESS = "DELETE_PHOTO_SUCCESS";
export const DELETE_PHOTO_FAILURE = "DELETE_PHOTO_FAILURE";

export interface sendNewPhotoDataRequest {
  type: typeof SEND_NEW_PHOTO_DATA_REQUEST;
  payload: PhotoData;
}

export interface sendNewPhotoDataSuccess {
  type: typeof SEND_NEW_PHOTO_DATA_SUCCESS;
  payload: PhotoData;
}

export interface sendNewPhotoDataFailure {
  type: typeof SEND_NEW_PHOTO_DATA_FAILURE;
  payload: string;
}

export interface fetchPhotoDataRequest {
  type: typeof FETCH_PHOTO_DATA_REQUEST;
  payload: string;
}

export interface fetchPhotoDataSuccess {
  type: typeof FETCH_PHOTO_DATA_SUCCESS;
  payload: PhotoData;
}

export interface fetchPhotoDataFailure {
  type: typeof FETCH_PHOTO_DATA_FAILURE;
  payload: string;
}

export interface fetchUserPhotoDataRequest {
  type: typeof FETCH_PHOTO_DATA_REQUEST;
  payload: string;
}

export interface fetchUserPhotoDataSuccess {
  type: typeof FETCH_PHOTO_DATA_SUCCESS;
  payload: PhotoData[];
}

export interface fetchUserPhotoDataFailure {
  type: typeof FETCH_PHOTO_DATA_FAILURE;
  payload: string;
}

export interface updatePhotoDataRequest {
  type: typeof UPDATE_PHOTO_DATA_REQUEST;
  payload: PhotoData;
}

export interface updatePhotoDataSuccess {
  type: typeof UPDATE_PHOTO_DATA_SUCCESS;
  payload: PhotoData;
}

export interface updatePhotoDataFailure {
  type: typeof UPDATE_PHOTO_DATA_FAILURE;
  payload: string;
}

export interface deletePhotoRequest {
  type: typeof DELETE_PHOTO_REQUEST;
  payload: string;
}

export interface deletePhotoSuccess {
  type: typeof DELETE_PHOTO_SUCCESS;
  payload: string;
}

export interface deletePhotoFailure {
  type: typeof DELETE_PHOTO_FAILURE;
  payload: string;
}

export interface VideoData {
  id?: string;
  link: string;
  username: string;
  about?: string;
  tags?: string[];
  createdAt?: Date;
}

export const SEND_NEW_VIDEO_DATA_REQUEST = "SEND_NEW_VIDEO_DATA_REQUEST";
export const SEND_NEW_VIDEO_DATA_SUCCESS = "SEND_NEW_VIDEO_DATA_SUCCESS";
export const SEND_NEW_VIDEO_DATA_FAILURE = "SEND_NEW_VIDEO_DATA_FAILURE";
export const FETCH_VIDEO_DATA_REQUEST = "FETCH_VIDEO_DATA_REQUEST";
export const FETCH_VIDEO_DATA_SUCCESS = "FETCH_VIDEO_DATA_SUCCESS";
export const FETCH_VIDEO_DATA_FAILURE = "FETCH_VIDEO_DATA_FAILURE";
export const UPDATE_VIDEO_DATA_REQUEST = "UPDATE_VIDEO_DATA_REQUEST";
export const UPDATE_VIDEO_DATA_SUCCESS = "UPDATE_VIDEO_DATA_SUCCESS";
export const UPDATE_VIDEO_DATA_FAILURE = "UPDATE_VIDEO_DATA_FAILURE";
export const DELETE_VIDEO_REQUEST = "DELETE_VIDEO_REQUEST";
export const DELETE_VIDEO_SUCCESS = "DELETE_VIDEO_SUCCESS";
export const DELETE_VIDEO_FAILURE = "DELETE_VIDEO_FAILURE";

export interface sendNewVideoDataRequest {
  type: typeof SEND_NEW_VIDEO_DATA_REQUEST;
  payload: VideoData;
}

export interface sendNewVideoDataSuccess {
  type: typeof SEND_NEW_VIDEO_DATA_SUCCESS;
  payload: VideoData;
}

export interface sendNewVideoDataFailure {
  type: typeof SEND_NEW_VIDEO_DATA_FAILURE;
  payload: string;
}

export interface fetchVideoDataRequest {
  type: typeof FETCH_VIDEO_DATA_REQUEST;
  payload: string;
}

export interface fetchVideoDataSuccess {
  type: typeof FETCH_VIDEO_DATA_SUCCESS;
  payload: VideoData;
}

export interface fetchVideoDataFailure {
  type: typeof FETCH_VIDEO_DATA_FAILURE;
  payload: string;
}

export interface fetchUserVideoDataRequest {
  type: typeof FETCH_VIDEO_DATA_REQUEST;
  payload: string;
}

export interface fetchUserVideoDataSuccess {
  type: typeof FETCH_VIDEO_DATA_SUCCESS;
  payload: VideoData[];
}

export interface fetchUserVideoDataFailure {
  type: typeof FETCH_VIDEO_DATA_FAILURE;
  payload: string;
}

export interface updateVideoDataRequest {
  type: typeof UPDATE_VIDEO_DATA_REQUEST;
  payload: VideoData;
}

export interface updateVideoDataSuccess {
  type: typeof UPDATE_VIDEO_DATA_SUCCESS;
  payload: VideoData;
}

export interface updateVideoDataFailure {
  type: typeof UPDATE_VIDEO_DATA_FAILURE;
  payload: string;
}

export interface deleteVideoRequest {
  type: typeof DELETE_VIDEO_REQUEST;
  payload: string;
}

export interface deleteVideoSuccess {
  type: typeof DELETE_VIDEO_SUCCESS;
  payload: string;
}

export interface deleteVideoFailure {
  type: typeof DELETE_VIDEO_FAILURE;
  payload: string;
}
