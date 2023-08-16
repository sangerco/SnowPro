import {
  SEND_NEW_REVIEW_DATA_REQUEST,
  SEND_NEW_REVIEW_DATA_SUCCESS,
  SEND_NEW_REVIEW_DATA_FAILURE,
  FETCH_ALL_REVIEWS_DATA_REQUEST,
  FETCH_ALL_REVIEWS_DATA_SUCCESS,
  FETCH_ALL_REVIEWS_DATA_FAILURE,
  FETCH_REVIEW_DATA_BY_ID_REQUEST,
  FETCH_REVIEW_DATA_REQUEST,
  FETCH_REVIEW_DATA_SUCCESS,
  FETCH_REVIEW_DATA_FAILURE,
  UPDATE_REVIEW_DATA_REQUEST,
  UPDATE_REVIEW_DATA_SUCCESS,
  UPDATE_REVIEW_DATA_FAILURE,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
  ReviewData,
} from "../types/reviewTypes";

interface ReviewState {
  data: ReviewData | null;
  error: string | null;
}

const initialReplyState: ReviewState = {
  data: null,
  error: null,
};

export const reviewReducer = (state = initialReplyState, action: any) => {
  switch (action.type) {
    case SEND_NEW_REVIEW_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case SEND_NEW_REVIEW_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case SEND_NEW_REVIEW_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_REVIEW_DATA_BY_ID_REQUEST:
      return {
        ...state,
        error: null,
      };
    case FETCH_ALL_REVIEWS_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case FETCH_ALL_REVIEWS_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case FETCH_ALL_REVIEWS_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_REVIEW_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case FETCH_REVIEW_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case FETCH_REVIEW_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_REVIEW_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case UPDATE_REVIEW_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case UPDATE_REVIEW_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        error: null,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case DELETE_REVIEW_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
