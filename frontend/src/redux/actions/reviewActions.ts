import axios from "axios";
import { Dispatch } from "redux";
import { URL } from "../../utils/config";
import {
  ReviewData,
  NewReviewData,
  ReviewDataReturn,
  UpdateReviewData,
  SEND_NEW_REVIEW_DATA_REQUEST,
  SEND_NEW_REVIEW_DATA_SUCCESS,
  SEND_NEW_REVIEW_DATA_FAILURE,
  FETCH_ALL_REVIEWS_DATA_REQUEST,
  FETCH_ALL_REVIEWS_DATA_SUCCESS,
  FETCH_ALL_REVIEWS_DATA_FAILURE,
  FETCH_REVIEW_DATA_BY_ID_REQUEST,
  FETCH_REVIEW_DATA_SUCCESS,
  FETCH_REVIEW_DATA_FAILURE,
  UPDATE_REVIEW_DATA_REQUEST,
  UPDATE_REVIEW_DATA_SUCCESS,
  UPDATE_REVIEW_DATA_FAILURE,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
} from "../types/reviewTypes";

export const sendNewReviewDataRequest = (newReviewData: NewReviewData) => ({
  type: SEND_NEW_REVIEW_DATA_REQUEST,
  payload: newReviewData,
});

export const sendNewReviewDataSuccess = (reviewData: ReviewData) => ({
  type: SEND_NEW_REVIEW_DATA_SUCCESS,
  payload: reviewData,
});

export const sendNewReviewDataFailure = (error: string) => ({
  type: SEND_NEW_REVIEW_DATA_FAILURE,
  payload: error,
});

export const fetchAllReviewsDataRequest = () => ({
  type: FETCH_ALL_REVIEWS_DATA_REQUEST,
});

export const fetchAllReviewsDataSuccess = (reviewData: ReviewDataReturn[]) => ({
  type: FETCH_ALL_REVIEWS_DATA_SUCCESS,
  payload: reviewData,
});

export const fetchAllReviewsDataFailure = (error: string) => ({
  type: FETCH_ALL_REVIEWS_DATA_FAILURE,
  payload: error,
});

export const fetchReviewDataByIdRequest = (slug: string, id: string) => ({
  type: FETCH_REVIEW_DATA_BY_ID_REQUEST,
  payload: {
    slug,
    id,
  },
});

export const fetchReviewDataByIdSuccess = (reviewData: ReviewDataReturn) => ({
  type: FETCH_REVIEW_DATA_SUCCESS,
  payload: reviewData,
});

export const fetchReviewDataByIdFailure = (error: string) => ({
  type: FETCH_REVIEW_DATA_FAILURE,
  payload: error,
});

export const updateReviewDataRequest = (
  updateReviewData: UpdateReviewData
) => ({
  type: UPDATE_REVIEW_DATA_REQUEST,
  payload: updateReviewData,
});

export const updateReviewDataSuccess = (reviewData: ReviewDataReturn) => ({
  type: UPDATE_REVIEW_DATA_SUCCESS,
  payload: reviewData,
});

export const updateReviewDataFailure = (error: string) => ({
  type: UPDATE_REVIEW_DATA_FAILURE,
  payload: error,
});

export const deleteReviewRequest = (slug: string, id: string) => ({
  type: DELETE_REVIEW_REQUEST,
  payload: {
    slug,
    id,
  },
});

export const deleteReviewSuccess = (success: string) => ({
  type: DELETE_REVIEW_SUCCESS,
  payload: success,
});

export const deleteReviewFailure = (error: string) => ({
  type: DELETE_REVIEW_FAILURE,
  payload: error,
});

export const sendNewReviewData = (newReviewData: NewReviewData) => {
  return async (dispatch: Dispatch) => {
    dispatch(sendNewReviewDataRequest(newReviewData));
    const slug = newReviewData.skiAreaSlug;

    try {
      const response = await axios.post(`${URL}/api/ski-areas/${slug}/review`, {
        userId: newReviewData.userId,
        skiAreaSlug: newReviewData.skiAreaSlug,
        header: newReviewData.header,
        body: newReviewData.body,
        stars: newReviewData.stars,
        photos: newReviewData.photos,
        tagIds: newReviewData.tags,
      });
      const responseData = response.data.review;
      dispatch(sendNewReviewDataSuccess(responseData));
    } catch (error: any) {
      dispatch(sendNewReviewDataFailure(error.message));
    }
  };
};

export const fetchAllReviewsData = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchAllReviewsDataRequest());

    try {
      const response = await axios.get(`${URL}/ski-area/reviews`);
      const responseData = response.data.reviews;
      dispatch(fetchAllReviewsDataSuccess(responseData));
    } catch (error: any) {
      dispatch(fetchAllReviewsDataFailure(error.message));
    }
  };
};

export const fetchReviewDataById = (slug: string, id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchReviewDataByIdRequest(slug, id));

    try {
      const response = await axios.get(
        `${URL}/ski-areas/${slug}/reviews/${id}`
      );
      const responseData = response.data.review;
      dispatch(fetchReviewDataByIdSuccess(responseData));
    } catch (error: any) {
      dispatch(fetchReviewDataByIdFailure(error.message));
    }
  };
};

export const updateReviewData = (updateReviewData: UpdateReviewData) => {
  return async (dispatch: Dispatch) => {
    dispatch(updateReviewDataRequest(updateReviewData));
    const id = updateReviewData.id;

    try {
      const response = await axios.patch(`${URL}/api/reviews/${id}`, {
        id: id,
        userId: updateReviewData.userId,
        username: updateReviewData.username,
        skiAreaSlug: updateReviewData.skiAreaSlug,
        skiAreaName: updateReviewData.skiAreaName,
        header: updateReviewData.header,
        body: updateReviewData.body,
        stars: updateReviewData.stars,
        photos: updateReviewData.photos,
        tags: updateReviewData.tags,
      });
      const responseData = response.data.review;
      dispatch(updateReviewDataSuccess(responseData));
    } catch (error: any) {
      dispatch(updateReviewDataFailure(error.message));
    }
  };
};

export const deleteReview = (slug: string, id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteReviewRequest(slug, id));

    try {
      const response = await axios.delete(`${URL}/api/${slug}/reviews/${id}`);
      dispatch(deleteReviewSuccess(response.data));
    } catch (error: any) {
      dispatch(deleteReviewFailure(error.message));
    }
  };
};
