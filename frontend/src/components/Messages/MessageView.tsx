import React, { useEffect } from 'react';
import { fetchMessageDataById } from '../../redux/actions/messageActions';
import { connect } from 'react-redux';
import { Dimmer, Loader } from "semantic-ui-react";
import MessageReplyView from './messageReplyView';

interface MessageData {
    id: string;
    senderId: string;
    recipientId: string;
    subject: string;
    body: string;
    createdAt: Date;
    senderUsername: string;
    senderFirstName: string;
    senderLastName: string;
    recipientUsername: string;
    recipientFirstName: string;
    recipientLastName: string;
    replies: ReplyData[]
};

interface ReplyData {
    id: string;
    messageId: string;
    senderId: string;
    recipientId: string;
    subject: string;
    body: string;
    createdAt: Date;
    senderUsername: string;
    senderFirstName: string;
    senderLastName: string;
    recipientUsername: string;
    recipientFirstName: string;
    recipientLastName: string;
};

interface MessageProps {
    id: string;
    message: MessageData | null;
    loading: boolean;
    error: string | null;
    fetchMessageDataById: (id: string) => void;
};

const MessageView: React.FC<MessageProps> = ({ id, message, loading, error, fetchMessageDataById }) => {
    useEffect(() => {
        fetchMessageDataById(id);
    }, [id, fetchMessageDataById]);

    if(loading) {
        return (
            <div>
            <Dimmer active>
                <Loader>Loading...</Loader>
            </Dimmer>
        </div>
        )
    }

    if(error) {
        return (
            <div>Error! {error}</div>
        )
    }

    if(message) {
        return (
            <>
                <h3>{message.subject}</h3>
                <h6>From: {message.senderFirstName} {message.senderFirstName}</h6>
                <h6>{message.subject}</h6>
                <p>{message.body}</p>
                {message.replies.length > 0 ? message.replies.map(reply => <MessageReplyView key={reply.id} reply={reply} />) : null}
            </>
        )
    }

    return null;
}

const mapStateToProps = (state: any) => ({
    message: state.message.data,
    loading: state.message.loading,
    error: state.message.error
})

const matchDispatchToProps = {
    fetchMessageDataById
}

export default connect(mapStateToProps, matchDispatchToProps)(MessageView);