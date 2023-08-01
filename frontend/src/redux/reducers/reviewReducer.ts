import {    SEND_NEW_REVIEW_DATA_REQUEST,
            SEND_NEW_REVIEW_DATA_SUCCESS,
            SEND_NEW_REVIEW_DATA_FAILURE,
            ReviewData,
            NewReviewData,
            FETCH_REVIEW_DATA_BY_ID_REQUEST,
            FETCH_REVIEW_DATA_SUCCESS,
            FETCH_REVIEW_DATA_FAILURE,
            UPDATE_REVIEW_DATA_REQUEST,
            UPDATE_REVIEW_DATA_SUCCESS,
            UPDATE_REVIEW_DATA_FAILURE,
            UpdateReviewData,
            DELETE_REVIEW_REQUEST,
            DELETE_REVIEW_SUCCESS,
            DELETE_REVIEW_FAILURE,
            DeleteReview } from "../types/reviewTypes";

interface ReviewState {
    data: ReviewData | null;
    error: string | null;
};

interface NewReviewState {
    data: NewReviewData | null;
    error: string | null;
};

interface UpdateReviewState {
    data: UpdateReviewData | null;
    error: string | null;
};

interface DeleteReviewState {
    data: DeleteReview | null;
    error: string | null;
};

const initialReviewState: ReviewState = {
    data: null,
    error: null
};

const initialNewReviewState: NewReviewState = {
    data: null,
    error: null
};

const initialUpdateReviewState: UpdateReviewState = {
    data: null,
    error: null
};

const initialDeleteReviewState: DeleteReviewState = {
    data: null,
    error: null
};

export const reviewReducer = (state = initialReviewState, action: any) => {
    switch(action.type) {
        case FETCH_REVIEW_DATA_BY_ID_REQUEST:
            return {
                ...state,
                error: null
            };
        case FETCH_REVIEW_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case FETCH_REVIEW_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state
    }
};

export const newReviewReducer = (state = initialNewReviewState, action: any) => {
    switch(action.type) {
        case SEND_NEW_REVIEW_DATA_REQUEST:
            return {
                ...state,
                error: null
            };
        case SEND_NEW_REVIEW_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case SEND_NEW_REVIEW_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
};


export const updateReviewReducer = (state = initialUpdateReviewState, action: any) => {
    switch(action.type) {
        case UPDATE_REVIEW_DATA_REQUEST:
            return {
                ...state,
                error: null
            };
        case UPDATE_REVIEW_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case UPDATE_REVIEW_DATA_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
};

export const deleteReviewReducer = (state = initialDeleteReviewState, action: any) => {
    switch(action.type) {
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                error: null
            };
        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case DELETE_REVIEW_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state; 
    }
}