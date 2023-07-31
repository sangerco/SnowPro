import { FETCH_USER_DATA_FAILURE, FETCH_USER_DATA_REQUEST, FETCH_USER_DATA_SUCCESS, UserData } from "../types/userTypes";
import { DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE } from "../types/userTypes";
import { MAKE_ADMIN_DATA_REQUEST, MAKE_ADMIN_DATA_SUCCESS, MAKE_ADMIN_DATA_FAILURE, MakeUserAdmin } from "../types/userTypes";

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

interface DeleteUserState {
    data: string | null;
    error: string | null;
}

const initialDeleteUserState: DeleteUserState = {
    data: null,
    error: null
}

interface MakeUserAdminState {
    data: MakeUserAdmin | null;
    error: string | null;
}

const initialMakeUserAdminState: MakeUserAdminState = {
    data: null,
    error: null
}

export const userReducer = ( state = initialState, action: any ) => {
    switch (action.type) {
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case DELETE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export const deleteUserReducer = ( state = initialDeleteUserState, action: any ) => {
    switch (action.type) {
        case FETCH_USER_DATA_REQUEST:
            return {
                ...state,
                error: null
            };
        case FETCH_USER_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case FETCH_USER_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
};

export const makeUserAdminReducer = ( state = initialMakeUserAdminState, action: any ) => {
    switch (action.type) {
        case MAKE_ADMIN_DATA_REQUEST:
            return {
                ...state,
                error: null
            };
        case MAKE_ADMIN_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case MAKE_ADMIN_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
};