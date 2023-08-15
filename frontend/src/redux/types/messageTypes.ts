import { MessageReplyData } from "./messageReplyTypes";

export interface MessageData {
  id?: string;
  senderId: string;
  recipientId: string;
  subject: string;
  body: string;
  isRead: boolean;
  createdAt?: Date;
  messageReplies?: MessageReplyData[];
}

export interface NewMessageData {
  senderId: string;
  recipientId: string;
  subject: string;
  body: string;
  isRead: boolean;
}

export interface UserMessages {
  id: string;
  senderId: string;
  recipientId: string;
  subject: string;
  body: string;
  isRead: boolean;
  createdAt: Date;
  senderUsername: string;
  senderFirstName: string;
  senderLastName: string;
  recipientUsername: string;
  recipientFirstName: string;
  recipientLastName: string;
  messageReplies?: MessageReplyData[];
}

export const SEND_NEW_MESSAGE_DATA_REQUEST = "SEND_NEW_MESSAGE_DATA_REQUEST";
export const SEND_NEW_MESSAGE_DATA_SUCCESS = "SEND_NEW_MESSAGE_DATA_SUCCESS";
export const SEND_NEW_MESSAGE_DATA_FAILURE = "SEND_NEW_MESSAGE_DATA_FAILURE";
export const FETCH_MESSAGE_DATA_REQUEST = "FETCH_MESSAGE_DATA_REQUEST";
export const FETCH_MESSAGE_DATA_SUCCESS = "FETCH_MESSAGE_DATA_SUCCESS";
export const FETCH_MESSAGE_DATA_FAILURE = "FETCH_MESSAGE_DATA_FAILURE";
export const FETCH_USER_MESSAGES_REQUEST = "FETCH_USER_MESSAGES_REQUEST";
export const FETCH_USER_MESSAGES_SUCCESS = "FETCH_USER_MESSAGES_SUCCESS";
export const FETCH_USER_MESSAGES_FAILURE = "FETCH_USER_MESSAGES_FAILURE";
export const MARK_MESSAGE_READ_REQUEST = "MARK_MESSAGE_READ_REQUEST";
export const MARK_MESSAGE_READ_SUCCESS = "MARK_MESSAGE_READ_SUCCESS";
export const MARK_MESSAGE_READ_FAILURE = "MARK_MESSAGE_READ_FAILURE";
export const MARK_MESSAGE_UNREAD_REQUEST = "MARK_MESSAGE_UNREAD_REQUEST";
export const MARK_MESSAGE_UNREAD_SUCCESS = "MARK_MESSAGE_UNREAD_SUCCESS";
export const MARK_MESSAGE_UNREAD_FAILURE = "MARK_MESSAGE_UNREAD_FAILURE";
export const DELETE_MESSAGE_REQUEST = "DELETE_MESSAGE_REQUEST";
export const DELETE_MESSAGE_SUCCESS = "DELETE_MESSAGE_SUCCESS";
export const DELETE_MESSAGE_FAILURE = "DELETE_MESSAGE_FAILURE";

export interface sendNewMessageDataRequest {
  type: typeof SEND_NEW_MESSAGE_DATA_REQUEST;
  payload: NewMessageData;
}

export interface sendNewMessageDataSuccess {
  type: typeof SEND_NEW_MESSAGE_DATA_SUCCESS;
  payload: NewMessageData;
}

export interface sendNewMessageDataFailure {
  type: typeof SEND_NEW_MESSAGE_DATA_FAILURE;
  payload: string;
}

export interface fetchMessageDataRequest {
  type: typeof FETCH_MESSAGE_DATA_REQUEST;
  payload: string;
}

export interface fetchMessageDataSuccess {
  type: typeof FETCH_MESSAGE_DATA_SUCCESS;
  payload: MessageData;
}

export interface fetchMessageDataFailure {
  type: typeof FETCH_MESSAGE_DATA_FAILURE;
  payload: string;
}

export interface fetchUserMessagesRequest {
  type: typeof FETCH_USER_MESSAGES_REQUEST;
}

export interface fetchUserMessagesSuccess {
  type: typeof FETCH_USER_MESSAGES_SUCCESS;
  payload: MessageData;
}

export interface fetchUserMessagesFailure {
  type: typeof FETCH_USER_MESSAGES_FAILURE;
  payload: string;
}

export interface markMessageReadRequest {
  type: typeof MARK_MESSAGE_READ_REQUEST;
  payload: string;
}

export interface markMessageReadSuccess {
  type: typeof MARK_MESSAGE_READ_SUCCESS;
  payload: string;
}

export interface markMessageReadFailure {
  type: typeof MARK_MESSAGE_READ_FAILURE;
  payload: string;
}

export interface markMessageUnreadRequest {
  type: typeof MARK_MESSAGE_UNREAD_REQUEST;
  payload: string;
}

export interface markMessageUnreadSuccess {
  type: typeof MARK_MESSAGE_UNREAD_SUCCESS;
  payload: string;
}

export interface markMessageUnreadFailure {
  type: typeof MARK_MESSAGE_UNREAD_FAILURE;
  payload: string;
}

export interface deleteMessageRequest {
  type: typeof DELETE_MESSAGE_REQUEST;
  payload: string;
}

export interface deleteMessageSuccess {
  type: typeof DELETE_MESSAGE_SUCCESS;
  payload: string;
}

export interface deleteMessageFailure {
  type: typeof DELETE_MESSAGE_FAILURE;
  payload: string;
}
