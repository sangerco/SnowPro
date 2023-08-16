import {
  TagData,
  SEND_NEW_TAG_DATA_REQUEST,
  SEND_NEW_TAG_DATA_SUCCESS,
  SEND_NEW_TAG_DATA_FAILURE,
  FETCH_TAG_DATA_REQUEST,
  FETCH_TAG_DATA_SUCCESS,
  FETCH_TAG_DATA_FAILURE,
  DELETE_TAG_DATA_REQUEST,
  DELETE_TAG_DATA_SUCCESS,
  DELETE_TAG_DATA_FAILURE,
} from "../types/tagTypes";

export interface TagState {
  data: TagData[] | null;
  error: string | null;
}

const initialTagState = {
  data: null,
  error: null,
};

export const tagReducer = (state = initialTagState, action: any) => {
  switch (action.type) {
    case SEND_NEW_TAG_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case SEND_NEW_TAG_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case SEND_NEW_TAG_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_TAG_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case FETCH_TAG_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case FETCH_TAG_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_TAG_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case DELETE_TAG_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case DELETE_TAG_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
