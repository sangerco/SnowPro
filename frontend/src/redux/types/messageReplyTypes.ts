export interface MessageReplyData {
  id: string;
  messageId: string;
  senderId: string;
  recipientId: string;
  subject: string;
  body: string;
  isRead: boolean;
  createdAt: Date;
}

export interface NewMessageReplyData {
  messageId: string;
  senderId: string;
  recipientId: string;
  subject: string;
  body: string;
  isRead: boolean;
}

export const SEND_MESSAGE_REPLY_DATA_REQUEST =
  "SEND_MESSAGE_REPLY_DATA_REQUEST";
export const SEND_MESSAGE_REPLY_DATA_SUCCESS =
  "SEND_MESSAGE_REPLY_DATA_SUCCESS";
export const SEND_MESSAGE_REPLY_DATA_FAILURE =
  "SEND_MESSAGE_REPLY_DATA_FAILURE";
export const FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_REQUEST =
  "FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_REQUEST";
export const FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_SUCCESS =
  "FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_SUCCESS";
export const FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_FAILURE =
  "FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_FAILURE";
export const FETCH_MESSAGE_REPLY_DATA_BY_ID_REQUEST =
  "FETCH_MESSAGE_REPLY_DATA_BY_ID_REQUEST";
export const FETCH_MESSAGE_REPLY_DATA_BY_ID_SUCCESS =
  "FETCH_MESSAGE_REPLY_DATA_BY_ID_SUCCESS";
export const FETCH_MESSAGE_REPLY_DATA_BY_ID_FAILURE =
  "FETCH_MESSAGE_REPLY_DATA_BY_ID_FAILURE";
export const MARK_MESSAGE_REPLY_READ_REQUEST =
  "MARK_MESSAGE_REPLY_READ_REQUEST";
export const MARK_MESSAGE_REPLY_READ_SUCCESS =
  "MARK_MESSAGE_REPLY_READ_SUCCESS";
export const MARK_MESSAGE_REPLY_READ_FAILURE =
  "MARK_MESSAGE_REPLY_READ_FAILURE";
export const MARK_MESSAGE_REPLY_UNREAD_REQUEST =
  "MARK_MESSAGE_REPLY_UNREAD_REQUEST";
export const MARK_MESSAGE_REPLY_UNREAD_SUCCESS =
  "MARK_MESSAGE_REPLY_UNREAD_SUCCESS";
export const MARK_MESSAGE_REPLY_UNREAD_FAILURE =
  "MARK_MESSAGE_REPLY_UNREAD_FAILURE";
export const DELETE_MESSAGE_REPLY_REQUEST = "DELETE_MESSAGE_REPLY_REQUEST";
export const DELETE_MESSAGE_REPLY_SUCCESS = "DELETE_MESSAGE_REPLY_SUCCESS";
export const DELETE_MESSAGE_REPLY_FAILURE = "DELETE_MESSAGE_REPLY_FAILURE";

export interface sendMessageReplyDataRequest {
  type: typeof SEND_MESSAGE_REPLY_DATA_REQUEST;
  payload: NewMessageReplyData;
}

export interface sendMessageReplyDataSuccess {
  type: typeof SEND_MESSAGE_REPLY_DATA_SUCCESS;
  payload: MessageReplyData;
}

export interface sendMessageReplyDataFailure {
  type: typeof SEND_MESSAGE_REPLY_DATA_FAILURE;
  payload: string;
}

export interface fetchMessageReplyDataByMessageIdRequest {
  type: typeof FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_REQUEST;
  payload: string;
}

export interface fetchMessageReplyDataByMessageIdSuccess {
  type: typeof FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_SUCCESS;
  payload: MessageReplyData[];
}

export interface fetchMessageReplyDataByMessageIdFailure {
  type: typeof FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_FAILURE;
  payload: string;
}

export interface fetchMessageReplyDataByIdRequest {
  type: typeof FETCH_MESSAGE_REPLY_DATA_BY_ID_REQUEST;
  payload: string;
}

export interface fetchMessageReplyDataByIdSuccess {
  type: typeof FETCH_MESSAGE_REPLY_DATA_BY_ID_SUCCESS;
  payload: MessageReplyData;
}

export interface fetchMessageReplyDataByIdFailure {
  type: typeof FETCH_MESSAGE_REPLY_DATA_BY_ID_FAILURE;
  payload: string;
}

export interface markMessageReplyReadRequest {
  type: typeof MARK_MESSAGE_REPLY_READ_REQUEST;
  payload: string;
}

export interface markMessageReplyReadSuccess {
  type: typeof MARK_MESSAGE_REPLY_READ_SUCCESS;
  payload: string;
}

export interface markMessageReplyReadFailure {
  type: typeof MARK_MESSAGE_REPLY_READ_FAILURE;
  payload: string;
}
export interface markMessageReplyUnreadRequest {
  type: typeof MARK_MESSAGE_REPLY_UNREAD_REQUEST;
  payload: string;
}

export interface markMessageReplyUnreadSuccess {
  type: typeof MARK_MESSAGE_REPLY_UNREAD_SUCCESS;
  payload: string;
}

export interface markMessageReplyUnreadFailure {
  type: typeof MARK_MESSAGE_REPLY_UNREAD_FAILURE;
  payload: string;
}

export interface deleteMessageReplyRequest {
  type: typeof DELETE_MESSAGE_REPLY_REQUEST;
  payload: string;
}

export interface deleteMessageReplySuccess {
  type: typeof DELETE_MESSAGE_REPLY_SUCCESS;
  payload: string;
}

export interface deleteMessageReplyFailure {
  type: typeof DELETE_MESSAGE_REPLY_FAILURE;
  payload: string;
}
