import {    FETCH_USER_DATA_REQUEST,
            FETCH_USER_DATA_SUCCESS,
            FETCH_USER_DATA_FAILURE,
            SEND_NEW_USER_DATA_REQUEST,
            SEND_NEW_USER_DATA_SUCCESS,
            SEND_NEW_USER_DATA_FAILURE,
            SEND_LOGIN_DATA_REQUEST,
            SEND_LOGIN_DATA_SUCCESS,
            SEND_LOGIN_DATA_FAILURE,
            SET_TOKEN,
            MAKE_ADMIN_DATA_REQUEST,
            MAKE_ADMIN_DATA_SUCCESS,
            MAKE_ADMIN_DATA_FAILURE,
            UPDATE_USER_DATA_REQUEST,
            UPDATE_USER_DATA_SUCCESS,
            UPDATE_USER_DATA_FAILURE,
            LOGOUT_USER,
            DELETE_USER_REQUEST,
            DELETE_USER_SUCCESS,
            DELETE_USER_FAILURE
            } from "../types/userTypes";

interface UserData {
    id: string;
    token: string
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    bio?: string;
    isAdmin?: boolean;
    videos?: string[];
    photos?: string[];
    favMountains?: string[];
};

interface UserState {
    loading: boolean;
    data: UserData | null;
    error: string | null
}

const initialUserState: UserState = {
    loading: true,
    data: null,
    error: null
}

export const userReducer = ( state = initialUserState, action: any ) => {
    switch (action.type) {
        case FETCH_USER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_USER_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case FETCH_USER_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case SEND_LOGIN_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SEND_LOGIN_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case SEND_LOGIN_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case SET_TOKEN:
            return {
                ...state,
                loading: false,
                data: action.payload
            }    
        case SEND_NEW_USER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SEND_NEW_USER_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case SEND_NEW_USER_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case MAKE_ADMIN_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case MAKE_ADMIN_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case MAKE_ADMIN_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_USER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case UPDATE_USER_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case UPDATE_USER_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case LOGOUT_USER:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case DELETE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};