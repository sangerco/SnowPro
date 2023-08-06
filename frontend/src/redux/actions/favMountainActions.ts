import axios from "axios";
import { Dispatch } from "redux";
import { URL } from "../../config";
import {  NewFavMountainData,
            FavMountainDataReturn,
            SEND_NEW_FAV_MOUNTAIN_DATA_REQUEST,
            SEND_NEW_FAV_MOUNTAIN_DATA_SUCCESS,
            SEND_NEW_FAV_MOUNTAIN_DATA_FAILURE,
            FETCH_FAV_MOUNTAIN_DATA_REQUEST,
            FETCH_FAV_MOUNTAIN_DATA_SUCCESS,
            FETCH_FAV_MOUNTAIN_DATA_FAILURE,
            DELETE_FAV_MOUNTAIN_REQUEST,
            DELETE_FAV_MOUNTAIN_SUCCESS,
            DELETE_FAV_MOUNTAIN_FAILURE } from "../types/favMountainTypes";
;

export const sendNewFavMountainRequest = (userId: string, skiAreaSlug: string) => ({
    type: SEND_NEW_FAV_MOUNTAIN_DATA_REQUEST,
    payload: { userId, skiAreaSlug }
});

export const sendNewFavMountainSuccess = (sendNewFavMountainData: NewFavMountainData) => ({
    type: SEND_NEW_FAV_MOUNTAIN_DATA_SUCCESS,
    payload: sendNewFavMountainData
});

export const sendNewFavMountainFailure = (error: string) => ({
    type: SEND_NEW_FAV_MOUNTAIN_DATA_FAILURE,
    payload: error
});

export const fetchFavMountainDataRequest = (userId: string) => ({
    type: FETCH_FAV_MOUNTAIN_DATA_REQUEST,
    payload: { userId }
});

export const fetchFavMountainDataSuccess = (favMountains: FavMountainDataReturn[]) => ({
    type: FETCH_FAV_MOUNTAIN_DATA_SUCCESS,
    payload: favMountains
});

export const fetchFavMountainDataFailure = (error: string) => ({
    type: FETCH_FAV_MOUNTAIN_DATA_FAILURE,
    payload: error
});

export const deleteFavMountainRequest = (id: string) => ({
    type: DELETE_FAV_MOUNTAIN_REQUEST,
    payload: id
});

export const deleteFavMountainSuccess = (success: string) => ({
    type: DELETE_FAV_MOUNTAIN_SUCCESS,
    payload: success
});

export const deleteFavMountainFailure = (error: string) => ({
    type: DELETE_FAV_MOUNTAIN_FAILURE,
    payload: error
});

export const sendNewFavMountainData = (userId: string, skiAreaSlug: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(sendNewFavMountainRequest(userId, skiAreaSlug));

        try {
            const response = await axios.post(`${URL}/fav_mountain`, 
                {userId: userId, skiAreaSlug: skiAreaSlug});
            dispatch(sendNewFavMountainSuccess(response.data));
        } catch (error: any) {
            dispatch(sendNewFavMountainFailure(error.message));
        }
    }
};

export const fetchFavMountainData = (userId: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchFavMountainDataRequest(userId));

        try {
            const response = await axios.get(`${URL}/users/${userId}/fav-mountains`);
            const responseData: FavMountainDataReturn[] = response.data.favMountains;
            dispatch(fetchFavMountainDataSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchFavMountainDataFailure(error.message));
        }
    }
};

export const deleteFavMountain = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(deleteFavMountainRequest(id));

        try {
            const response = await axios.delete(`${URL}/api/fav_mountain/${id}`);
            dispatch(fetchFavMountainDataSuccess(response.data));
        } catch (error: any) {
            dispatch(deleteFavMountainFailure(error.message));
        }
    }
};