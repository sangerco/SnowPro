import { ReviewReplyData } from "./reviewReplyTypes";

export interface ReviewData {
    id: string;
    userId: string;
    username: string;
    skiAreaSlug: string;
    skiAreaName: string;
    header: string;
    body: string;
    stars: number;
    photos: string[];
    tags: string[];
    createdAt: Date;
};

export interface ReviewDataReturn {
    review: ReviewData;
    reviewReplies: ReviewReplyData[];
};

export interface NewReviewData {
    userId: string;
    username: string;
    skiAreaSlug: string;
    header: string;
    body: string;
    stars: number;
    photos: string[];
    tags: string[];
};

export interface NewReviewDataReturn {
    id: string;
    userId: string;
    username: string;
    skiAreaSlug: string;
    header: string;
    body: string;
    stars: number;
    photos: string[];
    tags: string[];
    createdAt: Date;
};

export interface UpdateReviewData {
    id?: string;
    userId?: string;
    username?: string;
    skiAreaSlug?: string;
    skiAreaName?: string;
    header?: string;
    body?: string;
    stars?: number;
    photos?: string[];
    tags?: string[];
};

export interface UpdateReviewDataReturn {
    id: string;
    userId: string;
    username: string;
    skiAreaSlug: string;
    skiAreaName: string;
    header: string;
    body: string;
    stars: number;
    photos: string[];
    tags: string[];
}

export interface FetchReviewDataById {
    skiAreaSlug: string;
    id: string;
}

export interface DeleteReview {
    skiAreaSlug: string;
    id: string;
};

export const SEND_NEW_REVIEW_DATA_REQUEST = 'SEND_NEW_REVIEW_DATA_REQUEST';
export const SEND_NEW_REVIEW_DATA_SUCCESS = 'SEND_NEW_REVIEW_DATA_SUCCESS';
export const SEND_NEW_REVIEW_DATA_FAILURE = 'SEND_NEW_REVIEW_DATA_FAILURE';
export const FETCH_REVIEW_DATA_REQUEST = 'FETCH_REVIEW_DATA_REQUEST';
export const FETCH_REVIEW_DATA_BY_ID_REQUEST = 'FETCH_REVIEW_DATA_BY_ID_REQUEST';
export const FETCH_REVIEW_DATA_SUCCESS = 'FETCH_REVIEW_DATA_SUCCESS';
export const FETCH_REVIEW_DATA_FAILURE = 'FETCH_REVIEW_DATA_FAILURE';
export const UPDATE_REVIEW_DATA_REQUEST = 'UPDATE_REVIEW_DATA_REQUEST';
export const UPDATE_REVIEW_DATA_SUCCESS = 'UPDATE_REVIEW_DATA_SUCCESS';
export const UPDATE_REVIEW_DATA_FAILURE = 'UPDATE_REVIEW_DATA_FAILURE';
export const DELETE_REVIEW_REQUEST = 'DELETE_REVIEW_REQUEST';
export const DELETE_REVIEW_SUCCESS = 'DELETE_REVIEW_SUCCESS';
export const DELETE_REVIEW_FAILURE = 'DELETE_REVIEW_FAILURE';

export interface sendNewReviewDataRequestAction {
    type: typeof SEND_NEW_REVIEW_DATA_REQUEST,
    payload: NewReviewData
};

export interface sendNewReviewDataSuccessAction {
    type: typeof SEND_NEW_REVIEW_DATA_SUCCESS,
    payload: NewReviewDataReturn
};

export interface sendNewReviewDataFailureAction {
    type: typeof SEND_NEW_REVIEW_DATA_FAILURE,
    payload: string
};

export interface fetchReviewDataRequestAction {
    type: typeof FETCH_REVIEW_DATA_REQUEST,
    payload: string
};

export interface fetchReviewDataByIdRequestAction {
    type: typeof FETCH_REVIEW_DATA_BY_ID_REQUEST,
    payload: FetchReviewDataById
};

export interface fetchReviewDataSuccessAction {
    type: typeof FETCH_REVIEW_DATA_SUCCESS,
    payload: ReviewDataReturn
};

export interface fetchReviewDataFailureAction {
    type: typeof FETCH_REVIEW_DATA_FAILURE,
    payload: string
};

export interface updateReviewDataRequestAction {
    type: typeof UPDATE_REVIEW_DATA_REQUEST,
    payload: UpdateReviewData
};

export interface updateReviewDataSuccessAction {
    type: typeof UPDATE_REVIEW_DATA_SUCCESS,
    payload: UpdateReviewDataReturn
};

export interface updateReviewDataFailureAction {
    type: typeof UPDATE_REVIEW_DATA_FAILURE,
    payload: string
};

export interface deleteReviewRequestAction {
    type: typeof DELETE_REVIEW_REQUEST,
    payload: DeleteReview
};

export interface deleteReviewSuccessAction {
    type: typeof DELETE_REVIEW_SUCCESS,
    payload: string
};

export interface deleteReviewFailureAction {
    type: typeof DELETE_REVIEW_FAILURE,
    payload: string 
};