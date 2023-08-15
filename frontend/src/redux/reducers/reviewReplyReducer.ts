import {
  SEND_NEW_REVIEW_REPLY_DATA_REQUEST,
  SEND_NEW_REVIEW_REPLY_DATA_SUCCESS,
  SEND_NEW_REVIEW_REPLY_DATA_FAILURE,
  FETCH_REVIEW_REPLY_DATA_BY_ID_REQUEST,
  FETCH_REVIEW_REPLY_DATA_BY_ID_SUCCESS,
  FETCH_REVIEW_REPLY_DATA_BY_REVIEW_ID_REQUEST,
  FETCH_REVIEW_REPLY_DATA_BY_REVIEW_ID_SUCCESS,
  FETCH_REVIEW_REPLY_DATA_FAILURE,
  UPDATE_REVIEW_REPLY_DATA_REQUEST,
  UPDATE_REVIEW_REPLY_DATA_SUCCESS,
  UPDATE_REVIEW_REPLY_DATA_FAILURE,
  DELETE_REVIEW_REPLY_REQUEST,
  DELETE_REVIEW_REPLY_SUCCESS,
  DELETE_REVIEW_REPLY_FAILURE,
} from "../types/reviewReplyTypes";

interface ReviewReplyData {
  id: string;
  reviewId: string;
  userId: string;
  username: string;
  body: string;
  slug: string;
  createdAt: Date;
}

interface ReviewReplyState {
  data: ReviewReplyData | null;
  error: string | null;
}

const initialReviewReplyState: ReviewReplyState = {
  data: null,
  error: null,
};

export const reviewReplyReducer = (
  state = initialReviewReplyState,
  action: any
) => {
  switch (action.type) {
    case SEND_NEW_REVIEW_REPLY_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case SEND_NEW_REVIEW_REPLY_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case SEND_NEW_REVIEW_REPLY_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_REVIEW_REPLY_DATA_BY_ID_REQUEST:
      return {
        ...state,
        error: null,
      };
    case FETCH_REVIEW_REPLY_DATA_BY_ID_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case FETCH_REVIEW_REPLY_DATA_BY_REVIEW_ID_REQUEST:
      return {
        ...state,
        error: null,
      };
    case FETCH_REVIEW_REPLY_DATA_BY_REVIEW_ID_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case FETCH_REVIEW_REPLY_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_REVIEW_REPLY_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case UPDATE_REVIEW_REPLY_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case UPDATE_REVIEW_REPLY_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_REVIEW_REPLY_REQUEST:
      return {
        ...state,
        error: null,
      };
    case DELETE_REVIEW_REPLY_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case DELETE_REVIEW_REPLY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
  }
};
