import axios from "axios";
import { Dispatch } from "redux";
import { URL } from "../../utils/config";
import {
  NewMessageData,
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

export const sendNewMessageDataRequest = (newMessageData: NewMessageData) => ({
  type: SEND_NEW_MESSAGE_DATA_REQUEST,
  payload: newMessageData,
});

export const sendNewMessageDataSuccess = (messageData: MessageData) => ({
  type: SEND_NEW_MESSAGE_DATA_SUCCESS,
  payload: messageData,
});

export const sendNewMessageDataFailure = (error: string) => ({
  type: SEND_NEW_MESSAGE_DATA_FAILURE,
  payload: error,
});

export const fetchMessageDataRequest = (id: string) => ({
  type: FETCH_MESSAGE_DATA_REQUEST,
  payload: id,
});

export const fetchMessageDataSuccess = (messageData: UserMessages) => ({
  type: FETCH_MESSAGE_DATA_SUCCESS,
  payload: messageData,
});

export const fetchMessageDataFailure = (error: string) => ({
  type: FETCH_MESSAGE_DATA_FAILURE,
  payload: error,
});

export const fetchUserMessagesRequest = (username: string) => ({
  type: FETCH_USER_MESSAGES_REQUEST,
  payload: username,
});

export const fetchUserMessagesSuccess = (userMessages: UserMessages[]) => ({
  type: FETCH_USER_MESSAGES_SUCCESS,
  payload: userMessages,
});

export const fetchUserMessagesFailure = (error: string) => ({
  type: FETCH_USER_MESSAGES_FAILURE,
  payload: error,
});

export const markMessageReadRequest = (id: string) => ({
  type: MARK_MESSAGE_READ_REQUEST,
  payload: id,
});

export const markMessageReadSuccess = (success: string) => ({
  type: MARK_MESSAGE_READ_SUCCESS,
  payload: success,
});

export const markMessageReadFailure = (error: string) => ({
  type: MARK_MESSAGE_READ_FAILURE,
  payload: error,
});

export const markMessageUnreadRequest = (id: string) => ({
  type: MARK_MESSAGE_UNREAD_REQUEST,
  payload: id,
});

export const markMessageUnreadSuccess = (success: string) => ({
  type: MARK_MESSAGE_UNREAD_SUCCESS,
  payload: success,
});

export const markMessageUnreadFailure = (error: string) => ({
  type: MARK_MESSAGE_UNREAD_FAILURE,
  payload: error,
});

export const deleteMessageRequest = (id: string) => ({
  type: DELETE_MESSAGE_REQUEST,
  payload: id,
});

export const deleteMessageSuccess = (success: string) => ({
  type: DELETE_MESSAGE_SUCCESS,
  payload: success,
});

export const deleteMessageFailure = (failure: string) => ({
  type: DELETE_MESSAGE_FAILURE,
  payload: failure,
});

export const sendNewMessageData = (newMessageData: NewMessageData) => {
  return async (dispatch: Dispatch) => {
    dispatch(sendNewMessageDataRequest(newMessageData));

    try {
      const response = await axios.post(`${URL}/api/new-message`, {
        senderId: newMessageData.senderId,
        recipientId: newMessageData.recipientId,
        subject: newMessageData.subject,
        body: newMessageData.body,
        isRead: newMessageData.isRead,
      });
      const responseData = response.data.message;
      dispatch(sendNewMessageDataSuccess(responseData));
    } catch (error: any) {
      dispatch(sendNewMessageDataFailure(error.message));
    }
  };
};

export const fetchMessageData = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchMessageDataRequest(id));

    try {
      const response = await axios.get(`${URL}/messages/${id}`);
      const responseData = response.data.message;
      dispatch(fetchMessageDataSuccess(responseData));
    } catch (error: any) {
      dispatch(fetchMessageDataFailure(error.message));
    }
  };
};

export const fetchUserMessages = (username: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchUserMessagesRequest(username));

    try {
      const response = await axios.get(`${URL}/messages/${username}`);
      const responseData = response.data.messages;
      dispatch(fetchUserMessagesSuccess(responseData));
    } catch (error: any) {
      dispatch(fetchUserMessagesFailure(error.message));
    }
  };
};

export const markMessageRead = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(markMessageReadRequest(id));

    try {
      const response = await axios.patch(`${URL}/api/messages/${id}/read`);
      dispatch(markMessageReadSuccess(response.data));
    } catch (error: any) {
      dispatch(markMessageReadFailure(error.message));
    }
  };
};

export const markMessageUnread = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(markMessageUnreadRequest(id));

    try {
      const response = await axios.patch(`${URL}/api/messages/${id}/unread`);
      dispatch(markMessageUnreadSuccess(response.data));
    } catch (error: any) {
      dispatch(markMessageUnreadFailure(error.message));
    }
  };
};

export const deleteMessage = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteMessageRequest(id));

    try {
      const response = await axios.delete(`${URL}/api/messages/${id}`);
      dispatch(deleteMessageFailure(response.data));
    } catch (error: any) {
      dispatch(deleteMessageFailure(error.message));
    }
  };
};
