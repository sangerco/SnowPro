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
}

export interface ReviewDataReturn {
  review: ReviewData;
  reviewReplies: ReviewReplyData;
}

export interface NewReviewData {
  userId: string;
  username: string;
  skiAreaSlug: string;
  header: string;
  body: string;
  stars: number;
  photos: string[];
  tags: string[];
}

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
}

export const SEND_NEW_REVIEW_DATA_REQUEST = "SEND_NEW_REVIEW_DATA_REQUEST";
export const SEND_NEW_REVIEW_DATA_SUCCESS = "SEND_NEW_REVIEW_DATA_SUCCESS";
export const SEND_NEW_REVIEW_DATA_FAILURE = "SEND_NEW_REVIEW_DATA_FAILURE";
export const FETCH_ALL_REVIEWS_DATA_REQUEST = "FETCH_ALL_REVIEWS_DATA_REQUEST";
export const FETCH_ALL_REVIEWS_DATA_SUCCESS = "FETCH_ALL_REVIEWS_DATA_SUCCESS";
export const FETCH_ALL_REVIEWS_DATA_FAILURE = "FETCH_ALL_REVIEWS_DATA_FAILURE";
export const FETCH_REVIEW_DATA_REQUEST = "FETCH_REVIEW_DATA_REQUEST";
export const FETCH_REVIEW_DATA_BY_ID_REQUEST =
  "FETCH_REVIEW_DATA_BY_ID_REQUEST";
export const FETCH_REVIEW_DATA_SUCCESS = "FETCH_REVIEW_DATA_SUCCESS";
export const FETCH_REVIEW_DATA_FAILURE = "FETCH_REVIEW_DATA_FAILURE";
export const UPDATE_REVIEW_DATA_REQUEST = "UPDATE_REVIEW_DATA_REQUEST";
export const UPDATE_REVIEW_DATA_SUCCESS = "UPDATE_REVIEW_DATA_SUCCESS";
export const UPDATE_REVIEW_DATA_FAILURE = "UPDATE_REVIEW_DATA_FAILURE";
export const DELETE_REVIEW_REQUEST = "DELETE_REVIEW_REQUEST";
export const DELETE_REVIEW_SUCCESS = "DELETE_REVIEW_SUCCESS";
export const DELETE_REVIEW_FAILURE = "DELETE_REVIEW_FAILURE";

export interface sendNewReviewDataRequest {
  type: typeof SEND_NEW_REVIEW_DATA_REQUEST;
  payload: NewReviewData;
}

export interface sendNewReviewDataSuccess {
  type: typeof SEND_NEW_REVIEW_DATA_SUCCESS;
  payload: ReviewData;
}

export interface sendNewReviewDataFailure {
  type: typeof SEND_NEW_REVIEW_DATA_FAILURE;
  payload: string;
}

export interface fetchAllReviewsDataRequest {
  type: typeof FETCH_ALL_REVIEWS_DATA_REQUEST;
}

export interface fetchAllReviewsDataSuccess {
  type: typeof FETCH_ALL_REVIEWS_DATA_SUCCESS;
  payload: ReviewDataReturn[];
}

export interface fetchAllReviewsDataFailure {
  type: typeof FETCH_ALL_REVIEWS_DATA_FAILURE;
  payload: string;
}

export interface fetchReviewDataByIdRequest {
  type: typeof FETCH_REVIEW_DATA_BY_ID_REQUEST;
  payload: {
    slug: string;
    id: string;
  };
}

export interface fetchReviewDataByIdSuccess {
  type: typeof FETCH_REVIEW_DATA_SUCCESS;
  payload: ReviewDataReturn;
}

export interface fetchReviewDataByIdFailure {
  type: typeof FETCH_REVIEW_DATA_FAILURE;
  payload: string;
}

export interface updateReviewDataRequest {
  type: typeof UPDATE_REVIEW_DATA_REQUEST;
  payload: UpdateReviewData;
}

export interface updateReviewDataSuccess {
  type: typeof UPDATE_REVIEW_DATA_SUCCESS;
  payload: ReviewDataReturn;
}

export interface updateReviewDataFailure {
  type: typeof UPDATE_REVIEW_DATA_FAILURE;
  payload: string;
}

export interface deleteReviewRequest {
  type: typeof DELETE_REVIEW_REQUEST;
  payload: string;
}

export interface deleteReviewSuccess {
  type: typeof DELETE_REVIEW_SUCCESS;
  payload: string;
}

export interface deleteReviewFailure {
  type: typeof DELETE_REVIEW_FAILURE;
  payload: string;
}
