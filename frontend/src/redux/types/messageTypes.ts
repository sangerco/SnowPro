import { ReplyData } from "./messageReplyTypes";

export interface MessageData {
    id: string;
    senderId: string;
    recipientId: string;
    subject: string;
    body: string;
    isRead: boolean;
    createdAt: Date;
}

export interface MessageDataReturn {
    message: MessageData;
    replies: ReplyData[];
}

export interface NewMessageData {
    senderId: string;
    recipientId: string;
    subject: string;
    body: string;
}

export interface NewMessageDataReturn {
    id: string;
    senderId: string;
    recipientId: string;
    subject: string;
    body: string;
    isRead: boolean;
}

export interface DeleteMessage {
    id: string;
}

export const SEND_NEW_MESSAGE_DATA_REQUEST = 'SEND_NEW_MESSAGE_DATA_REQUEST';
export const SEND_NEW_MESSAGE_DATA_SUCCESS = 'SEND_NEW_MESSAGE_DATA_SUCCESS';
export const SEND_NEW_MESSAGE_DATA_FAILURE = 'SEND_NEW_MESSAGE_DATA_FAILURE';
export const FETCH_MESSAGE_DATA_REQUEST = 'FETCH_MESSAGE_DATA_REQUEST';
export const FETCH_MESSAGE_DATA_SUCCESS = 'FETCH_MESSAGE_DATA_SUCCESS';
export const FETCH_MESSAGE_DATA_FAILURE = 'FETCH_MESSAGE_DATA_FAILURE';
export const DELETE_MESSAGE_REQUEST = 'DELETE_MESSAGE_REQUEST';
export const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS';
export const DELETE_MESSAGE_FAILURE = 'DELETE_MESSAGE_FAILURE';

export interface sendNewMessageDataRequestAction {
    type: typeof SEND_NEW_MESSAGE_DATA_REQUEST;
    payload: NewMessageData;
};

export interface sendNewMessageDataSuccessAction {
    type: typeof SEND_NEW_MESSAGE_DATA_SUCCESS;
    payload: NewMessageDataReturn;
};

export interface sendNewMessageDataFailureAction {
    type: typeof SEND_NEW_MESSAGE_DATA_FAILURE;
    payload: string;
};

export interface fetchMessageDataRequestAction {
    type: typeof FETCH_MESSAGE_DATA_REQUEST;
};

export interface fetchMessageDataSuccessAction {
    type: typeof FETCH_MESSAGE_DATA_SUCCESS;
    payload: MessageDataReturn;
};

export interface fetchMessageDataFailureAction {
    type: typeof FETCH_MESSAGE_DATA_FAILURE;
    payload: string;
}

export interface deleteMessageRequestAction {
    type: typeof DELETE_MESSAGE_REQUEST;
    payload: DeleteMessage;
};

export interface deleteMessageSuccessAction {
    type: typeof DELETE_MESSAGE_SUCCESS;
    payload: string;
};

export interface deleteMessageFailureAction {
    type: typeof DELETE_MESSAGE_FAILURE;
    payload: string;
}