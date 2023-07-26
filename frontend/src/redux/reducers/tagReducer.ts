import {    SEND_NEW_TAG_DATA_REQUEST,
            SEND_NEW_TAG_DATA_SUCCESS,
            SEND_NEW_TAG_DATA_FAILURE,
            TagData,
            FETCH_TAG_DATA_REQUEST,
            FETCH_TAG_DATA_SUCCESS,
            FETCH_TAG_DATA_FAILURE,
            NewTagData,
            DELETE_TAG_DATA_REQUEST,
            DELETE_TAG_DATA_SUCCESS,
            DELETE_TAG_DATA_FAILURE,
            DeleteTag } from "../types/tagTypes";

interface TagState {
    data: TagData | null;
    error: string | null
};
            
interface NewTagState {
    data: NewTagData | null;
    error: string | null
};
            
interface DeleteTagState {
    data: DeleteTag | null;
    error: string | null;
};

const initialTagState: TagState = {
    data: null,
    error: null
};

const initialNewTagState: NewTagState = {
    data: null,
    error: null
}

const initialDeleteTagState: DeleteTagState = {
    data: null,
    error: null
}

export const tagReducer = (state = initialTagState, action: any) => {
    switch(action.type) {
        case FETCH_TAG_DATA_REQUEST:
            return {
                ...state,
                error: null
            };
        case FETCH_TAG_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case FETCH_TAG_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
};

export const newTagReducer = (state = initialNewTagState, action: any) => {
    switch(action.type) {
        case SEND_NEW_TAG_DATA_REQUEST:
            return {
                ...state, 
                error: null
            };
        case SEND_NEW_TAG_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case SEND_NEW_TAG_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        default: 
            return state;
    }
};

export const deleteTagReducer = (state = initialDeleteTagState, action: any) => {
    switch(action.type) {
        case DELETE_TAG_DATA_REQUEST:
            return {
                ...state,
                error: null
            };
        case DELETE_TAG_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case DELETE_TAG_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
        }
};
