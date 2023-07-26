import {    SEND_NEW_REPLY_DATA_REQUEST, 
            SEND_NEW_REPLY_DATA_SUCCESS,
            SEND_NEW_REPLY_DATA_FAILURE,
            ReplyData,
            FETCH_REPLY_DATA_REQUEST,
            FETCH_REPLY_DATA_SUCCESS,
            FETCH_REPLY_DATA_FAILURE,
            NewReplyData,
            DELETE_REPLY_REQUEST,
            DELETE_REPLY_SUCCESS,
            DELETE_REPLY_FAILURE,
            DeleteReply} from "../types/messageReplyTypes";

interface ReplyState {
    data: ReplyData | null;
    error: string | null
    };
            
interface NewReplyState {
    data: NewReplyData | null;
    error: string | null
};
            
interface DeleteReplyState {
    data: DeleteReply | null;
    error: string | null;
};
            
const initialReplyState: ReplyState = {
    data: null,
    error: null
};
            
const initialNewReplyState: NewReplyState = {
    data: null,
    error: null
};
            
const initialDeleteReplyState: DeleteReplyState = {
    data: null,
    error: null
};

export const replyReducer = (state = initialReplyState, action: any) => {
    switch(action.type) {
        case FETCH_REPLY_DATA_REQUEST:
            return {
                ...state,
                error: null
            };
        case FETCH_REPLY_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case FETCH_REPLY_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
};

export const newReplyReducer = (state = initialNewReplyState, action: any) => {
    switch(action.type) {
        case SEND_NEW_REPLY_DATA_REQUEST:
            return {
                ...state, 
                error: null
            };
        case SEND_NEW_REPLY_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case SEND_NEW_REPLY_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        default: 
            return state;
    }
};

export const deleteReplyReducer = (state = initialDeleteReplyState, action: any) => {
    switch(action.type) {
        case DELETE_REPLY_REQUEST:
            return {
                ...state,
                error: null
            };
        case DELETE_REPLY_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case DELETE_REPLY_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
        }
};