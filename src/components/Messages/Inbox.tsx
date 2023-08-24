import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserMessages,
  fetchSentMessages,
  deleteMessage,
  markMessageAsRead,
  markMessageAsUnread,
  MessageData,
} from "../../redux/slices/messageSlice";
import {
  Button,
  Container,
  Dimmer,
  Header,
  List,
  Loader,
  Segment,
} from "semantic-ui-react";

interface InboxProps {
  username: string;
}

const Inbox: React.FC<InboxProps> = ({ username }) => {
  const messages = useSelector((state: RootState) => state.messages);
  const dispatch = useDispatch<AppDispatch>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUserMessages(username));
  }, [dispatch, username]);

  useEffect(() => {
    dispatch(fetchSentMessages(username));
  }, [dispatch, username]);

  const handleMarkAsRead = (id: string) => {
    dispatch(markMessageAsRead(id));
  };

  const handleMarkAsUnread = (id: string) => {
    dispatch(markMessageAsUnread(id));
  };

  const formatDate = (date: Date) => {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return newDate.toLocaleDateString("en-US", options);
  };

  if (messages.loading) {
    return (
      <Dimmer active>
        <Loader>Loading...</Loader>
      </Dimmer>
    );
  }

  if (messages.error) {
    return <div>Error loading messages! Error: {`${messages.error}`}</div>;
  }

  if (messages.messages) {
    return (
      <Container fluid>
        <Header as="h2">Messages</Header>
        <Segment>
          <Button floated="right" as={Link} to={`/messages/create-message`}>
            New Message
          </Button>
        </Segment>
        <Segment>
          <List divided relaxed>
            {messages.messages.map((message: MessageData) => (
              <List.Item
                key={message.id}
                as={Link}
                to={`/messages/${message.id}`}>
                <List.Content floated="left">{message.subject}</List.Content>
                <List.Content>
                  {message.senderFirstName} {message.senderLastName}
                </List.Content>
                <List.Content floated="right">
                  {formatDate(message.createdAt)}
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      </Container>
    );
  }

  return null;
};

export default Inbox;
