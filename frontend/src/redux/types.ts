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


export const FETCH_USER_DATA_REQUEST = 'FETCH_USER_DATA_REQUEST';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';


export interface FetchUserDataRequestAction {
    type: typeof FETCH_USER_DATA_REQUEST
}

export interface FetchUserDataSuccessAction {
    type: typeof FETCH_USER_DATA_SUCCESS;
    payload: UserData;
}

export interface FetchUserDataFailureAction {
    type: typeof FETCH_USER_DATA_FAILURE;
    payload: string;
}

export type UserActionTypes = 
    FetchUserDataRequestAction
    | FetchUserDataSuccessAction
    | FetchUserDataFailureAction;