import axios from 'axios';
import { Dispatch } from 'redux';
import { URL } from '../../config';
import {    PhotoData,
            SEND_NEW_PHOTO_DATA_REQUEST,
            SEND_NEW_PHOTO_DATA_SUCCESS,
            SEND_NEW_PHOTO_DATA_FAILURE,
            FETCH_PHOTO_DATA_REQUEST,
            FETCH_PHOTO_DATA_SUCCESS,
            FETCH_PHOTO_DATA_FAILURE,
            FETCH_USER_PHOTO_DATA_REQUEST,
            FETCH_USER_PHOTO_DATA_SUCCESS,
            FETCH_USER_PHOTO_DATA_FAILURE,
            DELETE_PHOTO_REQUEST,
            DELETE_PHOTO_SUCCESS,
            DELETE_PHOTO_FAILURE,
            NewPhotoDataReturn,
            DeletePhoto,
            VideoData,
            SEND_NEW_VIDEO_DATA_REQUEST,
            SEND_NEW_VIDEO_DATA_SUCCESS,
            SEND_NEW_VIDEO_DATA_FAILURE,
            FETCH_VIDEO_DATA_REQUEST,
            FETCH_VIDEO_DATA_SUCCESS,
            FETCH_VIDEO_DATA_FAILURE,
            FETCH_USER_VIDEO_DATA_REQUEST,
            FETCH_USER_VIDEO_DATA_SUCCESS,
            FETCH_USER_VIDEO_DATA_FAILURE,
            DELETE_VIDEO_REQUEST,
            DELETE_VIDEO_SUCCESS,
            DELETE_VIDEO_FAILURE,
            NewVideoDataReturn,
            DeleteVideo} from '../types/mediaTypes';

export const sendNewPhotoDataRequest = (link: string) => ({
    type: SEND_NEW_PHOTO_DATA_REQUEST,
    payload: { link }
});

export const sendNewPhotoDataSuccess = (sendNewPhotoDataReturn: NewPhotoDataReturn) => ({
    type: SEND_NEW_PHOTO_DATA_SUCCESS,
    payload: sendNewPhotoDataReturn
});

export const sendNewPhotoDataFailure = (error: string) => ({
    type: SEND_NEW_PHOTO_DATA_FAILURE,
    payload: error
});

export const fetchPhotoDataByIdRequest = (id: string) => ({
    type: FETCH_PHOTO_DATA_REQUEST,
    payload: id
});

export const fetchPhotoDataByIdSuccess = (photoData: PhotoData) => ({
    type: FETCH_PHOTO_DATA_SUCCESS,
    payload: photoData
});

export const fetchPhotoDataByIdFailure = (error: string) => ({
    type: FETCH_PHOTO_DATA_FAILURE,
    payload: error
});

export const fetchPhotoDataByUserIdRequest = (userId: string) => ({
    type: FETCH_USER_PHOTO_DATA_REQUEST,
    payload: userId
});

export const fetchPhotoDataByUserIdSuccess = (photoData: PhotoData[]) => ({
    type: FETCH_USER_PHOTO_DATA_SUCCESS,
    payload: photoData
});

export const fetchPhotoDataByUserIdFailure = (error: string) => ({
    type: FETCH_USER_PHOTO_DATA_FAILURE,
    payload: error
});
export const deletePhotoRequest = (deletePhoto: DeletePhoto) => ({
    type: DELETE_PHOTO_REQUEST,
    payload: deletePhoto
});

export const deletePhotoSuccess = (deletePhoto: DeletePhoto) => ({
    type: DELETE_PHOTO_SUCCESS,
    payload: deletePhoto
});

export const deletePhotoFailure = (error: string) => ({
    type: DELETE_PHOTO_FAILURE,
    payload: error
});

