import {
  MessageData,
  UserMessages,
  SEND_NEW_MESSAGE_DATA_REQUEST,
  SEND_NEW_MESSAGE_DATA_SUCCESS,
  SEND_NEW_MESSAGE_DATA_FAILURE,
  FETCH_MESSAGE_DATA_REQUEST,
  FETCH_MESSAGE_DATA_SUCCESS,
  FETCH_MESSAGE_DATA_FAILURE,
  FETCH_USER_MESSAGES_REQUEST,
  FETCH_USER_MESSAGES_SUCCESS,
  FETCH_USER_MESSAGES_FAILURE,
  MARK_MESSAGE_READ_REQUEST,
  MARK_MESSAGE_READ_SUCCESS,
  MARK_MESSAGE_READ_FAILURE,
  MARK_MESSAGE_UNREAD_REQUEST,
  MARK_MESSAGE_UNREAD_SUCCESS,
  MARK_MESSAGE_UNREAD_FAILURE,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAILURE,
} from "../types/messageTypes";

interface MessageState {
  data: MessageData | null;
  userMessages: UserMessages | null;
  error: string | null;
  loading: true;
}

const initialMessageState: MessageState = {
  data: null,
  userMessages: null,
  error: null,
  loading: true,
};

export const messageReducer = (state = initialMessageState, action: any) => {
  switch (action.type) {
    case SEND_NEW_MESSAGE_DATA_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case SEND_NEW_MESSAGE_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case SEND_NEW_MESSAGE_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case FETCH_MESSAGE_DATA_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_MESSAGE_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case FETCH_MESSAGE_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case FETCH_USER_MESSAGES_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_USER_MESSAGES_SUCCESS:
      return {
        ...state,
        userMessages: action.payload,
        loading: false,
      };
    case FETCH_USER_MESSAGES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case MARK_MESSAGE_READ_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case MARK_MESSAGE_READ_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case MARK_MESSAGE_READ_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case MARK_MESSAGE_UNREAD_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case MARK_MESSAGE_UNREAD_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case MARK_MESSAGE_UNREAD_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case DELETE_MESSAGE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case DELETE_MESSAGE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case DELETE_MESSAGE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
