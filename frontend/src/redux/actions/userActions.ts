import axios from "axios";
import { Dispatch } from "redux";
import { URL } from "../../config";
import { UserData } from "../types/userTypes";
import { FETCH_USER_DATA_FAILURE, FETCH_USER_DATA_REQUEST, FETCH_USER_DATA_SUCCESS } from "../types/userTypes";
import { NewUserDataReturn } from "../types/userTypes";
import { SEND_NEW_USER_DATA_REQUEST, SEND_NEW_USER_DATA_SUCCESS, SEND_NEW_USER_DATA_FAILURE } from "../types/userTypes";
import { LoginDataReturn } from "../types/userTypes";
import { SEND_LOGIN_DATA_REQUEST, SEND_LOGIN_DATA_FAILURE, SEND_LOGIN_DATA_SUCCESS } from "../types/userTypes";

export const fetchUserDataRequest = () => ({
    type: FETCH_USER_DATA_REQUEST
});

export const fetchUserDataSuccess = (userData: UserData) => ({
    type: FETCH_USER_DATA_SUCCESS,
    payload: userData
});

export const fetchUserDataFailure = (error: string) => ({
    type: FETCH_USER_DATA_FAILURE,
    payload: error
});

export const sendNewUserDataRequest = (username: string, password: string, first_name: string, last_name: string, email: string) => ({
    type: SEND_NEW_USER_DATA_REQUEST,
    payload: {
        username,
        password,
        first_name,
        last_name,
        email
    }
});

export const sendNewUserDataSuccess = (newUserDataReturn: NewUserDataReturn) => ({
    type: SEND_NEW_USER_DATA_SUCCESS,
    payload: newUserDataReturn
});

export const sendNewUserDataFailure = (error: string) => ({
    type: SEND_NEW_USER_DATA_FAILURE,
    payload: error
});

export const sendLoginDataRequest = (username: string, password: string) => ({
    type: SEND_LOGIN_DATA_REQUEST,
    payload: {
        username,
        password
    }
});

export const sendLoginDataSuccess = (loginDataReturn: LoginDataReturn) => ({
    type: SEND_LOGIN_DATA_SUCCESS,
    payload: loginDataReturn
});

export const sendLoginDataFailure = (error: string) => ({
    type: SEND_LOGIN_DATA_FAILURE,
    payload: error
})

export const fetchUserData = (username: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchUserDataRequest());

        try {
            const response = await axios.get(`${URL}/users/${username}`);
            const responseData: UserData = response.data.user;
            console.log(response);
            dispatch(fetchUserDataSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchUserDataFailure(error.message));
        }
    };
};

export const sendNewUserData = (username: string, password: string, first_name: string, last_name: string, email: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(sendNewUserDataRequest(username, password, first_name, last_name, email));
        
        try {
            const response = await axios.post(`${URL}/api/new-user`,
                {username: username,
                password: password,
                first_name: first_name,
                last_name: last_name,
                email: email});
            dispatch(sendNewUserDataSuccess(response.data));
        } catch (error: any) {
            dispatch(sendNewUserDataFailure(error.message))
        }
    }
};

export const sendLoginData = (username: string, password: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(sendLoginDataRequest(username, password));

        try {
            const response = await axios.post(`'${URL}/login'`,
                {username: username,
                password: password});
            dispatch(sendLoginDataSuccess(response.data));
        } catch (error: any) {
            dispatch(sendLoginDataFailure(error.message));
        }
    }
};