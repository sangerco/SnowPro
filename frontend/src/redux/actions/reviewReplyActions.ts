import axios from "axios";
import { AppDispatch } from "../store";
import { URL } from "../../utils/config";
import {
  ReviewReplyData,
  NewReviewReplyData,
  UpdateReviewReplyData,
  SEND_NEW_REVIEW_REPLY_DATA_REQUEST,
  SEND_NEW_REVIEW_REPLY_DATA_SUCCESS,
  SEND_NEW_REVIEW_REPLY_DATA_FAILURE,
  FETCH_REVIEW_REPLY_DATA_BY_ID_REQUEST,
  FETCH_REVIEW_REPLY_DATA_BY_ID_SUCCESS,
  FETCH_REVIEW_REPLY_DATA_BY_REVIEW_ID_REQUEST,
  FETCH_REVIEW_REPLY_DATA_BY_REVIEW_ID_SUCCESS,
  FETCH_REVIEW_REPLY_DATA_FAILURE,
  UPDATE_REVIEW_REPLY_DATA_REQUEST,
  UPDATE_REVIEW_REPLY_DATA_SUCCESS,
  UPDATE_REVIEW_REPLY_DATA_FAILURE,
  DELETE_REVIEW_REPLY_REQUEST,
  DELETE_REVIEW_REPLY_SUCCESS,
  DELETE_REVIEW_REPLY_FAILURE,
} from "../types/reviewReplyTypes";

export const sendNewReviewReplyDataRequest = (
  newReviewReplyData: NewReviewReplyData
) => ({
  type: SEND_NEW_REVIEW_REPLY_DATA_REQUEST,
  payload: newReviewReplyData,
});

export const sendNewReviewReplyDataSuccess = (
  reviewReplyData: ReviewReplyData
) => ({
  type: SEND_NEW_REVIEW_REPLY_DATA_SUCCESS,
  payload: reviewReplyData,
});

export const sendNewReviewReplyDataFailure = (error: string) => ({
  type: SEND_NEW_REVIEW_REPLY_DATA_FAILURE,
  payload: error,
});

export const fetchReviewReplyDataByIdRequest = (
  slug: string,
  reviewId: string,
  id: string
) => ({
  type: FETCH_REVIEW_REPLY_DATA_BY_ID_REQUEST,
  payload: {
    slug,
    reviewId,
    id,
  },
});

export const fetchReviewReplyDataByIdSuccess = (
  reviewReplyData: ReviewReplyData
) => ({
  type: FETCH_REVIEW_REPLY_DATA_BY_ID_SUCCESS,
  payload: reviewReplyData,
});

export const fetchReviewReplyDataByIdFailure = (error: string) => ({
  type: FETCH_REVIEW_REPLY_DATA_FAILURE,
  payload: error,
});

export const fetchReviewReplyDataByReviewIdRequest = (
  slug: string,
  reviewId: string
) => ({
  type: FETCH_REVIEW_REPLY_DATA_BY_REVIEW_ID_REQUEST,
  payload: {
    slug,
    reviewId,
  },
});

export const fetchReviewReplyDataByReviewIdSuccess = (
  reviewReplyData: ReviewReplyData[]
) => ({
  type: FETCH_REVIEW_REPLY_DATA_BY_REVIEW_ID_SUCCESS,
  payload: reviewReplyData,
});

export const fetchReviewReplyDataByReviewIdFailure = (error: string) => ({
  type: FETCH_REVIEW_REPLY_DATA_FAILURE,
  payload: error,
});

export const fetchReviewReplyDataFailure = (error: string) => ({
  type: FETCH_REVIEW_REPLY_DATA_FAILURE,
  payload: error,
});

export const updateReviewReplyDataRequest = (
  updateReviewReplyData: UpdateReviewReplyData
) => ({
  type: UPDATE_REVIEW_REPLY_DATA_REQUEST,
  payload: updateReviewReplyData,
});

export const updateReviewReplyDataSuccess = (
  reviewReplyData: ReviewReplyData
) => ({
  type: UPDATE_REVIEW_REPLY_DATA_SUCCESS,
  payload: reviewReplyData,
});

export const updateReviewReplyDataFailure = (error: string) => ({
  type: UPDATE_REVIEW_REPLY_DATA_FAILURE,
  payload: error,
});

export const deleteReviewReplyRequest = (id: string) => ({
  type: DELETE_REVIEW_REPLY_REQUEST,
  payload: id,
});

export const deleteReviewReplySuccess = (success: string) => ({
  type: DELETE_REVIEW_REPLY_SUCCESS,
  payload: success,
});

export const deleteReviewReplyFailure = (error: string) => ({
  type: DELETE_REVIEW_REPLY_FAILURE,
  payload: error,
});

export const sendNewReviewReplyData = (
  newReviewReplyData: NewReviewReplyData
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(sendNewReviewReplyDataRequest(newReviewReplyData));
    const reviewId = newReviewReplyData.reviewId;
    try {
      const response = await axios.post(
        `${URL}/api/reviews/${reviewId}/reply`,
        { newReviewReplyData }
      );
      const responseData = response.data.reply;
      dispatch(sendNewReviewReplyDataSuccess(responseData));
    } catch (error: any) {
      dispatch(sendNewReviewReplyDataFailure(error.messageId));
    }
  };
};

export const fetchReviewReplyDataById = (
  slug: string,
  reviewId: string,
  id: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchReviewReplyDataByIdRequest(slug, reviewId, id));

    try {
      const response = await axios.get(
        `${URL}/ski-areas/${slug}/reviews/${reviewId}/replies/${id}`
      );
      const responseData = response.data.reply;
      dispatch(fetchReviewReplyDataByIdSuccess(responseData));
    } catch (error: any) {
      dispatch(fetchReviewReplyDataByIdFailure(error.message));
    }
  };
};

export const fetchReviewReplyDataByReviewId = (
  slug: string,
  reviewId: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchReviewReplyDataByReviewIdRequest(slug, reviewId));

    try {
      const response = await axios.get(
        `${URL}/ski-areas/${slug}/reviews/${reviewId}/replies`
      );
      const responseData = response.data.reviewReplyData;
      dispatch(fetchReviewReplyDataByReviewIdSuccess(responseData));
    } catch (error: any) {
      dispatch(fetchReviewReplyDataByReviewIdFailure(error.message));
    }
  };
};

export const updateReviewReplyData = (
  updateReviewReplyData: UpdateReviewReplyData
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(updateReviewReplyDataRequest(updateReviewReplyData));
    const id = updateReviewReplyData.id;

    try {
      const response = await axios.patch(`${URL}/api/reviews/reply/${id}`, {
        updateReviewReplyData,
      });
      const responseData = response.data.reply;
      dispatch(updateReviewReplyDataSuccess(responseData));
    } catch (error: any) {
      dispatch(updateReviewReplyDataFailure(error.message));
    }
  };
};

export const deleteReviewReply = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(deleteReviewReplyRequest(id));

    try {
      const response = await axios.delete(`${URL}/api/reviews/reply/${id}`);
      dispatch(deleteReviewReplySuccess(response.data));
    } catch (error: any) {
      dispatch(deleteReviewReplyFailure(error.message));
    }
  };
};
