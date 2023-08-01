import axios from 'axios';
import { Dispatch } from 'redux';
import { URL } from '../../config';
import {    ReviewReplyData,
            NewReviewReplyData,
            NewReviewReplyDataReturn,
            SEND_NEW_REVIEW_REPLY_DATA_REQUEST,
            SEND_NEW_REVIEW_REPLY_DATA_SUCCESS,
            SEND_NEW_REVIEW_REPLY_DATA_FAILURE,
            FETCH_REVIEW_REPLY_DATA_REQUEST,
            FETCH_REVIEW_REPLY_DATA_BY_ID_REQUEST,
            FETCH_REVIEW_REPLY_DATA_SUCCESS,
            FETCH_REVIEW_REPLY_DATA_FAILURE,
            FetchReviewReplyById,
            UpdateReviewReplyData,
            UPDATE_REVIEW_REPLY_DATA_REQUEST,
            UPDATE_REVIEW_REPLY_DATA_SUCCESS,
            UPDATE_REVIEW_REPLY_DATA_FAILURE,
            DeleteReviewReply,
            DELETE_REVIEW_REPLY_REQUEST,
            DELETE_REVIEW_REPLY_SUCCESS,
            DELETE_REVIEW_REPLY_FAILURE } from '../types/reviewReplyTypes';
import { FETCH_MESSAGE_DATA_FAILURE } from '../types/messageTypes';

export const sendNewReviewReplyDataRequest = (newReviewReplyData: NewReviewReplyData) => ({
    type: SEND_NEW_REVIEW_REPLY_DATA_REQUEST,
    payload: newReviewReplyData
});

export const sendNewReviewReplyDataSuccess = (newReviewReplyDataReturn: NewReviewReplyDataReturn) => ({
    type: SEND_NEW_REVIEW_REPLY_DATA_SUCCESS,
    payload: newReviewReplyDataReturn
});

export const sendNewReviewReplyDataFailure = (error: string) => ({
    type: SEND_NEW_REVIEW_REPLY_DATA_FAILURE,
    payload: error
});

export const fetchNewReviewReplyDataRequest = (reviewId: string) => ({
    type: FETCH_REVIEW_REPLY_DATA_REQUEST,
    payload: reviewId
});

export const fetchNewReviewReplyDataSuccess = (reviewReplyDataReturn: NewReviewReplyData[]) => ({
    type: FETCH_REVIEW_REPLY_DATA_SUCCESS,
    payload: reviewReplyDataReturn
});

export const fetchNewReviewReplyDataFailure = (error: string) => ({
    type: FETCH_MESSAGE_DATA_FAILURE,
    payload: error
});

export const fetchNewReviewReplyDataByIdRequest = (fetchReviewReplyById: FetchReviewReplyById) => ({
    type: FETCH_REVIEW_REPLY_DATA_BY_ID_REQUEST,
    payload: fetchReviewReplyById
});

export const fetchNewReviewReplyDataByIdSuccess = (reviewReplyDataReturn: NewReviewReplyData) => ({
    type: FETCH_REVIEW_REPLY_DATA_SUCCESS,
    payload: reviewReplyDataReturn
});

export const fetchNewReviewReplyDataByIdFailure = (error: string) => ({
    type: FETCH_REVIEW_REPLY_DATA_FAILURE,
    payload: error
});

export const updateReviewReplyDataRequest = (id: string, updateReviewReplyData: UpdateReviewReplyData) => ({
    type: UPDATE_REVIEW_REPLY_DATA_REQUEST,
    payload: id
});

export const updateReviewReplyDataSuccess = (updateReviewReplyData: NewReviewReplyDataReturn) => ({
    type: UPDATE_REVIEW_REPLY_DATA_SUCCESS,
    payload: updateReviewReplyData
});

export const updateReviewReplyDataFailure = (error: string) => ({
    type: UPDATE_REVIEW_REPLY_DATA_FAILURE,
    payload: error
});

export const deleteReviewReplyRequest = (deleteReviewReply: DeleteReviewReply) => ({
    type: DELETE_REVIEW_REPLY_REQUEST,
    payload: deleteReviewReply
});

export const deleteReviewReplySuccess = (success: string) => ({
    type: DELETE_REVIEW_REPLY_SUCCESS,
    payload: success
});

export const deleteReviewReplyFailure = (error: string) => ({
    type: DELETE_REVIEW_REPLY_FAILURE,
    payload: error
});

export const sendNewReviewReplyData = (newReplyReviewData: NewReviewReplyData) => {
    const reviewId = newReplyReviewData.reviewId;
    const userId = newReplyReviewData.userId;
    const body = newReplyReviewData.body;

    return async (dispatch: Dispatch) => {
        dispatch(sendNewReviewReplyDataRequest(newReplyReviewData));

        try {
            const response = await axios.post(`${URL}/api/reviews/${reviewId}/reply`, {
                reviewId: reviewId,
                userId: userId,
                body: body
            });
            const responseData = response.data.reply;
            dispatch(sendNewReviewReplyDataSuccess(responseData));
        } catch (error: any) {
            dispatch(sendNewReviewReplyDataFailure(error.message))
        }
    }
};

export const fetchReviewReplyDataById = (fetchReviewReplyDataById: FetchReviewReplyById) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchNewReviewReplyDataByIdRequest(fetchReviewReplyDataById));
        const slug = fetchReviewReplyDataById.slug;
        const reviewId = fetchReviewReplyDataById.reviewId;
        const id = fetchReviewReplyDataById.id;

        try {
            const response = await axios.get(`${URL}/ski-areas/${slug}/reviews/${reviewId}/replies/${id}`);
            const responseData = response.data.reply;
            dispatch(fetchNewReviewReplyDataByIdSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchNewReviewReplyDataByIdFailure(error.message));
        }
    }
};

export const updateReviewReplyData = (id: string, data: UpdateReviewReplyData) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateReviewReplyDataRequest(id, data));

        try {
            const response = await axios.patch(`${URL}/api/reviews/reply/${id}`, data);
            const responseData = response.data.reply;
            dispatch(updateReviewReplyDataSuccess(responseData));
        } catch (error: any) {
            dispatch(updateReviewReplyDataFailure(error.message));
        }
    }
};

export const deleteReviewReply = (deleteReviewReply: DeleteReviewReply) => {
    return async (dispatch: Dispatch) => {
        dispatch(deleteReviewReplyRequest(deleteReviewReply));
        const id = deleteReviewReply.id;

        try {
            const response = await axios.delete(`${URL}/api/reviews/reply/${id}`);
            dispatch(deleteReviewReplySuccess(response.data));
        } catch (error: any) {
            dispatch(deleteReviewReplyFailure(error.message));
        }
    }
};