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
    token: string;
}

export interface UpdateUserData {
    username?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    avatar?: string;
    bio?: string;
    videos?: string[];
    photos?: string[];
    favMountains?: string[];
};

export interface UpdateUserDataReturn {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    bio: string;
}

export interface MakeUserAdmin {
    username: string;
    isAdmin: boolean;
}


export const FETCH_USER_DATA_REQUEST = 'FETCH_USER_DATA_REQUEST';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';
export const SEND_NEW_USER_DATA_REQUEST = 'SEND_NEW_USER_DATA_REQUEST';
export const SEND_NEW_USER_DATA_SUCCESS = 'SEND_NEW_USER_DATA_SUCCESS';
export const SEND_NEW_USER_DATA_FAILURE = 'SEND_NEW_USER_DATA_FAILURE';
export const UPDATE_USER_DATA_REQUEST = 'UPDATE_USER_DATA_REQUEST';
export const UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILURE = 'UPDATE_USER_DATA_FAILURE';
export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';
export const SEND_LOGIN_DATA_REQUEST = 'SEND_LOGIN_DATA_REQUEST';
export const SEND_LOGIN_DATA_SUCCESS = 'SEND_LOGIN_DATA_SUCCESS';
export const SEND_LOGIN_DATA_FAILURE = 'SEND_LOGIN_DATA_FAILURE';
export const SET_TOKEN = 'SET_TOKEN';
export const MAKE_ADMIN_DATA_REQUEST = 'MAKE_ADMIN_DATA_REQUEST';
export const MAKE_ADMIN_DATA_SUCCESS = 'MAKE_ADMIN_DATA_SUCCESS';
export const MAKE_ADMIN_DATA_FAILURE = 'MAKE_ADMIN_DATA_FAILURE';

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

export interface UpdateUserDataRequestAction {
    type: typeof UPDATE_USER_DATA_REQUEST;
    payload: UpdateUserData;
}

export interface UpdateUserDataSuccessAction {
    type: typeof UPDATE_USER_DATA_SUCCESS;
    payload: UpdateUserDataReturn;
}

export interface UpdateUserDataFailureAction {
    type: typeof UPDATE_USER_DATA_FAILURE;
    payload: string;
}

export interface DeleteUserRequestAction {
    type: typeof DELETE_USER_REQUEST;
    payload: string;
}

export interface DeleteUserSuccessAction {
    type: typeof DELETE_USER_SUCCESS;
    payload: string;
}

export interface DeleteUserFailureAction {
    type: typeof DELETE_USER_FAILURE;
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

export interface SetTokenAction {
    type: typeof SET_TOKEN;
    payload: string;
}

export interface MakeUserAdminRequestAction {
    type: typeof MAKE_ADMIN_DATA_REQUEST;
    payload: MakeUserAdmin;
}

export interface MakeUserAdminSuccessAction {
    type: typeof MAKE_ADMIN_DATA_SUCCESS;
    payload: string;
}

export interface MakeUserAdminFailureAction {
    type: typeof MAKE_ADMIN_DATA_FAILURE;
    payload: string;
}

export type UserActionTypes = 
    FetchUserDataRequestAction
    | FetchUserDataSuccessAction
    | FetchUserDataFailureAction
    | SendNewUserDataRequestAction
    | SendNewUserDataSuccessAction
    | SendNewUserDataFailureAction
    | UpdateUserDataRequestAction
    | UpdateUserDataSuccessAction
    | UpdateUserDataFailureAction
    | DeleteUserRequestAction
    | DeleteUserSuccessAction
    | DeleteUserFailureAction
    | SendLoginDataRequestAction
    | SendLoginDataSuccessAction
    | SendLoginDataFailureAction
    | SetTokenAction
    | MakeUserAdminRequestAction
    | MakeUserAdminSuccessAction
    | MakeUserAdminFailureAction