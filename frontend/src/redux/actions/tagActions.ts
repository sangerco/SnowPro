import axios from "axios";
import { Dispatch } from "redux";
import { URL } from '../../utils/config';
import {    TagData,
            SEND_NEW_TAG_DATA_REQUEST,
            SEND_NEW_TAG_DATA_SUCCESS,
            SEND_NEW_TAG_DATA_FAILURE,
            FETCH_TAG_DATA_REQUEST,
            FETCH_TAG_DATA_SUCCESS,
            FETCH_TAG_DATA_FAILURE,
            DELETE_TAG_DATA_REQUEST,
            DELETE_TAG_DATA_FAILURE,
            DELETE_TAG_DATA_SUCCESS,
            NewTagDataReturn,
            DeleteTag } from "../types/tagTypes";

export const sendNewTagDataRequest = ( tag: string ) => ({
    type: SEND_NEW_TAG_DATA_REQUEST,
    payload: { tag }
});

export const sendNewTagDataSuccess = ( sendNewTagDataReturn: NewTagDataReturn ) => ({
    type: SEND_NEW_TAG_DATA_SUCCESS,
    payload : sendNewTagDataReturn
});

export const sendNewTagDataFailure = ( error: string ) => ({
    type: SEND_NEW_TAG_DATA_FAILURE,
    payload: error
});

export const fetchAllTagDataRequest = () => ({
    type: FETCH_TAG_DATA_REQUEST
});

export const fetchAllTagDataSuccess = ( tagData: TagData[] ) => ({
    type: FETCH_TAG_DATA_SUCCESS,
    payload: tagData
});

export const fetchAllTagDataFailure = ( error: string ) => ({
    type: FETCH_TAG_DATA_FAILURE,
    payload: error
});

export const fetchTagDatabyIdRequest = ( id: string ) => ({
    type: FETCH_TAG_DATA_REQUEST,
    payload: id
});

export const fetchTagDatabyIdSuccess = ( tagData: TagData ) => ({
    type: FETCH_TAG_DATA_SUCCESS,
    payload: tagData
});

export const fetchTagDatabyIdFailure = ( error: string ) => ({
    type: FETCH_TAG_DATA_FAILURE,
    payload: error
});

export const deleteTagRequest = ( deleteTag: DeleteTag ) => ({
    type: DELETE_TAG_DATA_REQUEST,
    payload: deleteTag
});

export const deleteTagSuccess = ( id: string ) => ({
    type: DELETE_TAG_DATA_SUCCESS,
    payload: id
});

export const deleteTagFailure = ( error: string ) => ({
    type: DELETE_TAG_DATA_FAILURE,
    payload: error
});

export const sendNewTagData = ( tag: string ) => {
    return async (dispatch: Dispatch) => {
        dispatch(sendNewTagDataRequest(tag));

        try {
            const response = await axios.post(`${URL}/api/tags`, {tag: tag});
            dispatch(sendNewTagDataSuccess(response.data));
        } catch (error: any) {
            dispatch(sendNewTagDataFailure(error.message));
        }
    }
};

export const fetchTagData = () => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchAllTagDataRequest());

        try {
            const response = await axios.get(`${URL}/tags`);
            dispatch(fetchAllTagDataSuccess(response.data.tags));
        } catch (error: any) {
            dispatch(fetchAllTagDataFailure(error.message));
        }
    }
}

export const fetchTagDataById = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchTagDatabyIdRequest(id));

        try {
            const response = await axios.get(`${URL}/tags/${id}`);
            const responseData: TagData = response.data.tag;
            dispatch(fetchTagDatabyIdSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchTagDatabyIdFailure(error.message));
        }
    }
};

export const deleteTagDataById = (deleteTag: DeleteTag) => {
    return async (dispatch: Dispatch) => {
        dispatch(deleteTagRequest(deleteTag));
        const id = deleteTag.id;

        try {
            const response = await axios.delete(`${URL}/api/tags/${id}`);
            const responseData: string = response.data.id; 
            dispatch(deleteTagSuccess(responseData));
        } catch (error: any) {
            dispatch(deleteTagFailure(error.message))
        }
    }
};