import axios from "axios";
import { Dispatch } from "redux";
import { URL } from "../../utils/config";
import {
  UserData,
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE,
  NewUserData,
  SEND_NEW_USER_DATA_REQUEST,
  SEND_NEW_USER_DATA_SUCCESS,
  SEND_NEW_USER_DATA_FAILURE,
  MAKE_ADMIN_DATA_REQUEST,
  MAKE_ADMIN_DATA_SUCCESS,
  MAKE_ADMIN_DATA_FAILURE,
  UpdateUserData,
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from "../types/userTypes";

export const fetchUserDataRequest = (username: string) => ({
  type: FETCH_USER_DATA_REQUEST,
  payload: username,
});

export const fetchUserDataSuccess = (userData: UserData) => ({
  type: FETCH_USER_DATA_SUCCESS,
  payload: userData,
});

export const fetchUserDataFailure = (error: string) => ({
  type: FETCH_USER_DATA_FAILURE,
  payload: error,
});

export const fetchAllUsersRequest = () => ({
  type: FETCH_USER_DATA_REQUEST,
});

export const fetchAllUsersSuccess = (usersData: UserData[]) => ({
  type: FETCH_USER_DATA_SUCCESS,
  payload: usersData,
});

export const fetchAllUsersFailure = (error: string) => ({
  type: FETCH_USER_DATA_FAILURE,
  payload: error,
});

export const sendNewUserDataRequest = (
  username: string,
  password: string,
  first_name: string,
  last_name: string,
  email: string
) => ({
  type: SEND_NEW_USER_DATA_REQUEST,
  payload: { username, password, first_name, last_name, email },
});

export const sendNewUserDataSuccess = (newUserData: NewUserData) => ({
  type: SEND_NEW_USER_DATA_SUCCESS,
  payload: newUserData,
});

export const sendNewUserDataFailure = (error: string) => ({
  type: SEND_NEW_USER_DATA_FAILURE,
  payload: error,
});

export const makeUserAdminRequest = (username: string, isAdmin: boolean) => ({
  type: MAKE_ADMIN_DATA_REQUEST,
  payload: {
    username,
    isAdmin,
  },
});

export const makeUserAdminSuccess = (success: string) => ({
  type: MAKE_ADMIN_DATA_SUCCESS,
  payload: success,
});

export const makeUserAdminFailure = (error: string) => ({
  type: MAKE_ADMIN_DATA_FAILURE,
  payload: error,
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
  favMountains: string[]
) => ({
  type: UPDATE_USER_DATA_REQUEST,
  payload: updateUserData,
});

export const updateUserDataSuccess = (updateUserData: UpdateUserData) => ({
  type: UPDATE_USER_DATA_SUCCESS,
  payload: updateUserData,
});

export const updateUserDataFailure = (error: string) => ({
  type: UPDATE_USER_DATA_FAILURE,
  payload: error,
});

export const deleteUserRequest = (username: string) => ({
  type: DELETE_USER_REQUEST,
  payload: username,
});

export const deleteUserSuccess = (success: string) => ({
  type: DELETE_USER_SUCCESS,
  payload: success,
});

export const deleteUserFailure = (error: string) => ({
  type: DELETE_USER_FAILURE,
  payload: error,
});

export const fetchUserData =
  (username: string) => async (dispatch: Dispatch) => {
    dispatch(fetchUserDataRequest(username));

    try {
      const response = await axios.get(`${URL}/users/${username}`);
      const responseData = response.data.user;
      dispatch(fetchUserDataSuccess(responseData));
    } catch (error: any) {
      dispatch(fetchUserDataFailure(error.message));
    }
  };

export const sendNewUserData = (
  username: string,
  password: string,
  first_name: string,
  last_name: string,
  email: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch(
      sendNewUserDataRequest(username, password, first_name, last_name, email)
    );

    try {
      const response = await axios.post(`${URL}/api/new-user`, {
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name,
        email: email,
      });
      dispatch(sendNewUserDataSuccess(response.data));
    } catch (error: any) {
      dispatch(sendNewUserDataFailure(error.message));
    }
  };
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
) => {
  return async (dispatch: Dispatch) => {
    dispatch(
      updateUserDataRequest(
        username,
        firstName,
        lastName,
        password,
        email,
        avatar,
        bio,
        videos,
        photos,
        favMountains
      )
    );
    try {
      const response = await axios.patch(
        `${URL}/api/users/${username}`,
        updateUserData
      );
      dispatch(updateUserDataSuccess(response.data));
    } catch (error: any) {
      dispatch(updateUserDataFailure(error.message));
    }
  };
};

export const makeUserAdmin = (username: string, isAdmin: boolean) => {
  return async (dispatch: Dispatch) => {
    dispatch(makeUserAdminRequest(username, isAdmin));

    try {
      const response = await axios.patch(`${URL}/api/admin/${username}`, {
        username: username,
        isAdmin: isAdmin,
      });
      dispatch(makeUserAdminSuccess(response.data));
    } catch (error: any) {
      dispatch(makeUserAdminFailure(error.message));
    }
  };
};

export const deleteUser = (username: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteUserRequest(username));

    try {
      const response = await axios.delete(`${URL}/api/delete/${username}`);
      dispatch(deleteUserSuccess(response.data));
    } catch (error: any) {
      dispatch(deleteUserFailure(error.message));
    }
  };
};
