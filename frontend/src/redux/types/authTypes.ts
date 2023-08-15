export interface LoginData {
  username: string;
  password: string;
}

export const SEND_LOGIN_REQUEST = "SEND_LOGIN_REQUEST";
export const SEND_LOGIN_SUCCESS = "SEND_LOGIN_SUCCESS";
export const SEND_LOGIN_FAILURE = "SEND_LOGIN_FAILURE";
export const SEND_LOGOUT_USER = "SEND_LOGOUT_USER";

export interface SendLoginDataRequestAction {
  type: typeof SEND_LOGIN_REQUEST;
  payload: LoginData;
}

export interface SendLoginDataSuccessAction {
  type: typeof SEND_LOGIN_SUCCESS;
  payload: string;
}

export interface SendLoginDataFailureAction {
  type: typeof SEND_LOGIN_FAILURE;
  payload: string;
}

export interface sendLoginUserAction {
  type: typeof SEND_LOGOUT_USER;
}

export type AuthActionTypes =
  | SendLoginDataRequestAction
  | SendLoginDataSuccessAction
  | SendLoginDataFailureAction
  | sendLoginUserAction;
