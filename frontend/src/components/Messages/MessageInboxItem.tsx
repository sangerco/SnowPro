import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import { UserWithMessages } from '../../redux/types/messageTypes';

interface MessageInboxItemProps {
    message: UserWithMessages;
}

const MessageInboxItem: React.FC<MessageInboxItemProps> = ({ message }) => {

    const formatDate = (date: Date) => {
        const newDate = new Date(date);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return newDate.toLocaleDateString('en-US', options);
    }

    return (
        <Link to={`/messages/${message.id}`}>
            <List.Content>
                <List.Header style={{ fontWeight: message.isRead ? 'normal' : 'bold' }}>
                                    {message.senderFirstName}{message.senderLastName}
                </List.Header>
                <span style={{ fontWeight: message.isRead ? 'normal' : 'bold' }}>
                                    {formatDate(message.createdAt)}
                </span>
                <List.Description style={{ fontWeight: message.isRead ? 'normal' : 'bold' }}>
                                    {message.subject}
                </List.Description>
            </List.Content>
        </Link>
    )
}

export default MessageInboxItem;