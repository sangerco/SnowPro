import axios from "axios";
import { Dispatch } from "redux";
import { URL } from "../../utils/config";
import {
  LoginData,
  SEND_LOGIN_REQUEST,
  SEND_LOGIN_SUCCESS,
  SEND_LOGIN_FAILURE,
  SEND_LOGOUT_USER,
} from "../types/authTypes";

export const sendLoginRequest = (loginData: LoginData) => ({
  type: SEND_LOGIN_REQUEST,
  payload: loginData,
});

export const sendLoginSuccess = (token: string) => ({
  type: SEND_LOGIN_SUCCESS,
  payload: token,
});

export const sendLoginFailure = (error: string) => ({
  type: SEND_LOGIN_FAILURE,
  payload: error,
});

export const sendLogoutUser = () => ({
  type: SEND_LOGOUT_USER,
});

export const sendLogin = (loginData: LoginData) => {
  return async (dispatch: Dispatch) => {
    dispatch(sendLoginRequest(loginData));

    try {
      const response = await axios.post(`${URL}/login`, { loginData });
      const responseData = response.data.token;
      dispatch(sendLoginSuccess(responseData));
    } catch (error: any) {
      dispatch(sendLoginFailure(error.message));
    }
  };
};

export const sendLogout = () => {
  return async (dispatch: Dispatch) => {
    dispatch(sendLogoutUser());
  };
};
