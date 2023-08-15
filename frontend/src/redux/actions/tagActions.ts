import axios from 'axios';
import { Dispatch } from 'redux';
import { URL } from '../../utils/config';
import {    TagData,
            SEND_NEW_TAG_DATA_REQUEST,
            SEND_NEW_TAG_DATA_SUCCESS,
            SEND_NEW_TAG_DATA_FAILURE,
            FETCH_TAG_DATA_REQUEST,
            FETCH_TAG_DATA_SUCCESS,
            FETCH_TAG_DATA_FAILURE,
            DELETE_TAG_DATA_REQUEST,
            DELETE_TAG_DATA_SUCCESS,
            DELETE_TAG_DATA_FAILURE } from '../types/tagTypes';

export const sendNewTagDataRequest = (tag: string) => ({
    type: SEND_NEW_TAG_DATA_REQUEST,
    payload: tag
});

export const sendNewTagDataSuccess = (sendNewTagDataReturn: TagData) => ({
    type: SEND_NEW_TAG_DATA_SUCCESS,
    payload: sendNewTagDataReturn
});

export const sendNewTagDataFailure = (error: string) => ({
    type: SEND_NEW_TAG_DATA_FAILURE,
    payload: error
});

export const fetchTagDataRequest = (id: string) => ({
    type: FETCH_TAG_DATA_REQUEST,
    payload: id
});

export const fetchTagDataSuccess = (fetchTagDataReturn: TagData) => ({
    type: FETCH_TAG_DATA_SUCCESS,
    payload: fetchTagDataReturn
});

export const fetchTagDataFailure = (error: string) => ({
    type: FETCH_TAG_DATA_FAILURE,
    payload: error
});

export const fetchAllTagDataRequest = () => ({
    type: FETCH_TAG_DATA_REQUEST
});

export const fetchAllTagDataSuccess = (fetchTagDataReturn: TagData) => ({
    type: FETCH_TAG_DATA_SUCCESS,
    payload: fetchTagDataReturn
});

export const fetchAllTagDataFailure = (error: string) => ({
    type: FETCH_TAG_DATA_FAILURE,
    payload: error
});

export const deleteTagRequest = (id: string) => ({
    type: DELETE_TAG_DATA_REQUEST,
    payload: id
});

export const deleteTagSuccess = (success: string) => ({
    type: DELETE_TAG_DATA_SUCCESS,
    payload: success
});

export const deleteTagFailure = (error: string) => ({
    type: DELETE_TAG_DATA_FAILURE,
    payload: error
});

export const sendNewTagData = (tag: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(sendNewTagDataRequest(tag));

        try {
            const response = await axios.post(`${URL}/api/tags`, {tag: tag});
            const responseData = response.data.tag;
            dispatch(sendNewTagDataSuccess(responseData));
        } catch (error: any) {
            dispatch(sendNewTagDataFailure(error.message));
        }
    };
};

export const fetchTagData = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchTagDataRequest(id));

        try {
            const response = await axios.get(`${URL}/tags/${id}`);
            const responseData = response.data.tag;
            dispatch(fetchTagDataSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchTagDataFailure(error.message));
        }
    };
};

export const fetchAllTagData = () => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchAllTagDataRequest());

        try {
            const response = await axios.get(`${URL}/tags`);
            const responseData = response.data.tags;
            dispatch(fetchAllTagDataSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchAllTagDataFailure(error.message));
        }
    };
};

export const deleteTag = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(deleteTagRequest(id));

        try {
            const response = await axios.delete(`${URL}/api/tags/${id}`);
            const responseData = response.data
            dispatch(deleteTagSuccess(responseData));
        } catch (error: any) {
            dispatch(deleteTagFailure(error.message));
        }
    };
};