export const sendNewPhoto = (link: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(sendNewPhotoDataRequest(link));

        try {
            const response = await axios.post(`${URL}/api/photos`, { link: link });
            dispatch(sendNewPhotoDataSuccess(response.data.photo));
        } catch (error: any) {
            dispatch(sendNewPhotoDataFailure(error.message));
        }
    }
};

export const fetchPhotoById = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchPhotoDataByIdRequest(id));

        try { 
            const response = await axios.get(`${URL}/photo/${id}`);
            const responseData: PhotoData = response.data.photo;
            dispatch(fetchPhotoDataByIdSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchPhotoDataByIdFailure(error.message));
        }
    }
};

export const fetchPhotoByUserId = (userId: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchPhotoDataByIdRequest(userId));

        try { 
            const response = await axios.get(`${URL}/photo/${id}`);
            const responseData: PhotoData[] = response.data.photo;
            dispatch(fetchPhotoDataByIdSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchPhotoDataByIdFailure(error.message));
        }
    }
};

export const deletePhotoById = (deletePhoto: DeletePhoto) => {
    return async (dispatch: Dispatch) => {
        dispatch(deletePhotoRequest(deletePhoto));
        const id = deletePhoto.id;

        try {
            const response = await axios.delete(`${URL}/photo/${id}`);
            const responseData: string = response.data.id;
            dispatch(deletePhotoFailure(responseData));
        } catch (error: any) {
            dispatch(deletePhotoFailure(error.message));
        }
    }
};

export const sendNewVideoDataRequest = (link: string) => ({
    type: SEND_NEW_VIDEO_DATA_REQUEST,
    payload: { link }
});

export const sendNewVideoDataSuccess = (sendNewVideoDataReturn: NewVideoDataReturn) => ({
    type: SEND_NEW_VIDEO_DATA_SUCCESS,
    payload: sendNewVideoDataReturn
});

export const sendNewVideoDataFailure = (error: string) => ({
    type: SEND_NEW_VIDEO_DATA_FAILURE,
    payload: error
});

export const fetchVideoDataByIdRequest = (id: string) => ({
    type: FETCH_VIDEO_DATA_REQUEST,
    payload: id
});

export const fetchVideoDataByIdSuccess = (videoData: VideoData) => ({
    type: FETCH_VIDEO_DATA_SUCCESS,
    payload: videoData
});

export const fetchVideoDataByIdFailure = (error: string) => ({
    type: FETCH_VIDEO_DATA_FAILURE,
    payload: error
});

export const deleteVideoRequest = (deleteVideo: DeleteVideo) => ({
    type: DELETE_VIDEO_REQUEST,
    payload: deleteVideo
});

export const deleteVideoSuccess = (deleteVideo: DeleteVideo) => ({
    type: DELETE_VIDEO_SUCCESS,
    payload: deleteVideo
});

export const deleteVideoFailure = (error: string) => ({
    type: DELETE_VIDEO_FAILURE,
    payload: error
});

export const sendNewVideo = (link: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(sendNewVideoDataRequest(link));

        try {
            const response = await axios.post(`${URL}/api/videos`, { link: link });
            dispatch(sendNewVideoDataSuccess(response.data.video));
        } catch (error: any) {
            dispatch(sendNewVideoDataFailure(error.message));
        }
    }
};

export const fetchVideoById = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchVideoDataByIdRequest(id));

        try { 
            const response = await axios.get(`${URL}/video/${id}`);
            const responseData: VideoData = response.data.video;
            dispatch(fetchVideoDataByIdSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchVideoDataByIdFailure(error.message));
        }
    }
};

export const deleteVideoById = (deleteVideo: DeleteVideo) => {
    return async (dispatch: Dispatch) => {
        dispatch(deleteVideoRequest(deleteVideo));
        const id = deleteVideo.id;

        try {
            const response = await axios.delete(`${URL}/video/${id}`);
            const responseData: string = response.data.id;
            dispatch(deleteVideoFailure(responseData));
        } catch (error: any) {
            dispatch(deleteVideoFailure(error.message));
        }
    }
};