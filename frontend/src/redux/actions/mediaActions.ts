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
            UPDATE_PHOTO_DATA_REQUEST,
            UPDATE_PHOTO_DATA_SUCCESS,
            UPDATE_PHOTO_DATA_FAILURE,
            DELETE_PHOTO_REQUEST,
            DELETE_PHOTO_SUCCESS,
            DELETE_PHOTO_FAILURE,
            NewPhotoDataReturn,
            UpdatePhotoData,
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
            UPDATE_VIDEO_DATA_REQUEST,
            UPDATE_VIDEO_DATA_SUCCESS,
            UPDATE_VIDEO_DATA_FAILURE,
            DELETE_VIDEO_REQUEST,
            DELETE_VIDEO_SUCCESS,
            DELETE_VIDEO_FAILURE,
            NewVideoDataReturn,
            UpdateVideoData,
            DeleteVideo} from '../types/mediaTypes';

export const sendNewPhotoDataRequest = (username: string, link: string, about: string, tags: string[]) => ({
    type: SEND_NEW_PHOTO_DATA_REQUEST,
    payload: { username, link, about, tags }
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

export const fetchPhotoDataByUsernameRequest = (username: string) => ({
    type: FETCH_USER_PHOTO_DATA_REQUEST,
    payload: username
});

export const fetchPhotoDataByUsernameSuccess = (photoData: PhotoData[]) => ({
    type: FETCH_USER_PHOTO_DATA_SUCCESS,
    payload: photoData
});

export const fetchPhotoDataByUsernameFailure = (error: string) => ({
    type: FETCH_USER_PHOTO_DATA_FAILURE,
    payload: error
});

export const updatePhotoRequest = (id: string) => ({
    type: UPDATE_PHOTO_DATA_REQUEST,
    payload: id
});

export const updatePhotoSuccess = (updatePhotoData: UpdatePhotoData) => ({
    type: UPDATE_PHOTO_DATA_SUCCESS,
    payload: updatePhotoData
});

export const updatePhotoFailure = (error: string) => ({
    type: UPDATE_PHOTO_DATA_FAILURE,
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

export const sendNewPhoto = (username: string, link: string, about: string, tags: string[]) => {
    return async (dispatch: Dispatch) => {
        dispatch(sendNewPhotoDataRequest(username, link, about, tags));

        try {
            const response = await axios.post(`${URL}/api/photos`, 
                {   link: link,
                    about: about,
                    tags: tags,
                    username: username });
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

export const fetchPhotosByUsername = (username: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchPhotoDataByUsernameRequest(username));

        try { 
            const response = await axios.get(`${URL}/users/${username}/photos`);
            const responseData: PhotoData[] = response.data.photos;
            dispatch(fetchPhotoDataByUsernameSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchPhotoDataByUsernameFailure(error.message));
        }
    }
};

export const updatePhoto = (id: string, data: UpdatePhotoData) => {
    return async (dispatch: Dispatch) => {
        dispatch(updatePhotoRequest(id));

        try {
            const response = await axios.patch(`${URL}/api/photo/${id}`, {data});
            const responseData: UpdatePhotoData = response.data.photo;
            dispatch(updatePhotoSuccess(responseData));
        } catch (error: any) {
            dispatch(updatePhotoFailure(error.message));
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

export const sendNewVideoDataRequest = (username: string, link: string, about: string, tags: string[]) => ({
    type: SEND_NEW_VIDEO_DATA_REQUEST,
    payload: { username, link, about, tags }
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

export const fetchVideoDataByUsernameRequest = (username: string) => ({
    type: FETCH_USER_VIDEO_DATA_REQUEST,
    payload: username
});

export const fetchVideoDataByUsernameSuccess = (videoData: VideoData[]) => ({
    type: FETCH_USER_VIDEO_DATA_SUCCESS,
    payload: videoData
});

export const fetchVideoDataByUsernameFailure = (error: string) => ({
    type: FETCH_USER_VIDEO_DATA_FAILURE,
    payload: error
});

export const updateVideoRequest = (id: string) => ({
    type: UPDATE_VIDEO_DATA_REQUEST,
    payload: id
});

export const updateVideoSuccess = (updateVideoData: UpdateVideoData) => ({
    type: UPDATE_VIDEO_DATA_SUCCESS,
    payload: updateVideoData
});

export const updateVideoFailure = (error: string) => ({
    type: UPDATE_VIDEO_DATA_FAILURE,
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

export const sendNewVideo = (username: string, link: string, about: string, tags: string[]) => {
    return async (dispatch: Dispatch) => {
        dispatch(sendNewVideoDataRequest(username, link, about, tags));

        try {
            const response = await axios.post(`${URL}/api/videos`, 
                {   link: link,
                    about: about,
                    tags: tags,
                    username: username });
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

export const fetchVideosByUsername = (username: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchVideoDataByUsernameRequest(username));

        try { 
            const response = await axios.get(`${URL}/users/${username}/videos`);
            const responseData: VideoData[] = response.data.videos;
            dispatch(fetchVideoDataByUsernameSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchVideoDataByUsernameFailure(error.message));
        }
    }
};

export const updateVideo = (id: string, data: UpdateVideoData) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateVideoRequest(id));

        try {
            const response = await axios.patch(`${URL}/api/video/${id}`, {data});
            const responseData: UpdateVideoData = response.data.video;
            dispatch(updateVideoSuccess(responseData));
        } catch (error: any) {
            dispatch(updateVideoFailure(error.message));
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