export interface TagData {
    id: string;
    tag: string;
};

export interface NewTagData {
    tag: string;
};

export interface NewTagDataReturn {
    id: string;
    tag: string;
};

export interface DeleteTag {
    id: string
};

export const SEND_NEW_TAG_DATA_REQUEST = 'SEND_NEW_TAG_DATA_REQUEST';
export const SEND_NEW_TAG_DATA_SUCCESS = 'SEND_NEW_TAG_DATA_SUCCESS';
export const SEND_NEW_TAG_DATA_FAILURE = 'SEND_NEW_TAG_DATA_FAILURE';
export const FETCH_TAG_DATA_REQUEST = 'FETCH_TAG_DATA_REQUEST';
export const FETCH_TAG_DATA_SUCCESS = 'FETCH_TAG_DATA_SUCCESS';
export const FETCH_TAG_DATA_FAILURE = 'FETCH_TAG_DATA_FAILURE';
export const DELETE_TAG_DATA_REQUEST = 'DELETE_TAG_DATA_REQUEST';
export const DELETE_TAG_DATA_SUCCESS = 'DELETE_TAG_DATA_SUCCESS';
export const DELETE_TAG_DATA_FAILURE = 'DELETE_TAG_DATA_FAILURE';

export interface sendNewTagDataRequestAction {
    type: typeof SEND_NEW_TAG_DATA_REQUEST;
    payload: NewTagData;
};

export interface sendNewTagDataSuccessAction {
    type: typeof SEND_NEW_TAG_DATA_SUCCESS;
    payload: NewTagDataReturn;
};

export interface sendNewTagDataFailureAction {
    type: typeof SEND_NEW_TAG_DATA_FAILURE;
    payload: string;
};

export interface fetchAllTagDataRequestAction {
    type: typeof FETCH_TAG_DATA_REQUEST;
};

export interface fetchAllTagDataSuccessAction {
    type: typeof FETCH_TAG_DATA_SUCCESS;
    payload: TagData[];
};

export interface fetchAllTagDataFailureAction {
    type: typeof FETCH_TAG_DATA_FAILURE;
    payload: string;
};

export interface fetchTagDataRequestAction {
    type: typeof FETCH_TAG_DATA_REQUEST;
    payload: string;
};

export interface fetchTagDataSuccessAction {
    type: typeof FETCH_TAG_DATA_SUCCESS;
    payload: TagData;
};

export interface fetchTagDataFailureAction {
    type: typeof FETCH_TAG_DATA_FAILURE;
    payload: string;
};

export interface deleteTagRequestAction {
    type: typeof DELETE_TAG_DATA_REQUEST;
    payload: DeleteTag;
};

export interface deleteTagSuccessAction {
    type: typeof DELETE_TAG_DATA_SUCCESS;
    payload: string;
};

export interface deleteTagFailureAction {
    type: typeof DELETE_TAG_DATA_FAILURE;
    payload: string;
}