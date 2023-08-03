export interface ReviewReplyData {
    id: string;
    reviewId: string;
    userId: string;
    username: string;
    body: string,
    slug: string,
    createdAt: Date;
};

export interface NewReviewReplyData {
    reviewId: string;
    userId: string;
    body: string;
    slug: string;
};

export interface NewReviewReplyDataReturn {
    id: string;
    reviewId: string;
    userId: string;
    username: string;
    body: string;
    slug: string;
};

export interface FetchReviewReplyById {
    slug: string;
    id: string;
    reviewId: string;
};

export interface UpdateReviewReplyData {
    id?: string;
    reviewId?: string;
    userId?: string;
    body?: string,
    slug?: string;
    createdAt?: Date;
};

export interface DeleteReviewReply {
    id: string;
    reviewId: string
};

export const SEND_NEW_REVIEW_REPLY_DATA_REQUEST = 'SEND_NEW_REVIEW_REPLY_DATA_REQUEST';
export const SEND_NEW_REVIEW_REPLY_DATA_SUCCESS = 'SEND_NEW_REVIEW_REPLY_DATA_SUCCESS';
export const SEND_NEW_REVIEW_REPLY_DATA_FAILURE = 'SEND_NEW_REVIEW_REPLY_DATA_FAILURE';
export const FETCH_REVIEW_REPLY_DATA_REQUEST = 'FETCH_REVIEW_REPLY_DATA_REQUEST';
export const FETCH_REVIEW_REPLY_DATA_BY_ID_REQUEST = 'FETCH_REVIEW_REPLY_DATA_BY_ID_REQUEST';
export const FETCH_REVIEW_REPLY_DATA_SUCCESS = 'FETCH_REVIEW_REPLY_DATA_SUCCESS';
export const FETCH_REVIEW_REPLY_DATA_FAILURE = 'FETCH_REVIEW_REPLY_DATA_FAILURE';
export const UPDATE_REVIEW_REPLY_DATA_REQUEST = 'UPDATE_REVIEW_REPLY_DATA_REQUEST';
export const UPDATE_REVIEW_REPLY_DATA_SUCCESS = 'UPDATE_REVIEW_REPLY_DATA_SUCCESS';
export const UPDATE_REVIEW_REPLY_DATA_FAILURE = 'UPDATE_REVIEW_REPLY_DATA_FAILURE';
export const DELETE_REVIEW_REPLY_REQUEST = 'DELETE_REVIEW_REPLY_REQUEST';
export const DELETE_REVIEW_REPLY_SUCCESS = 'DELETE_REVIEW_REPLY_SUCCESS';
export const DELETE_REVIEW_REPLY_FAILURE = 'DELETE_REVIEW_REPLY_FAILURE';

export interface sendNewReviewReplyDataRequestAction {
    type: typeof SEND_NEW_REVIEW_REPLY_DATA_REQUEST,
    payload: NewReviewReplyData
};

export interface sendNewReviewReplyDataSuccessAction {
    type: typeof SEND_NEW_REVIEW_REPLY_DATA_SUCCESS,
    payload: NewReviewReplyDataReturn
};

export interface sendNewReviewReplyDataFailureAction {
    type: typeof SEND_NEW_REVIEW_REPLY_DATA_FAILURE,
    payload: string
};

export interface fetchNewReviewReplyDataRequestAction {
    type: typeof FETCH_REVIEW_REPLY_DATA_REQUEST,
    payload: string
};

export interface fetchNewReviewReplyDataByIdRequestAction {
    type: typeof FETCH_REVIEW_REPLY_DATA_BY_ID_REQUEST,
    payload: FetchReviewReplyById
}

export interface fetchNewReviewReplyDataSuccessAction {
    type: typeof FETCH_REVIEW_REPLY_DATA_SUCCESS,
    payload: ReviewReplyData
};

export interface fetchNewReviewReplyDataFailureAction {
    type: typeof FETCH_REVIEW_REPLY_DATA_FAILURE,
    payload: string
};

export interface updateReviewReplyDataRequestAction {
    type: typeof UPDATE_REVIEW_REPLY_DATA_REQUEST,
    payload: UpdateReviewReplyData
};

export interface updateReviewReplyDataSuccessAction {
    type: typeof UPDATE_REVIEW_REPLY_DATA_SUCCESS,
    payload: NewReviewReplyDataReturn
};

export interface updateReviewReplyDataFailureAction {
    type: typeof UPDATE_REVIEW_REPLY_DATA_FAILURE,
    payload: string
};

export interface deleteReviewReplyRequestAction {
    type: typeof DELETE_REVIEW_REPLY_REQUEST,
    payload: DeleteReviewReply
};

export interface deleteReviewReplySuccessAction {
    type: typeof DELETE_REVIEW_REPLY_SUCCESS,
    payload: string
};

export interface deleteReviewReplyFailureAction {
    type: typeof DELETE_REVIEW_REPLY_FAILURE,
    payload: string
};