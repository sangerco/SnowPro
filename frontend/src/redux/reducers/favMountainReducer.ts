import {    SEND_NEW_FAV_MOUNTAIN_DATA_REQUEST,
            SEND_NEW_FAV_MOUNTAIN_DATA_SUCCESS,
            SEND_NEW_FAV_MOUNTAIN_DATA_FAILURE,
            FavMountain,
            FETCH_FAV_MOUNTAIN_DATA_REQUEST,
            FETCH_FAV_MOUNTAIN_DATA_SUCCESS,
            FETCH_FAV_MOUNTAIN_DATA_FAILURE,
            NewFavMountainData,
            DELETE_FAV_MOUNTAIN_REQUEST,
            DELETE_FAV_MOUNTAIN_SUCCESS,
            DELETE_FAV_MOUNTAIN_FAILURE } from '../types/favMountainTypes'

interface FavMountainState {
    data: FavMountain | null,
    error: string | null
};

interface NewFavMountainDataState {
    data: NewFavMountainData | null,
    error: string | null
};

interface DeleteFavMountainState {
    data: string | null,
    error: string | null
};

const initialFavMountainState: FavMountainState = {
    data: null,
    error: null
};

const initialNewFavMountainState: NewFavMountainDataState = {
    data: null,
    error: null
};

const initialDeleteFavMountainState: DeleteFavMountainState = {
    data: null,
    error: null
};

export const favMountainReducer = (state = initialFavMountainState, action: any) => {
    switch(action.type) {
        case FETCH_FAV_MOUNTAIN_DATA_REQUEST:
            return {
                ...state,
                error: null
            };
        case FETCH_FAV_MOUNTAIN_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case FETCH_FAV_MOUNTAIN_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    };
};

export const newFavMountainReducer = (state = initialNewFavMountainState, action: any) => {
    switch(action.type) {
        case SEND_NEW_FAV_MOUNTAIN_DATA_REQUEST:
            return {
                ...state,
                error: null
            };
        case SEND_NEW_FAV_MOUNTAIN_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case SEND_NEW_FAV_MOUNTAIN_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    };
};

export const deleteFavMountainReducer = (state = initialDeleteFavMountainState, action: any) => {
    switch(action.type) {
        case DELETE_FAV_MOUNTAIN_REQUEST:
            return {
                ...state,
                error: null
            };
        case DELETE_FAV_MOUNTAIN_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case DELETE_FAV_MOUNTAIN_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    };
};