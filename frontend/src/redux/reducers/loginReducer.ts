import { SEND_LOGIN_DATA_FAILURE, SEND_LOGIN_DATA_REQUEST, SEND_LOGIN_DATA_SUCCESS, LoginData } from "../types/userTypes";

interface LoginState {
    data: LoginData | null;
    loading: boolean;
    error: string | null;
}

const initialState: LoginState = {
    data: null,
    loading: false,
    error: null

} 

const loginReducer = ( state = initialState, action: any ) => {
    switch(action.type) {
        case SEND_LOGIN_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SEND_LOGIN_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case SEND_LOGIN_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default loginReducer;