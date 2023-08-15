import axios from "axios";
import { Dispatch } from "redux";
import { URL } from "../../utils/config";
import {    ReplyData,
            SEND_NEW_REPLY_DATA_REQUEST,
            SEND_NEW_REPLY_DATA_SUCCESS,
            SEND_NEW_REPLY_DATA_FAILURE,
            FETCH_REPLY_DATA_REQUEST,
            FETCH_REPLY_DATA_SUCCESS,
            FETCH_REPLY_DATA_FAILURE,
            DELETE_REPLY_REQUEST,
            DELETE_REPLY_SUCCESS,
            DELETE_REPLY_FAILURE,
            DeleteReply, 
            NewReplyData,
            MARK_REPLY_READ_REQUEST,
            MARK_REPLY_READ_SUCCESS,
            MARK_REPLY_READ_FAILURE,
            MARK_REPLY_UNREAD_REQUEST,
            MARK_REPLY_UNREAD_SUCCESS,
            MARK_REPLY_UNREAD_FAILURE} from "../types/messageReplyTypes";

export const sendNewReplyDataRequest = (
    message_id: string,
    sender_id: string,
    recipient_id: string,
    subject: string,
    body: string) => ({
        type: SEND_NEW_REPLY_DATA_REQUEST,
        payload: {
            message_id,
            sender_id,
            recipient_id,
            subject,
            body
        }
    });

export const sendNewReplyDataSuccess = (sendNewReplyDataReturn: NewReplyData) => ({
    type: SEND_NEW_REPLY_DATA_SUCCESS,
    payload: sendNewReplyDataReturn
});

export const sendNewReplyDataFailure = (error: string) => ({
    type: SEND_NEW_REPLY_DATA_FAILURE,
    payload: error
});

export const fetchReplyDataByReplyIdRequest = (message_id: string, id: string) => ({
    type: FETCH_REPLY_DATA_REQUEST,
    payload: message_id, id
});

export const fetchReplyDataByReplyIdSuccess = (replyData: ReplyData) => ({
    type: FETCH_REPLY_DATA_SUCCESS,
    payload: replyData
});

export const fetchReplyDataByReplyIdFailure = (error: string) => ({
    type: FETCH_REPLY_DATA_FAILURE,
    payload: error
});

export const fetchReplyDataByMessageIdRequest = (message_id: string) => ({
    type: FETCH_REPLY_DATA_REQUEST,
    payload: message_id
});

export const fetchReplyDataByMessageIdSuccess = (replyData: ReplyData[]) => ({
    type: FETCH_REPLY_DATA_SUCCESS,
    payload: replyData
});

export const fetchReplyDataByMessageIdFailure = (error: string) => ({
    type: FETCH_REPLY_DATA_FAILURE,
    payload: error
});

export const markReplyReadRequest = (id: string) => ({
    type: MARK_REPLY_READ_REQUEST,
    payload: id
});

export const markReplyReadSuccess = (success: string) => ({
    type: MARK_REPLY_READ_SUCCESS,
    payload: success
});

export const markReplyReadFailure = (error: string) => ({
    type: MARK_REPLY_READ_FAILURE,
    payload: error
});

export const markReplyUnreadRequest = (id: string) => ({
    type: MARK_REPLY_UNREAD_REQUEST,
    payload: id
});

export const markReplyUnreadSuccess = (success: string) => ({
    type: MARK_REPLY_UNREAD_SUCCESS,
    payload: success
});

export const markReplyUnreadFailure = (error: string) => ({
    type: MARK_REPLY_UNREAD_FAILURE,
    payload: error
});

export const deleteReplyRequest = (deleteReply: DeleteReply) => ({
    type: DELETE_REPLY_REQUEST,
    payload: deleteReply
});

export const deleteReplySuccess = (id: string) => ({
    type: DELETE_REPLY_SUCCESS,
    payload: id
});

export const deleteReplyFailure = (error: string) => ({
    type: DELETE_REPLY_FAILURE,
    payload: error
});

export const sendNewReplyData = (formData: NewReplyData) => {
    return async (dispatch: Dispatch) => {
        dispatch(sendNewReplyDataRequest(
                formData.message_id,
                formData.sender_id,
                formData.recipient_id,
                formData.subject,
                formData.body));

        try {
            const response = await axios.post(`${URL}/api/messages/${formData.message_id}/reply`,
                {message_id: formData.message_id,
                sender_id: formData.sender_id,
                recipient_id: formData.recipient_id,
                subject: formData.subject,
                body: formData.body});
            dispatch(sendNewReplyDataSuccess(response.data))
        } catch (error: any) {
            dispatch(sendNewReplyDataFailure(error.message))
        }
    }
};

export const fetchReplyDataByReplyId = (message_id: string, id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchReplyDataByReplyIdRequest(message_id, id));

        try {
            const response = await axios.post(`${URL}/messages/${message_id}/replies/${id}`);
            const responseData: ReplyData = response.data.replies;
            dispatch(fetchReplyDataByReplyIdSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchReplyDataByReplyIdFailure(error.message))
        }
    }
};

export const fetchReplyDataByMessageId = (message_id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchReplyDataByMessageIdRequest(message_id));

        try {
            const response = await axios.post(`${URL}/messages/${message_id}/replies`);
            const responseData: ReplyData[] = response.data.replies;
            dispatch(fetchReplyDataByMessageIdSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchReplyDataByMessageIdFailure(error.message))
        }
    }
};

export const markReplyRead = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(markReplyReadRequest(id));

        try {
            const response = await axios.patch(`${URL}/messages/replies/${id}`);
            const responseData: string = response.data.id;
            dispatch(markReplyReadSuccess(responseData));
        } catch (error: any) {
            dispatch(markReplyReadFailure(error.message));
        }
    }
};

export const markReplyUnread = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(markReplyUnreadRequest(id));

        try {
            const response = await axios.patch(`${URL}/messages/replies/${id}`);
            const responseData: string = response.data.id;
            dispatch(markReplyUnreadSuccess(responseData));
        } catch (error: any) {
            dispatch(markReplyUnreadFailure(error.message));
        }
    }
};

export const deleteReplyData = (deleteReply: DeleteReply) => {
    return async (dispatch: Dispatch) => {
        dispatch(deleteReplyRequest(deleteReply));
        const message_id = deleteReply.message_id;
        const id = deleteReply.id;

        try {
            const response = await axios.delete(`${URL}/api/messages/${message_id}/replies/${id}`);
            const responseData: string = response.data;
            dispatch(deleteReplySuccess(responseData));
        } catch (error: any) {
            dispatch(deleteReplyFailure(error.message));
        }
    }
};