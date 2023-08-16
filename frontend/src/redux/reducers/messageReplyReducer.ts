import {
  SEND_MESSAGE_REPLY_DATA_REQUEST,
  SEND_MESSAGE_REPLY_DATA_SUCCESS,
  SEND_MESSAGE_REPLY_DATA_FAILURE,
  FETCH_MESSAGE_REPLY_DATA_BY_ID_REQUEST,
  FETCH_MESSAGE_REPLY_DATA_BY_ID_SUCCESS,
  FETCH_MESSAGE_REPLY_DATA_BY_ID_FAILURE,
  FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_REQUEST,
  FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_SUCCESS,
  FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_FAILURE,
  MARK_MESSAGE_REPLY_READ_REQUEST,
  MARK_MESSAGE_REPLY_READ_SUCCESS,
  MARK_MESSAGE_REPLY_READ_FAILURE,
  MARK_MESSAGE_REPLY_UNREAD_REQUEST,
  MARK_MESSAGE_REPLY_UNREAD_SUCCESS,
  MARK_MESSAGE_REPLY_UNREAD_FAILURE,
  DELETE_MESSAGE_REPLY_REQUEST,
  DELETE_MESSAGE_REPLY_SUCCESS,
  DELETE_MESSAGE_REPLY_FAILURE,
} from "../types/messageReplyTypes";

interface MessageReplyData {
  id?: string;
  messageId: string;
  senderId: string;
  recipientId: string;
  subject: string;
  body: string;
  isRead?: string;
  createdAt?: string;
}

interface MessageReplyState {
  data: MessageReplyData | null;
  error: string | null;
}

const initialMessageReplyState: MessageReplyState = {
  data: null,
  error: null,
};

export const messageReplyReducer = (
  state = initialMessageReplyState,
  action: any
) => {
  switch (action.type) {
    case SEND_MESSAGE_REPLY_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case SEND_MESSAGE_REPLY_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case SEND_MESSAGE_REPLY_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_MESSAGE_REPLY_DATA_BY_ID_REQUEST:
      return {
        ...state,
        error: null,
      };
    case FETCH_MESSAGE_REPLY_DATA_BY_ID_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case FETCH_MESSAGE_REPLY_DATA_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_REQUEST:
      return {
        ...state,
        error: null,
      };
    case FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case MARK_MESSAGE_REPLY_READ_REQUEST:
      return {
        ...state,
        error: null,
      };
    case MARK_MESSAGE_REPLY_READ_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case MARK_MESSAGE_REPLY_READ_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case MARK_MESSAGE_REPLY_UNREAD_REQUEST:
      return {
        ...state,
        error: null,
      };
    case MARK_MESSAGE_REPLY_UNREAD_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case MARK_MESSAGE_REPLY_UNREAD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_MESSAGE_REPLY_REQUEST:
      return {
        ...state,
        error: null,
      };
    case DELETE_MESSAGE_REPLY_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case DELETE_MESSAGE_REPLY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
