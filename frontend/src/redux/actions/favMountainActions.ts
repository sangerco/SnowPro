import axios from "axios";
import { URL } from "../../utils/config";
import { Dispatch } from "redux";
import {
  FavMountainData,
  FavMountainDataReturn,
  SEND_NEW_FAV_MOUNTAIN_DATA_REQUEST,
  SEND_NEW_FAV_MOUNTAIN_DATA_SUCCESS,
  SEND_NEW_FAV_MOUNTAIN_DATA_FAILURE,
  FETCH_FAV_MOUNTAIN_DATA_REQUEST,
  FETCH_FAV_MOUNTAIN_DATA_SUCCESS,
  FETCH_FAV_MOUNTAIN_DATA_FAILURE,
  DELETE_FAV_MOUNTAIN_DATA_REQUEST,
  DELETE_FAV_MOUNTAIN_DATA_SUCCESS,
  DELETE_FAV_MOUNTAIN_DATA_FAILURE,
} from "../types/favMountainsTypes";

export const sendNewFavMountainDataRequest = (
  favMountainData: FavMountainData
) => ({
  type: SEND_NEW_FAV_MOUNTAIN_DATA_REQUEST,
  payload: favMountainData,
});

export const sendNewFavMountainDataSuccess = (
  favMountainDataReturn: FavMountainDataReturn
) => ({
  type: SEND_NEW_FAV_MOUNTAIN_DATA_SUCCESS,
  payload: favMountainDataReturn,
});

export const sendNewFavMountainDataFailure = (error: string) => ({
  type: SEND_NEW_FAV_MOUNTAIN_DATA_FAILURE,
  payload: error,
});

export const fetchFavMountainDataByUserIdRequest = (userId: string) => ({
  type: FETCH_FAV_MOUNTAIN_DATA_REQUEST,
  payload: userId,
});

export const fetchFavMountainDataByUserIdSuccess = (
  favMountainDataReturn: FavMountainDataReturn[]
) => ({
  type: FETCH_FAV_MOUNTAIN_DATA_SUCCESS,
  payload: favMountainDataReturn,
});

export const fetchFavMountainDataByUserIdFailure = (error: string) => ({
  type: FETCH_FAV_MOUNTAIN_DATA_FAILURE,
  payload: error,
});

export const fetchFavMountainDataBySkiAreaSlugRequest = (
  skiAreaSlug: string
) => ({
  type: FETCH_FAV_MOUNTAIN_DATA_REQUEST,
  payload: skiAreaSlug,
});

export const fetchFavMountainDataBySkiAreaSlugSuccess = (
  favMountainDataReturn: FavMountainDataReturn[]
) => ({
  type: FETCH_FAV_MOUNTAIN_DATA_SUCCESS,
  payload: favMountainDataReturn,
});

export const fetchFavMountainDataBySkiAreaSlugFailure = (error: string) => ({
  type: FETCH_FAV_MOUNTAIN_DATA_FAILURE,
  payload: error,
});

export const deleteFavMountainDataRequest = (id: string) => ({
  type: DELETE_FAV_MOUNTAIN_DATA_REQUEST,
  payload: id,
});

export const deleteFavMountainDataSuccess = (success: string) => ({
  type: DELETE_FAV_MOUNTAIN_DATA_SUCCESS,
  payload: success,
});

export const deleteFavMountainDataFailure = (error: string) => ({
  type: DELETE_FAV_MOUNTAIN_DATA_FAILURE,
  payload: error,
});

export const sendNewFavMountainData = (favMountainData: FavMountainData) => {
  return async (dispatch: Dispatch) => {
    dispatch(sendNewFavMountainDataRequest(favMountainData));

    try {
      const response = await axios.post(`${URL}/api/fav-mountain`, {
        userId: favMountainData.userId,
        skiAreaSlug: favMountainData.skiAreaSlug,
      });
      const responseData = response.data.favMountain;
      dispatch(sendNewFavMountainDataSuccess(responseData));
    } catch (error: any) {
      dispatch(sendNewFavMountainDataFailure(error.message));
    }
  };
};

export const fetchFavMountainDataByUserId = (userId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchFavMountainDataByUserIdRequest(userId));

    try {
      const response = await axios.get(`${URL}/users/${userId}/fav-mountains`);
      const responseData = response.data.favMountains;
      dispatch(fetchFavMountainDataByUserIdSuccess(responseData));
    } catch (error: any) {
      dispatch(fetchFavMountainDataByUserIdFailure(error.message));
    }
  };
};

export const fetchFavMountainDataBySkiAreaSlug = (skiAreaSlug: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchFavMountainDataBySkiAreaSlugRequest(skiAreaSlug));

    try {
      const response = await axios.get(
        `${URL}/ski-areas/${skiAreaSlug}/users-favorited-by`
      );
      const responseData = response.data.favMountains;
      dispatch(fetchFavMountainDataByUserIdSuccess(responseData));
    } catch (error: any) {
      dispatch(fetchFavMountainDataBySkiAreaSlugFailure(error.message));
    }
  };
};

export const deleteFavMountainData = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteFavMountainDataRequest(id));

    try {
      const response = await axios.delete(`${URL}/api/fav-mountain/${id}`);
      dispatch(deleteFavMountainDataSuccess(response.data));
    } catch (error: any) {
      dispatch(deleteFavMountainDataFailure(error.message));
    }
  };
};
