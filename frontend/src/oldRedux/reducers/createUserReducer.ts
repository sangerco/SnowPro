import { 
        SEND_NEW_USER_DATA_REQUEST, 
        SEND_NEW_USER_DATA_SUCCESS, 
        SEND_NEW_USER_DATA_FAILURE,
        NewUserData } from "../types/userTypes";

export interface NewUserState {
    loading: boolean,
    data: NewUserData | null,
    error: string | null
};

const initialState: NewUserState = {
    loading: false,
    data: null,
    error: null
};

const newUserReducer = ( state = initialState, action: any ) => {
    switch(action.type) {
        case SEND_NEW_USER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SEND_NEW_USER_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };

        case SEND_NEW_USER_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export default newUserReducer;