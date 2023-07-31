import React from 'react';

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

interface ReplyProps {
    reply: ReplyData;
};

const MessageReplyView: React.FC<ReplyProps> = ({ reply }) => {
    return (
        <div>
            <h3>{reply.senderFirstName} {reply.senderLastName}</h3>
            <p>{reply.body}</p>
        </div>        
    )
}

export default MessageReplyView;