export interface FavMountainData {
  userId: string;
  skiAreaSlug: string;
}

export interface FavMountainDataReturn {
  userId: string;
  skiAreaSlug: string;
  skiAreaName?: string;
}

export const SEND_NEW_FAV_MOUNTAIN_DATA_REQUEST =
  "SEND_NEW_FAV_MOUNTAIN_DATA_REQUEST";
export const SEND_NEW_FAV_MOUNTAIN_DATA_SUCCESS =
  "SEND_NEW_FAV_MOUNTAIN_DATA_SUCCESS";
export const SEND_NEW_FAV_MOUNTAIN_DATA_FAILURE =
  "SEND_NEW_FAV_MOUNTAIN_DATA_FAILURE";
export const FETCH_FAV_MOUNTAIN_DATA_REQUEST =
  "FETCH_FAV_MOUNTAIN_DATA_REQUEST";
export const FETCH_FAV_MOUNTAIN_DATA_SUCCESS =
  "FETCH_FAV_MOUNTAIN_DATA_SUCCESS";
export const FETCH_FAV_MOUNTAIN_DATA_FAILURE =
  "FETCH_FAV_MOUNTAIN_DATA_FAILURE";
export const DELETE_FAV_MOUNTAIN_DATA_REQUEST =
  "DELETE_FAV_MOUNTAIN_DATA_REQUEST";
export const DELETE_FAV_MOUNTAIN_DATA_SUCCESS =
  "DELETE_FAV_MOUNTAIN_DATA_SUCCESS";
export const DELETE_FAV_MOUNTAIN_DATA_FAILURE =
  "DELETE_FAV_MOUNTAIN_DATA_FAILURE";

export interface sendNewFavMountainDataRequest {
  type: typeof SEND_NEW_FAV_MOUNTAIN_DATA_REQUEST;
  payload: FavMountainData;
}

export interface sendNewFavMountainDataSuccess {
  type: typeof SEND_NEW_FAV_MOUNTAIN_DATA_SUCCESS;
  payload: FavMountainDataReturn;
}

export interface sendNewFavMountainDataFailure {
  type: typeof SEND_NEW_FAV_MOUNTAIN_DATA_FAILURE;
  payload: string;
}

export interface fetchFavMountainDataRequest {
  type: typeof FETCH_FAV_MOUNTAIN_DATA_REQUEST;
  payload: string;
}

export interface fetchFavMountainDataSuccess {
  type: typeof FETCH_FAV_MOUNTAIN_DATA_SUCCESS;
  payload: FavMountainDataReturn[];
}

export interface fetchFavMountainDataFailure {
  type: typeof FETCH_FAV_MOUNTAIN_DATA_FAILURE;
  payload: string;
}

export interface deleteFavMountainDataRequest {
  type: typeof DELETE_FAV_MOUNTAIN_DATA_REQUEST;
  payload: string;
}

export interface deleteFavMountainDataSuccess {
  type: typeof DELETE_FAV_MOUNTAIN_DATA_SUCCESS;
  payload: string;
}

export interface deleteFavMountainDataFailure {
  type: typeof DELETE_FAV_MOUNTAIN_DATA_FAILURE;
  payload: string;
}
