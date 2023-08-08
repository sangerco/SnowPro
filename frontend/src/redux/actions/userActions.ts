import axios from "axios";
import { Dispatch, Action } from "redux";
import { URL } from "../../config";
import type { UserData } from "../types/userTypes";
import { FETCH_USER_DATA_FAILURE, FETCH_USER_DATA_REQUEST, FETCH_USER_DATA_SUCCESS } from "../types/userTypes";
import type { NewUserDataReturn } from "../types/userTypes";
import { SEND_NEW_USER_DATA_REQUEST, SEND_NEW_USER_DATA_SUCCESS, SEND_NEW_USER_DATA_FAILURE } from "../types/userTypes";
import type { LoginData, LoginDataReturn } from "../types/userTypes";
import { SEND_LOGIN_DATA_REQUEST, SEND_LOGIN_DATA_FAILURE, SEND_LOGIN_DATA_SUCCESS } from "../types/userTypes";
import { MAKE_ADMIN_DATA_REQUEST, MAKE_ADMIN_DATA_SUCCESS, MAKE_ADMIN_DATA_FAILURE } from "../types/userTypes";
import { UPDATE_USER_DATA_REQUEST, UPDATE_USER_DATA_SUCCESS, UPDATE_USER_DATA_FAILURE } from "../types/userTypes";
import type { UpdateUserData, UpdateUserDataReturn } from "../types/userTypes";
import { DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE } from "../types/userTypes";
import { SET_TOKEN, LOGOUT_USER } from "../types/userTypes";

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

export const updateUserDataRequest = (
            username: string,
            firstName: string,
            lastName: string,
            password: string,
            email: string,
            avatar: string,
            bio: string,
            videos: string[],
            photos: string[],
            favMountains: string[]) => ({
    type: UPDATE_USER_DATA_REQUEST,
    payload: {
        username,
        firstName,
        lastName,
        password,
        email,
        avatar,
        bio,
        videos,
        photos,
        favMountains}
});

export const updateUserDataSuccess = (updateUserDataReturn: UpdateUserDataReturn) => ({
    type: UPDATE_USER_DATA_SUCCESS,
    payload: updateUserDataReturn
});

export const updateUserDataFailure = (error: string) => ({
    type: UPDATE_USER_DATA_FAILURE,
    payload: error
});

export const deleteUserRequest = (username: string) => ({
    type: DELETE_USER_REQUEST,
    payload: username
});

export const deleteUserSuccess = (success: string) => ({
    type: DELETE_USER_SUCCESS,
    payload: success
});

export const deleteUserFailure = (error: string) => ({
    type: DELETE_USER_FAILURE,
    payload: error
})

export const sendLoginDataRequest = (username: string, password: string) => ({
    type: SEND_LOGIN_DATA_REQUEST,
    payload: {
        username,
        password
    }
});

export const sendLoginDataSuccess = (loginDataReturn: LoginDataReturn) => (dispatch: Dispatch): void => {
    dispatch({
        type: SEND_LOGIN_DATA_SUCCESS,
        payload: loginDataReturn
    });
    
    dispatch(setToken(loginDataReturn.token));
};

export const sendLoginDataFailure = (error: string) => ({
    type: SEND_LOGIN_DATA_FAILURE,
    payload: error
});

export const setToken = (token: string) => ({
    type: SET_TOKEN,
    payload: token
});

interface LogoutUserAction extends Action<typeof LOGOUT_USER> {}

export const logoutUser = (): LogoutUserAction => {
    return {
        type: LOGOUT_USER
    }
};

export const makeUserAdminRequest = (username: string, isAdmin: boolean) => ({
    type: MAKE_ADMIN_DATA_REQUEST,
    payload: {
        username,
        isAdmin
    }
});

export const makeUserAdminSuccess = (success: string) => ({
    type: MAKE_ADMIN_DATA_SUCCESS,
    payload: success
});

export const makeUserAdminFailure = (error: string) => ({
    type: MAKE_ADMIN_DATA_FAILURE,
    payload: error
});

export const fetchUserData = (username: string) => async (dispatch: Dispatch) => {
        dispatch(fetchUserDataRequest());
        try {
            const response = await axios.get(`${URL}/users/${username}`);
            const responseData: UserData = response.data.user;
            dispatch(fetchUserDataSuccess(responseData));
            return responseData;
        } catch (error: any) {
            const errorMessage = `Fetch user failed! Error: ${error.message}`;
            dispatch(fetchUserDataFailure(error.message));
            throw new Error(errorMessage);
        }
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
            const errorMessage = `Create User failed! Error: ${error.message}`;
            dispatch(sendNewUserDataFailure(error.message));
            throw new Error(errorMessage);
        }
    }
};

export const updateUserData = (
                        username: string,
                        firstName: string,
                        lastName: string,
                        password: string,
                        email: string,
                        avatar: string,
                        bio: string,
                        videos: string[],
                        photos: string[],
                        favMountains: string[]
) => async (dispatch: Dispatch) => {
        dispatch(updateUserDataRequest(
                        username,
                        firstName,
                        lastName,
                        password,
                        email,
                        avatar,
                        bio,
                        videos,
                        photos,
                        favMountains));

        try {
            const response = await axios.patch(`${URL}/api/users/${username}`, updateUserData);
            dispatch(updateUserDataSuccess(response.data));
        } catch (error: any) {
            const errorMessage = `Update failed! Error: ${error.message}`;
            dispatch(updateUserDataFailure(error.message));
            throw new Error(errorMessage);
        }
};

export const makeUserAdmin = (username: string, isAdmin: boolean) => {
    return async (dispatch: Dispatch) => {
        dispatch(makeUserAdminRequest(username, isAdmin));

        try {
            const response = await axios.patch(`${URL}/admin/${username}`,
                {username: username,
                isAdmin: isAdmin});
            dispatch(makeUserAdminSuccess(response.data));
        } catch (error: any) {
            const errorMessage = `Make Admin failed! Error: ${error.message}`
            dispatch(makeUserAdminFailure(error.message));
            throw new Error(errorMessage);
        }
    }
};

export const deleteUser = (username: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(deleteUserRequest(username));

        try {
            const response = await axios.delete(`${URL}/api/users/${username}`);
            dispatch(deleteUserSuccess(response.data));
        } catch (error: any) {
            const errorMessage = `Delete failed! Error: ${error.message}`
            dispatch(deleteUserFailure(error.message));
            throw new Error(errorMessage);
        }
    }
};

export const sendLoginData = (loginData: LoginData) => {
    return async (dispatch: any) => {
        dispatch(sendLoginDataRequest(loginData.username, loginData.password));

        try {
            const response = await axios.post(`${URL}/login`, loginData);
            const { token, ...userData } = response.data 

            dispatch(sendLoginDataSuccess(userData));
            return token;
        } catch (error: any) {
            const errorMessage = `Login failed! Error: ${error.message}`
            dispatch(sendLoginDataFailure(error.message));
            throw new Error(errorMessage);
        }
    }
};

