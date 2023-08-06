export interface ReplyData {
    id: string;
    messageId: string;
    senderId: string;
    recipientId: string;
    subject: string;
    body: string;
    isRead: boolean;
    createdAt: Date;
}

export interface NewReplyData {
    sender_id: string;
    message_id: string;
    recipient_id: string;
    subject: string;
    body: string;
}

export interface NewReplyDataReturn {
    id: string;
    message_id: string;
    sender_id: string;
    recipient_id: string;
    subject: string;
    body: string;
    isRead: boolean;
}

export interface DeleteReply {
    id: string;
    message_id: string;
}

export const SEND_NEW_REPLY_DATA_REQUEST = 'SEND_NEW_REPLY_DATA_REQUEST';
export const SEND_NEW_REPLY_DATA_SUCCESS = 'SEND_NEW_REPLY_DATA_SUCCESS';
export const SEND_NEW_REPLY_DATA_FAILURE = 'SEND_NEW_REPLY_DATA_FAILURE';
export const FETCH_REPLY_DATA_REQUEST = 'FETCH_REPLY_DATA_REQUEST';
export const FETCH_REPLY_DATA_SUCCESS = 'FETCH_REPLY_DATA_SUCCESS';
export const FETCH_REPLY_DATA_FAILURE = 'FETCH_REPLY_DATA_FAILURE';
export const DELETE_REPLY_REQUEST = 'DELETE_REPLY_REQUEST';
export const DELETE_REPLY_SUCCESS = 'DELETE_REPLY_SUCCESS';
export const DELETE_REPLY_FAILURE = 'DELETE_REPLY_FAILURE';

export interface sendNewReplyDataRequestAction {
    type: typeof SEND_NEW_REPLY_DATA_REQUEST;
    payload: NewReplyData;
};

export interface sendNewReplyDataSuccessAction {
    type: typeof SEND_NEW_REPLY_DATA_SUCCESS;
    payload: NewReplyDataReturn;
};

export interface sendNewReplyDataFailureAction {
    type: typeof SEND_NEW_REPLY_DATA_FAILURE;
    payload: string;
};

export interface fetchReplyDataRequestAction {
    type: typeof FETCH_REPLY_DATA_REQUEST;
};

export interface fetchReplyDataSuccessAction {
    type: typeof FETCH_REPLY_DATA_SUCCESS;
    payload: ReplyData;
};

export interface fetchReplyDataFailureAction {
    type: typeof FETCH_REPLY_DATA_FAILURE;
    payload: string;
}

export interface deleteReplyRequestAction {
    type: typeof DELETE_REPLY_REQUEST;
    payload: DeleteReply;
};

export interface deleteReplySuccessAction {
    type: typeof DELETE_REPLY_SUCCESS;
    payload: string;
};

export interface deleteReplyFailureAction {
    type: typeof DELETE_REPLY_FAILURE;
    payload: string;
}