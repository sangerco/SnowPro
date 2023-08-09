import axios from "axios";
import { Dispatch } from "redux";
import { URL } from "../../utils/config";
import {    MessageData,
            MessageDataReturn,
            SEND_NEW_MESSAGE_DATA_REQUEST, 
            SEND_NEW_MESSAGE_DATA_SUCCESS, 
            SEND_NEW_MESSAGE_DATA_FAILURE,
            FETCH_MESSAGE_DATA_REQUEST,
            FETCH_MESSAGE_DATA_SUCCESS,
            FETCH_MESSAGE_DATA_FAILURE,
            NewMessageDataReturn,
            DELETE_MESSAGE_REQUEST,
            DELETE_MESSAGE_SUCCESS,
            DELETE_MESSAGE_FAILURE,
            DeleteMessage,
            MARK_MESSAGE_READ_REQUEST,
            MARK_MESSAGE_READ_SUCCESS,
            MARK_MESSAGE_READ_FAILURE,
            MARK_MESSAGE_UNREAD_REQUEST,
            MARK_MESSAGE_UNREAD_SUCCESS,
            MARK_MESSAGE_UNREAD_FAILURE,
            UserWithMessages } from "../types/messageTypes";

export const sendNewMessageDataRequest = ( sender_id: string, recipient_id: string, subject: string, body: string ) => ({
    type: SEND_NEW_MESSAGE_DATA_REQUEST,
    payload: {
        sender_id,
        recipient_id,
        subject,
        body
    }
});

export const sendNewMessageDataSuccess = (sendNewMessageDataReturn: NewMessageDataReturn) => ({
    type: SEND_NEW_MESSAGE_DATA_SUCCESS,
    payload: sendNewMessageDataReturn
});

export const sendNewMessageDataFailure = (error: string) => ({
    type: SEND_NEW_MESSAGE_DATA_FAILURE,
    payload: error
});

export const fetchAllUsersMessagesDataRequest = (recipient_id: string) => ({
    type: FETCH_MESSAGE_DATA_REQUEST
});

export const fetchAllUsersMessagesDataSuccess = (messageData: UserWithMessages[]) => ({
    type: FETCH_MESSAGE_DATA_SUCCESS,
    payload: messageData
});

export const fetchAllUsersMessagesDataFailure = (error: string) => ({
    type: FETCH_MESSAGE_DATA_FAILURE,
    payload: error
});

export const fetchAllSentMessagesDataRequest = (sender_id: string) => ({
    type: FETCH_MESSAGE_DATA_REQUEST
});

export const fetchAllSentMessagesDataSuccess = (messageData: MessageData[]) => ({
    type: FETCH_MESSAGE_DATA_SUCCESS,
    payload: messageData
});

export const fetchAllSentMessagesDataFailure = (error: string) => ({
    type: FETCH_MESSAGE_DATA_FAILURE,
    payload: error
});

export const fetchMessageDataByIdRequest = (id: string) => ({
    type: FETCH_MESSAGE_DATA_REQUEST,
    payload: id
});

export const fetchMessageDataByIdSuccess = (messageData: MessageDataReturn) => ({
    type: FETCH_MESSAGE_DATA_SUCCESS,
    payload: messageData
});

export const fetchMessageDataByIdFailure = (error: string) => ({
    type: FETCH_MESSAGE_DATA_FAILURE,
    payload: error
});

export const markMessageReadRequest = (id: string) => ({
    type: MARK_MESSAGE_READ_REQUEST,
    payload: id
});

export const markMessageReadSuccess = (success: string) => ({
    type: MARK_MESSAGE_READ_SUCCESS,
    payload: success
});

export const markMessageReadFailure = (error: string) => ({
    type: MARK_MESSAGE_READ_FAILURE,
    payload: error
});

export const markMessageUnreadRequest = (id: string) => ({
    type: MARK_MESSAGE_UNREAD_REQUEST,
    payload: id
});

export const markMessageUnreadSuccess = (success: string) => ({
    type: MARK_MESSAGE_UNREAD_SUCCESS,
    payload: success
});

export const markMessageUnreadFailure = (error: string) => ({
    type: MARK_MESSAGE_UNREAD_FAILURE,
    payload: error
});

export const deleteMessageRequest = (id: string) => ({
    type: DELETE_MESSAGE_REQUEST,
    payload: deleteMessage
});

export const deleteMessageSuccess = (id: string) => ({
    type: DELETE_MESSAGE_SUCCESS,
    payload: id
});

export const deleteMessageFailure = (error: string) => ({
    type: DELETE_MESSAGE_FAILURE,
    payload: error
});

export const sendNewMessageData = (sender_id: string, recipient_id: string, subject: string, body: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(sendNewMessageDataRequest(sender_id, recipient_id, subject, body));

        try {
            const response = await axios.post(`${URL}/api/new-message`,
                {sender_id: sender_id,
                recipient_id: recipient_id,
                subject: subject,
                body: body});
            dispatch(sendNewMessageDataSuccess(response.data))
        } catch (error: any) {
            dispatch(sendNewMessageDataFailure(error.message))
        }
    }
};

export const fetchAllUsersMessagesData = (username: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchAllUsersMessagesDataRequest(username));

        try {
            const response = await axios.get(`${URL}/messages/${username}`);
            const responseData: UserWithMessages[] = response.data.messages;
            dispatch(fetchAllUsersMessagesDataSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchAllUsersMessagesDataFailure(error.message))
        }
    }
};

export const fetchAllSentMessagesData = (username: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchAllSentMessagesDataRequest(username));

        try {
            const response = await axios.get(`${URL}/messages/${username}/sent`);
            const responseData: MessageData[] = response.data.messages;
            dispatch(fetchAllSentMessagesDataSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchAllSentMessagesDataFailure(error.message))
        }
    }
};

export const fetchMessageDataById = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchMessageDataByIdRequest(id));

        try {
            const response = await axios.get(`${URL}/messages/${id}`);
            const responseData: MessageDataReturn = response.data.message;
            dispatch(fetchMessageDataByIdSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchMessageDataByIdFailure(error.message))
        }
    }
};

export const markMessageRead = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(markMessageReadRequest(id));

        try {
            const response = await axios.patch(`${URL}/messages/${id}`);
            const responseData: string = response.data.id;
            dispatch(markMessageReadSuccess(responseData));
        } catch (error: any) {
            dispatch(markMessageReadFailure(error.message));
        }
    }
};

export const markMessageUnread = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(markMessageUnreadRequest(id));

        try {
            const response = await axios.patch(`${URL}/messages/${id}`);
            const responseData: string = response.data.id;
            dispatch(markMessageUnreadSuccess(responseData));
        } catch (error: any) {
            dispatch(markMessageUnreadFailure(error.message));
        }
    }
};

export const deleteMessage = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(deleteMessageRequest(id));

    try {
        const response = await axios.delete(`${URL}/api/messages/${id}`)
        const responseData: string = response.data.id;
        dispatch(deleteMessageSuccess(responseData));
    } catch (error: any) {
        dispatch(deleteMessageFailure(error.message));
    }
    }
};