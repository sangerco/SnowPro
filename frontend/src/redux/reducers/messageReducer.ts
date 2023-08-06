import { SEND_NEW_MESSAGE_DATA_REQUEST,
        SEND_NEW_MESSAGE_DATA_SUCCESS,
        SEND_NEW_MESSAGE_DATA_FAILURE,
        MessageData,
        FETCH_MESSAGE_DATA_REQUEST,
        FETCH_MESSAGE_DATA_SUCCESS,
        FETCH_MESSAGE_DATA_FAILURE,
        NewMessageData,
        DELETE_MESSAGE_REQUEST,
        DELETE_MESSAGE_SUCCESS,
        DELETE_MESSAGE_FAILURE,
        DeleteMessage,
        UserWithMessages } from "../types/messageTypes";

interface MessageState {
    data: MessageData | null;
    error: string | null
};

interface NewMessageState {
    data: NewMessageData | null;
    error: string | null
};

interface UserWithMessagesState {
    data: UserWithMessages | null;
    error: string | null;
};

interface DeleteMessageState {
    data: DeleteMessage | null;
    error: string | null;
};

const initialMessageState: MessageState = {
    data: null,
    error: null
};

const initialNewMessageState: NewMessageState = {
    data: null,
    error: null
};

const initialUserWithMessagesState: UserWithMessagesState = {
    data: null,
    error: null
}

const initialDeleteMessageState: DeleteMessageState = {
    data: null,
    error: null
}

export const messageReducer = (state = initialMessageState, action: any) => {
    switch(action.type) {
        case FETCH_MESSAGE_DATA_REQUEST:
            return {
                ...state,
                error: null
            };
        case FETCH_MESSAGE_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case FETCH_MESSAGE_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
};

export const newMessageReducer = (state = initialNewMessageState, action: any) => {
    switch(action.type) {
        case SEND_NEW_MESSAGE_DATA_REQUEST:
            return {
                ...state, 
                error: null
            };
        case SEND_NEW_MESSAGE_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case SEND_NEW_MESSAGE_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        default: 
            return state;
    }
};

export const userWithMessagesReducer = (state = initialUserWithMessagesState, action: any) => {
    switch(action.type) {
        case SEND_NEW_MESSAGE_DATA_REQUEST:
            return {
                ...state, 
                error: null
            };
        case SEND_NEW_MESSAGE_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case SEND_NEW_MESSAGE_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        default: 
            return state;
    }
};

export const deleteMessageReducer = (state = initialDeleteMessageState, action: any) => {
    switch(action.type) {
        case DELETE_MESSAGE_REQUEST:
            return {
                ...state,
                error: null
            };
        case DELETE_MESSAGE_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case DELETE_MESSAGE_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
        }
};

