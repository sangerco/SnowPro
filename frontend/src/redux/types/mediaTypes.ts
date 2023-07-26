export interface PhotoData {
    id: string;
    link: string;
};

export interface NewPhotoData {
    link: string;
};

export interface NewPhotoDataReturn {
    id: string;
    link: string;
};

export interface DeletePhoto {
    id: string;
};

export const SEND_NEW_PHOTO_DATA_REQUEST = 'SEND_NEW_PHOTO_DATA_REQUEST';
export const SEND_NEW_PHOTO_DATA_SUCCESS = 'SEND_NEW_PHOTO_DATA_SUCCESS';
export const SEND_NEW_PHOTO_DATA_FAILURE = 'SEND_NEW_PHOTO_DATA_FAILURE';
export const FETCH_PHOTO_DATA_REQUEST = 'FETCH_PHOTO_DATA_REQUEST';
export const FETCH_PHOTO_DATA_SUCCESS = 'FETCH_PHOTO_DATA_SUCCESS';
export const FETCH_PHOTO_DATA_FAILURE = 'FETCH_PHOTO_DATA_FAILURE';
export const DELETE_PHOTO_REQUEST = 'DELETE_PHOTO_REQUEST';
export const DELETE_PHOTO_SUCCESS = 'DELETE_PHOTO_SUCCESS';
export const DELETE_PHOTO_FAILURE = 'DELETE_PHOTO_FAILURE';

export interface sendNewPhotoDataRequestAction {
    type: typeof SEND_NEW_PHOTO_DATA_REQUEST;
    payload: NewPhotoData;
};

export interface sendNewPhotoDataSuccessAction {
    type: typeof SEND_NEW_PHOTO_DATA_SUCCESS;
    payload: NewPhotoDataReturn;
};

export interface sendNewPhotoDataFailureAction {
    type: typeof SEND_NEW_PHOTO_DATA_FAILURE;
    payload: string;
};

export interface fetchPhotoDataRequestAction {
    type: typeof FETCH_PHOTO_DATA_REQUEST;
    payload: string;
};

export interface fetchPhotoDataSuccessAction {
    type: typeof FETCH_PHOTO_DATA_SUCCESS;
    payload: PhotoData;
};

export interface fetchPhotoDataFailureAction {
    type: typeof FETCH_PHOTO_DATA_FAILURE;
    payload: string;
};

export interface deletePhotoRequestAction {
    type: typeof DELETE_PHOTO_REQUEST;
    payload: DeletePhoto;
};

export interface deletePhotoSuccessAction {
    type: typeof DELETE_PHOTO_SUCCESS;
    payload: string;
};

export interface deletePhotoFailureAction {
    type: typeof DELETE_PHOTO_FAILURE;
    payload: string;
};

export interface VideoData {
    id: string;
    link: string;
};

export interface NewVideoData {
    link: string;
};

export interface NewVideoDataReturn {
    id: string;
    link: string;
};

export interface DeleteVideo {
    id: string;
};

export const SEND_NEW_VIDEO_DATA_REQUEST = 'SEND_NEW_VIDEO_DATA_REQUEST';
export const SEND_NEW_VIDEO_DATA_SUCCESS = 'SEND_NEW_VIDEO_DATA_SUCCESS';
export const SEND_NEW_VIDEO_DATA_FAILURE = 'SEND_NEW_VIDEO_DATA_FAILURE';
export const FETCH_VIDEO_DATA_REQUEST = 'FETCH_VIDEO_DATA_REQUEST';
export const FETCH_VIDEO_DATA_SUCCESS = 'FETCH_VIDEO_DATA_SUCCESS';
export const FETCH_VIDEO_DATA_FAILURE = 'FETCH_VIDEO_DATA_FAILURE';
export const DELETE_VIDEO_REQUEST = 'DELETE_VIDEO_REQUEST';
export const DELETE_VIDEO_SUCCESS = 'DELETE_VIDEO_SUCCESS';
export const DELETE_VIDEO_FAILURE = 'DELETE_VIDEO_FAILURE';

export interface sendNewVideoDataRequestAction {
    type: typeof SEND_NEW_VIDEO_DATA_REQUEST;
    payload: NewVideoData;
};

export interface sendNewVideoDataSuccessAction {
    type: typeof SEND_NEW_VIDEO_DATA_SUCCESS;
    payload: NewVideoDataReturn;
};

export interface sendNewVideoDataFailureAction {
    type: typeof SEND_NEW_VIDEO_DATA_FAILURE;
    payload: string;
};

export interface fetchVideoDataRequestAction {
    type: typeof FETCH_VIDEO_DATA_REQUEST;
    payload: string;
};

export interface fetchVideoDataSuccessAction {
    type: typeof FETCH_VIDEO_DATA_SUCCESS;
    payload: VideoData;
};

export interface fetchVideoDataFailureAction {
    type: typeof FETCH_VIDEO_DATA_FAILURE;
    payload: string;
};

export interface deleteVideoRequestAction {
    type: typeof DELETE_VIDEO_REQUEST;
    payload: DeleteVideo;
};

export interface deleteVideoSuccessAction {
    type: typeof DELETE_VIDEO_SUCCESS;
    payload: string;
};

export interface deleteVideoFailureAction {
    type: typeof DELETE_VIDEO_FAILURE;
    payload: string;
};