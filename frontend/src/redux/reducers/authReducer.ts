import {
  SEND_LOGIN_REQUEST,
  SEND_LOGIN_SUCCESS,
  SEND_LOGIN_FAILURE,
  SEND_LOGOUT_USER,
} from "../types/authTypes";

const initialState = {
  token: null,
  isAuthenticated: false,
  error: null,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SEND_LOGIN_REQUEST:
      return {
        ...state,
      };
    case SEND_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };
    case SEND_LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case SEND_LOGOUT_USER:
      return {
        initialState,
      };
    default:
      return state;
  }
};
