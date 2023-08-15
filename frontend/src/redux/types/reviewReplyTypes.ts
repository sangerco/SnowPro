export interface ReviewReplyData {
  id: string;
  reviewId: string;
  userId: string;
  username: string;
  body: string;
  slug: string;
  createdAt: Date;
}

export interface NewReviewReplyData {
  reviewId: string;
  userId: string;
  body: string;
}

export interface UpdateReviewReplyData {
  id?: string;
  reviewId?: string;
  userId?: string;
  body?: string;
  slug?: string;
  createdAt?: Date;
}

export const SEND_NEW_REVIEW_REPLY_DATA_REQUEST =
  "SEND_NEW_REVIEW_REPLY_DATA_REQUEST";
export const SEND_NEW_REVIEW_REPLY_DATA_SUCCESS =
  "SEND_NEW_REVIEW_REPLY_DATA_SUCCESS";
export const SEND_NEW_REVIEW_REPLY_DATA_FAILURE =
  "SEND_NEW_REVIEW_REPLY_DATA_FAILURE";
export const FETCH_REVIEW_REPLY_DATA_BY_ID_REQUEST =
  "FETCH_REVIEW_REPLY_DATA_BY_ID_REQUEST";
export const FETCH_REVIEW_REPLY_DATA_BY_ID_SUCCESS =
  "FETCH_REVIEW_REPLY_DATA_BY_ID_SUCCESS";
export const FETCH_REVIEW_REPLY_DATA_BY_REVIEW_ID_REQUEST =
  "FETCH_REVIEW_REPLY_DATA_BY_REVIEW_ID_REQUEST";
export const FETCH_REVIEW_REPLY_DATA_BY_REVIEW_ID_SUCCESS =
  "FETCH_REVIEW_REPLY_DATA_BY_REVIEW_ID_SUCCESS";
export const FETCH_REVIEW_REPLY_DATA_REQUEST =
  "FETCH_REVIEW_REPLY_DATA_REQUEST";
export const FETCH_REVIEW_REPLY_DATA_SUCCESS =
  "FETCH_REVIEW_REPLY_DATA_SUCCESS";
export const FETCH_REVIEW_REPLY_DATA_FAILURE =
  "FETCH_REVIEW_REPLY_DATA_FAILURE";
export const UPDATE_REVIEW_REPLY_DATA_REQUEST =
  "UPDATE_REVIEW_REPLY_DATA_REQUEST";
export const UPDATE_REVIEW_REPLY_DATA_SUCCESS =
  "UPDATE_REVIEW_REPLY_DATA_SUCCESS";
export const UPDATE_REVIEW_REPLY_DATA_FAILURE =
  "UPDATE_REVIEW_REPLY_DATA_FAILURE";
export const DELETE_REVIEW_REPLY_REQUEST = "DELETE_REVIEW_REPLY_REQUEST";
export const DELETE_REVIEW_REPLY_SUCCESS = "DELETE_REVIEW_REPLY_SUCCESS";
export const DELETE_REVIEW_REPLY_FAILURE = "DELETE_REVIEW_REPLY_FAILURE";

export interface SendNewReviewReplyDataRequest {
  type: typeof SEND_NEW_REVIEW_REPLY_DATA_REQUEST;
  payload: NewReviewReplyData;
}

export interface SendNewReviewReplyDataSuccess {
  type: typeof SEND_NEW_REVIEW_REPLY_DATA_SUCCESS;
  payload: ReviewReplyData;
}

export interface SendNewReviewReplyDataFailure {
  type: typeof SEND_NEW_REVIEW_REPLY_DATA_FAILURE;
  payload: string;
}

export interface FetchReviewReplyByIdDataRequest {
  type: typeof FETCH_REVIEW_REPLY_DATA_BY_ID_REQUEST;
  payload: {
    slug: string;
    reviewId: string;
    id: string;
  };
}

export interface FetchReviewReplyByIdDataSuccess {
  type: typeof FETCH_REVIEW_REPLY_DATA_BY_ID_SUCCESS;
  payload: ReviewReplyData;
}

export interface FetchReviewReplyByReviewIdDataRequest {
  type: typeof FETCH_REVIEW_REPLY_DATA_BY_REVIEW_ID_REQUEST;
  payload: {
    slug: string;
    reviewId: string;
  };
}

export interface FetchReviewReplyByReviewIdDataSuccess {
  type: typeof FETCH_REVIEW_REPLY_DATA_BY_REVIEW_ID_SUCCESS;
  payload: ReviewReplyData[];
}

export interface FetchReviewReplyDataFailure {
  type: typeof FETCH_REVIEW_REPLY_DATA_FAILURE;
  payload: string;
}

export interface UpdateReviewReplyDataRequest {
  type: typeof UPDATE_REVIEW_REPLY_DATA_REQUEST;
  payload: UpdateReviewReplyData;
}

export interface UpdateReviewReplyDataSuccess {
  type: typeof UPDATE_REVIEW_REPLY_DATA_SUCCESS;
  payload: ReviewReplyData;
}

export interface UpdateReviewReplyDataFailure {
  type: typeof UPDATE_REVIEW_REPLY_DATA_FAILURE;
  payload: string;
}

export interface DeleteReviewReplyRequest {
  type: typeof DELETE_REVIEW_REPLY_REQUEST;
  payload: string;
}

export interface DeleteReviewReplySuccess {
  type: typeof DELETE_REVIEW_REPLY_SUCCESS;
  payload: string;
}

export interface DeleteReviewReplyFailure {
  type: typeof DELETE_REVIEW_REPLY_FAILURE;
  payload: string;
}
