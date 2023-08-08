import { FETCH_USER_DATA_FAILURE, FETCH_USER_DATA_REQUEST, FETCH_USER_DATA_SUCCESS, UserData } from "../types/userTypes";
import { DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE } from "../types/userTypes";
import { MAKE_ADMIN_DATA_REQUEST, MAKE_ADMIN_DATA_SUCCESS, MAKE_ADMIN_DATA_FAILURE, MakeUserAdmin } from "../types/userTypes";
import { UPDATE_USER_DATA_REQUEST, UPDATE_USER_DATA_SUCCESS, UPDATE_USER_DATA_FAILURE, UpdateUserData } from "../types/userTypes";
import { LOGOUT_USER } from "../types/userTypes";
import { SEND_NEW_USER_DATA_REQUEST, SEND_NEW_USER_DATA_SUCCESS, SEND_NEW_USER_DATA_FAILURE, NewUserData } from "../types/userTypes";
import { SEND_LOGIN_DATA_FAILURE, SEND_LOGIN_DATA_REQUEST, SEND_LOGIN_DATA_SUCCESS, SET_TOKEN, LoginDataReturn } from "../types/userTypes";

interface NewUserState {
loading: boolean,
data: NewUserData | null,
error: string | null
};

const initialNewUserState: NewUserState = {
loading: false,
data: null,
error: null
}; 

interface LoginState {
    data: LoginDataReturn | null;
    loading: boolean;
    error: string | null;
    token: string | null
}

const initialLoginState: LoginState = {
    data: null,
    loading: false,
    error: null,
    token: null
} 


interface UserState {
    data: UserData | null;
    loading: boolean;
    error: string | null;
}

const initialUserState: UserState = {
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

interface UpdateUserState {
    data: UpdateUserData | null,
    error: string | null
}

const initialUpdateUserState: UpdateUserState = {
    data: null,
    error: null
}

const initialLogoutState = {
    user: null,
    token: localStorage.getItem('token')
}
 
export const userReducer = ( state = initialUserState, action: any ) => {
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

export const newUserReducer = ( state = initialNewUserState, action: any ) => {
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

export const loginReducer = ( state = initialLoginState, action: any ) => {
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
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }

        default:
            return state;
    }
};

export const deleteUserReducer = ( state = initialDeleteUserState, action: any ) => {
    switch (action.type) {
        case DELETE_USER_REQUEST:
            return {
                ...state,
                error: null
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case DELETE_USER_FAILURE:
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

export const updateUserReducer = ( state = initialUpdateUserState, action: any) => {
    switch (action.type) {
        case UPDATE_USER_DATA_REQUEST:
            return {
                ...state,
                error: null
            };
        case UPDATE_USER_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case UPDATE_USER_DATA_FAILURE:
            return {
                ...state,
                data: action.payload
            };

        default:
            return state;
    }
};

export const logoutReducer = (state = initialLogoutState, action: any) => {
    switch(action.type) {
        case LOGOUT_USER:
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null
            };
        default:
            return state;
    }
};

