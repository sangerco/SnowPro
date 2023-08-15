export interface FavMountain {
    userId: string;
    skiAreaSlug: string;
};

export interface NewFavMountainData {
    userId: string;
    skiAreaSlug: string;
};

export interface NewFavMountainDataReturn {
    id: string;
    userId: string;
    skiAreaSlug: string;
};

export interface FavMountainDataReturn {
    userId: string,
    skiAreaSlug: string,
    skiAreaName: string;
}

export const SEND_NEW_FAV_MOUNTAIN_DATA_REQUEST = 'SEND_NEW_FAV_MOUNTAIN_DATA_REQUEST';
export const SEND_NEW_FAV_MOUNTAIN_DATA_SUCCESS = 'SEND_NEW_FAV_MOUNTAIN_DATA_SUCCESS';
export const SEND_NEW_FAV_MOUNTAIN_DATA_FAILURE = 'SEND_NEW_FAV_MOUNTAIN_DATA_SUCCESS';
export const FETCH_FAV_MOUNTAIN_DATA_REQUEST = 'FETCH_FAV_MOUNTAIN_DATA_REQUEST';
export const FETCH_FAV_MOUNTAIN_DATA_SUCCESS = 'FETCH_FAV_MOUNTAIN_DATA_SUCCESS';
export const FETCH_FAV_MOUNTAIN_DATA_FAILURE = 'FETCH_FAV_MOUNTAIN_DATA_FAILURE';
export const DELETE_FAV_MOUNTAIN_REQUEST = 'DELETE_FAV_MOUNTAIN_REQUEST';
export const DELETE_FAV_MOUNTAIN_SUCCESS = 'DELETE_FAV_MOUNTAIN_SUCCESS';
export const DELETE_FAV_MOUNTAIN_FAILURE = 'DELETE_FAV_MOUNTAIN_FAILURE';

export interface sendNewFavMountainDataRequestAction {
    type: typeof SEND_NEW_FAV_MOUNTAIN_DATA_REQUEST,
    payload: NewFavMountainData
};

export interface sendNewFavMountainDataSuccessAction {
    type: typeof SEND_NEW_FAV_MOUNTAIN_DATA_SUCCESS,
    payload: FavMountain
};

export interface sendNewFavMountainDataFailureAction {
    type: typeof SEND_NEW_FAV_MOUNTAIN_DATA_FAILURE,
    payload: string
};

export interface fetchFavMountainDataRequestAction  {
    type: typeof FETCH_FAV_MOUNTAIN_DATA_REQUEST,
    payload: string
};

export interface fetchFavMountainDataSuccessAction {
    type: typeof FETCH_FAV_MOUNTAIN_DATA_SUCCESS,
    payload: FavMountainDataReturn[];
};

export interface fetchFavMountainDataFailureAction {
    type: typeof FETCH_FAV_MOUNTAIN_DATA_FAILURE,
    payload: string
};

export interface deleteFavMountainRequestAction {
    type: typeof DELETE_FAV_MOUNTAIN_REQUEST,
    payload: string
};

export interface deleteFavMountainSuccessAction {
    type: typeof DELETE_FAV_MOUNTAIN_SUCCESS,
    payload: string
};

export interface deleteFavMountainFailureAction {
    type: typeof DELETE_FAV_MOUNTAIN_FAILURE,
    payload: string
};