import axios from "axios";
import { Dispatch } from "redux";
import { UserData } from "../types";
import { FETCH_USER_DATA_FAILURE, FETCH_USER_DATA_REQUEST, FETCH_USER_DATA_SUCCESS } from "../types";

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

export const fetchUserData = (username: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchUserDataRequest());

        try {
            const response = await axios.get(`http://localhost:5000/users/${username}`);
            const responseData: UserData = response.data.user;
            console.log(response);
            dispatch(fetchUserDataSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchUserDataFailure(error.message));
        }
    };
};