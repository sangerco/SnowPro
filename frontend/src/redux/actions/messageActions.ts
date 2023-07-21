import axios from "axios";
import { Dispatch } from "redux";
import { URL } from "../../config";
import {    MessageData,
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
            DeleteMessage } from "../types/messageTypes";

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

export const fetchAllUsersMessagesDataSuccess = (messageData: MessageData) => ({
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

export const fetchAllSentMessagesDataSuccess = (messageData: MessageData) => ({
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

export const fetchMessageDataByIdSuccess = (messageData: MessageData) => ({
    type: FETCH_MESSAGE_DATA_SUCCESS,
    payload: messageData
});

export const fetchMessageDataByIdFailure = (error: string) => ({
    type: FETCH_MESSAGE_DATA_FAILURE,
    payload: error
});

export const deleteMessageRequest = (deleteMessage: DeleteMessage) => ({
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
})

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

export const fetchAllUsersMessagesData = (recipient_id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchAllUsersMessagesDataRequest(recipient_id));

        try {
            const response = await axios.get(`${URL}/messages/${recipient_id}`);
            const responseData: MessageData = response.data.messages;
            dispatch(fetchAllUsersMessagesDataSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchAllUsersMessagesDataFailure(error.message))
        }
    }
};

export const fetchAllSentMessagesData = (sender_id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchAllSentMessagesDataRequest(sender_id));

        try {
            const response = await axios.get(`${URL}/messages/${sender_id}/sent`);
            const responseData: MessageData = response.data.messages;
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
            const responseData: MessageData = response.data.message;
            dispatch(fetchMessageDataByIdSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchMessageDataByIdFailure(error.message))
        }
    }
};

export const deleteMessage = (deleteMessage: DeleteMessage) => {
    return async (dispatch: Dispatch) => {
        dispatch(deleteMessageRequest(deleteMessage));
        const id = deleteMessage.id

    try {
        const response = await axios.delete(`${URL}/api/messages/${id}`)
        const responseData: string = response.data;
        dispatch(deleteMessageSuccess(responseData));
    } catch (error: any) {
        dispatch(deleteMessageFailure(error.message));
    }
    }
};