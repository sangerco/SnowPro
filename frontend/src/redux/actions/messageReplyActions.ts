import axios from "axios";
import { AppDispatch } from "../store";
import { URL } from "../../utils/config";
import {
  MessageReplyData,
  NewMessageReplyData,
  SEND_MESSAGE_REPLY_DATA_REQUEST,
  SEND_MESSAGE_REPLY_DATA_SUCCESS,
  SEND_MESSAGE_REPLY_DATA_FAILURE,
  FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_REQUEST,
  FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_SUCCESS,
  FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_FAILURE,
  FETCH_MESSAGE_REPLY_DATA_BY_ID_REQUEST,
  FETCH_MESSAGE_REPLY_DATA_BY_ID_SUCCESS,
  FETCH_MESSAGE_REPLY_DATA_BY_ID_FAILURE,
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

export const sendNewMessageReplyDataRequest = (
  newMessageReplyData: NewMessageReplyData
) => ({
  type: SEND_MESSAGE_REPLY_DATA_REQUEST,
  payload: newMessageReplyData,
});

export const sendNewMessageReplyDataSuccess = (
  messageReplyData: MessageReplyData
) => ({
  type: SEND_MESSAGE_REPLY_DATA_SUCCESS,
  payload: messageReplyData,
});

export const sendNewMessageReplyDataFailure = (error: string) => ({
  type: SEND_MESSAGE_REPLY_DATA_FAILURE,
  payload: error,
});

export const fetchMessageReplyDataByMessageIdRequest = (messageId: string) => ({
  type: FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_REQUEST,
  payload: messageId,
});

export const fetchMessageReplyDataByMessageIdSuccess = (
  messageReplyData: MessageReplyData[]
) => ({
  type: FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_SUCCESS,
  payload: messageReplyData,
});

export const fetchMessageReplyDataByMessageIdFailure = (error: string) => ({
  type: FETCH_MESSAGE_REPLY_DATA_BY_MESSAGE_ID_FAILURE,
  payload: error,
});

export const fetchMessageReplyDataByIdRequest = (id: string) => ({
  type: FETCH_MESSAGE_REPLY_DATA_BY_ID_REQUEST,
  payload: id,
});

export const fetchMessageReplyDataByIdSuccess = (
  messageReplyData: MessageReplyData
) => ({
  type: FETCH_MESSAGE_REPLY_DATA_BY_ID_SUCCESS,
  payload: messageReplyData,
});

export const fetchMessageReplyDataByIdFailure = (error: string) => ({
  type: FETCH_MESSAGE_REPLY_DATA_BY_ID_FAILURE,
  payload: error,
});

export const markMessageReplyReadRequest = (id: string) => ({
  type: MARK_MESSAGE_REPLY_READ_REQUEST,
  payload: id,
});

export const markMessageReplyReadSuccess = (success: string) => ({
  type: MARK_MESSAGE_REPLY_READ_SUCCESS,
  payload: success,
});

export const markMessageReplyReadFailure = (error: string) => ({
  type: MARK_MESSAGE_REPLY_READ_FAILURE,
  payload: error,
});

export const markMessageReplyUnreadRequest = (id: string) => ({
  type: MARK_MESSAGE_REPLY_UNREAD_REQUEST,
  payload: id,
});

export const markMessageReplyUnreadSuccess = (success: string) => ({
  type: MARK_MESSAGE_REPLY_UNREAD_SUCCESS,
  payload: success,
});

export const markMessageReplyUnreadFailure = (error: string) => ({
  type: MARK_MESSAGE_REPLY_UNREAD_FAILURE,
  payload: error,
});

export const deleteMessageReplyRequest = (id: string) => ({
  type: DELETE_MESSAGE_REPLY_REQUEST,
  payload: id,
});

export const deleteMessageReplySuccess = (success: string) => ({
  type: DELETE_MESSAGE_REPLY_SUCCESS,
  payload: success,
});

export const deleteMessageReplyFailure = (error: string) => ({
  type: DELETE_MESSAGE_REPLY_FAILURE,
  payload: error,
});

export const sendNewMessageReplyData = (
  messageReplyData: NewMessageReplyData
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(sendNewMessageReplyDataRequest(messageReplyData));
    const messageId = messageReplyData.messageId;
    const senderId = messageReplyData.senderId;
    const recipientId = messageReplyData.recipientId;
    const subject = messageReplyData.subject;
    const body = messageReplyData.body;
    const isRead = messageReplyData.isRead;

    try {
      const response = await axios.post(
        `${URL}/api/messages/${messageId}/reply`,
        {
          messageId: messageId,
          senderId: senderId,
          recipientId: recipientId,
          subject: subject,
          body: body,
          isRead: isRead,
        }
      );
      const responseData = response.data.reply;
      dispatch(sendNewMessageReplyDataSuccess(responseData));
    } catch (error: any) {
      dispatch(sendNewMessageReplyDataFailure(error.message));
    }
  };
};

export const fetchMessageReplyDataById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchMessageReplyDataByIdRequest(id));

    try {
      const response = await axios.get(`${URL}/messages/replies/${id}`);
      const responseData = response.data.reply;
      dispatch(fetchMessageReplyDataByIdSuccess(responseData));
    } catch (error: any) {
      dispatch(fetchMessageReplyDataByIdFailure(error.message));
    }
  };
};

export const fetchMessageReplyDataByMessageId = (messageId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchMessageReplyDataByMessageIdRequest(messageId));

    try {
      const response = await axios.get(`${URL}/messages/${messageId}/replies`);
      const responseData = response.data.replies;
      dispatch(fetchMessageReplyDataByMessageIdSuccess(responseData));
    } catch (error: any) {
      dispatch(fetchMessageReplyDataByMessageIdFailure(error.message));
    }
  };
};

export const markMessageReplyRead = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(markMessageReplyReadRequest(id));

    try {
      const response = await axios.patch(
        `${URL}/api/messages/replies/${id}/read`
      );
      dispatch(markMessageReplyReadSuccess(response.data));
    } catch (error: any) {
      dispatch(markMessageReplyReadFailure(error.message));
    }
  };
};

export const markMessageReplyUnread = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(markMessageReplyUnreadRequest(id));

    try {
      const response = await axios.patch(
        `${URL}/api/messages/replies/${id}/unread`
      );
      dispatch(markMessageReplyUnreadSuccess(response.data));
    } catch (error: any) {
      dispatch(markMessageReplyUnreadFailure(error.message));
    }
  };
};

export const deleteMessageReply = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(deleteMessageReplyRequest(id));

    try {
      const response = await axios.delete(`${URL}/api/messages/replies/${id}/`);
      dispatch(deleteMessageReplySuccess(response.data));
    } catch (error: any) {
      dispatch(deleteMessageReplyFailure(error.message));
    }
  };
};
