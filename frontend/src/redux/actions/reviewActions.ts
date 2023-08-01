import axios from "axios";
import { Dispatch } from "redux";
import { URL } from "../../config";
import {    ReviewData,
            ReviewDataReturn,
            SEND_NEW_REVIEW_DATA_REQUEST,
            SEND_NEW_REVIEW_DATA_SUCCESS,
            SEND_NEW_REVIEW_DATA_FAILURE,
            FetchReviewDataById,
            FETCH_REVIEW_DATA_REQUEST,
            FETCH_REVIEW_DATA_BY_ID_REQUEST,
            FETCH_REVIEW_DATA_SUCCESS,
            FETCH_REVIEW_DATA_FAILURE,
            UpdateReviewData,
            UpdateReviewDataReturn,
            UPDATE_REVIEW_DATA_REQUEST,
            UPDATE_REVIEW_DATA_SUCCESS,
            UPDATE_REVIEW_DATA_FAILURE,
            DELETE_REVIEW_REQUEST,
            DELETE_REVIEW_SUCCESS,
            DELETE_REVIEW_FAILURE,
            DeleteReview } from "../types/reviewTypes";

export const sendNewReviewDataRequest = (
                            userId: string, 
                            skiAreaSlug: string, 
                            body: string, 
                            stars: number,
                            photos: string[],
                            tagIds: string[]) => ({
                                type: SEND_NEW_REVIEW_DATA_REQUEST,
                                payload: {
                                    userId,
                                    skiAreaSlug,
                                    body,
                                    stars,
                                    photos,
                                    tagIds
                                }
                            });

export const sendNewReviewDataSuccess = (sendReviewDataReturn: ReviewDataReturn) => ({
    type: SEND_NEW_REVIEW_DATA_SUCCESS,
    payload: sendReviewDataReturn
});

export const sendNewReviewDataFailure = (error: string) => ({
    type: SEND_NEW_REVIEW_DATA_FAILURE,
    payload: error
});

export const fetchReviewDataBySkiAreaRequest = (skiAreaSlug: string) => ({
    type: FETCH_REVIEW_DATA_REQUEST,
    payload: skiAreaSlug
});

export const fetchReviewDataBySkiAreaSuccess = (reviewData: ReviewData[]) => ({
    type: FETCH_REVIEW_DATA_SUCCESS,
    payload: reviewData
});

export const fetchReviewDataBySkiAreaFailure = (error: string) => ({
    type: FETCH_REVIEW_DATA_FAILURE,
    payload: error
});

export const fetchReviewDataByIdRequest = (fetchReviewDataById: FetchReviewDataById) => ({
    type: FETCH_REVIEW_DATA_BY_ID_REQUEST,
    payload: fetchReviewDataById
});

export const fetchReviewDataByIdSuccess = (reviewData: ReviewData) => ({
    type: FETCH_REVIEW_DATA_SUCCESS,
    payload: reviewData
});

export const fetchReviewDataByIdFailure = (error: string) => ({
    type: FETCH_REVIEW_DATA_FAILURE,
    payload: error
});

export const updateReviewDataRequest = (id: string, updateReviewData: UpdateReviewData) => ({
    type: UPDATE_REVIEW_DATA_REQUEST,
    payload: updateReviewData
});

export const updateReviewDataSuccess = (updateReviewDataReturn: UpdateReviewDataReturn) => ({
    type: UPDATE_REVIEW_DATA_SUCCESS,
    payload: updateReviewDataReturn
});

export const updateReviewDataFailure = (error: string) => ({
    type: UPDATE_REVIEW_DATA_FAILURE,
    payload: error  
});

export const deleteReviewRequest = (deleteReview: DeleteReview) => ({
    type: DELETE_REVIEW_REQUEST,
    payload: deleteReview
});

export const deleteReviewSuccess = (success: string) => ({
    type: DELETE_REVIEW_SUCCESS,
    payload: success
});

export const deleteReviewFailure = (error: string) => ({
    type: DELETE_REVIEW_FAILURE,
    payload: error
});

export const sendNewReviewData = (
        userId: string, 
        skiAreaSlug: string, 
        body: string, 
        stars: number,
        photos: string[],
        tagIds: string[]) => {
            return async (dispatch: Dispatch) => {
                dispatch(sendNewReviewDataRequest(userId, skiAreaSlug, body, stars, photos, tagIds));

                try {
                    const response = await axios.post(`${URL}/api/ski-areas/${skiAreaSlug}/review`,
                        {   userId: userId,
                            skiAreaSlug: skiAreaSlug,
                            body: body,
                            stars: stars,
                            photos: photos,
                            tagIds: tagIds});
                    dispatch(sendNewReviewDataSuccess(response.data));
                } catch (error: any) {
                    dispatch(sendNewReviewDataFailure(error.message));
                }
            }
        };

export const fetchReviewDataBySkiArea = (skiAreaSlug: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchReviewDataBySkiAreaRequest(skiAreaSlug));

        try {
            const response = await axios.get(`${URL}/ski-areas/${skiAreaSlug}/reviews`);
            const responseData: ReviewData[] = response.data.reviews;
            dispatch(fetchReviewDataBySkiAreaSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchReviewDataBySkiAreaFailure(error.message));
        }
    }
};

export const fetchReviewDataById = (fetchReviewDataById: FetchReviewDataById) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchReviewDataByIdRequest(fetchReviewDataById));
        const slug = fetchReviewDataById.skiAreaSlug
        const id = fetchReviewDataById.id

        try {
            const response = await axios.get(`${URL}/ski-areas/${slug}/reviews/${id}`);
            const responseData: ReviewData = response.data.review;
            dispatch(fetchReviewDataByIdSuccess(responseData));
        } catch (error: any) {
            dispatch(fetchReviewDataByIdFailure(error.message));
        }
    }
};

export const updateReview = (id: string, data: UpdateReviewData) => {
    return async (dispatch: Dispatch) => {
        dispatch(updateReviewDataRequest(id, data));

        try {
            const response = await axios.patch(`${URL}/api/reviews/${id}`, data);
            const responseData = response.data.review;
            dispatch(updateReviewDataSuccess(responseData));
        } catch (error: any) {
            dispatch(updateReviewDataFailure(error.message));
        }
    }
};

export const deleteReview = (deleteReview: DeleteReview) => {
    return async (dispatch: Dispatch) => {
        dispatch(deleteReviewRequest(deleteReview))
        const id = deleteReview.id;
        const slug = deleteReview.skiAreaSlug

        try {
            const response = await axios.delete(`${URL}/api/${slug}/reviews/${id}`);
            const responseData: string = response.data.id;
            dispatch(deleteReviewSuccess(responseData));
        }  catch (error: any) {
            dispatch(deleteReviewFailure(error.message));
        }
    }
};