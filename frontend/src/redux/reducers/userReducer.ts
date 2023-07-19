import { FETCH_USER_DATA_FAILURE, FETCH_USER_DATA_REQUEST, FETCH_USER_DATA_SUCCESS, UserData } from "../types";

interface UserState {
    data: UserData | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    data: null,
    loading: false,
    error: null
};

const userReducer = ( state = initialState, action: any ) => {
    switch (action.type) {
        case FETCH_USER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_USER_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case FETCH_USER_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default userReducer;