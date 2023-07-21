export interface UserData {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    bio: string;
    videos: string[];
    photos: string[];
    favMountains: string[];
  }

export interface NewUserData {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface NewUserDataReturn {
    username: string;
    firstName: string;
    lastName: string;
    email: string;    
}

export interface LoginData {
    username: string;
    password: string;
}

export interface LoginDataReturn {
    username: string;
    firstName: string;
    lastName: string;
    email: string;    
}


export const FETCH_USER_DATA_REQUEST = 'FETCH_USER_DATA_REQUEST';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';
export const SEND_NEW_USER_DATA_REQUEST = 'SEND_NEW_USER_DATA_REQUEST';
export const SEND_NEW_USER_DATA_SUCCESS = 'SEND_NEW_USER_DATA_SUCCESS';
export const SEND_NEW_USER_DATA_FAILURE = 'SEND_NEW_USER_DATA_FAILURE';
export const SEND_LOGIN_DATA_REQUEST = 'SEND_LOGIN_DATA_REQUEST';
export const SEND_LOGIN_DATA_SUCCESS = 'SEND_LOGIN_DATA_SUCCESS';
export const SEND_LOGIN_DATA_FAILURE = 'SEND_LOGIN_DATA_FAILURE';

export interface FetchUserDataRequestAction {
    type: typeof FETCH_USER_DATA_REQUEST;
}

export interface FetchUserDataSuccessAction {
    type: typeof FETCH_USER_DATA_SUCCESS;
    payload: UserData;
}

export interface FetchUserDataFailureAction {
    type: typeof FETCH_USER_DATA_FAILURE;
    payload: string;
}

export interface SendNewUserDataRequestAction {
    type: typeof SEND_NEW_USER_DATA_REQUEST;
    payload: NewUserData;
}

export interface SendNewUserDataSuccessAction {
    type: typeof SEND_NEW_USER_DATA_SUCCESS;
    payload: NewUserDataReturn;
}

export interface SendNewUserDataFailureAction {
    type: typeof SEND_NEW_USER_DATA_FAILURE;
    payload: string;
}

export interface SendLoginDataRequestAction {
    type: typeof SEND_LOGIN_DATA_REQUEST;
    payload: LoginData;
}

export interface SendLoginDataSuccessAction {
    type: typeof SEND_LOGIN_DATA_SUCCESS;
    payload: LoginDataReturn;
}

export interface SendLoginDataFailureAction {
    type: typeof SEND_LOGIN_DATA_FAILURE;
    payload: string;
}

export type UserActionTypes = 
    FetchUserDataRequestAction
    | FetchUserDataSuccessAction
    | FetchUserDataFailureAction
    | SendNewUserDataRequestAction
    | SendNewUserDataSuccessAction
    | SendNewUserDataFailureAction
    | SendLoginDataRequestAction
    | SendLoginDataSuccessAction
    | SendLoginDataFailureAction