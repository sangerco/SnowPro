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
  Divider,
  Header,
  List,
  Loader,
} from "semantic-ui-react";

interface InboxProps {
  username: string;
}

const Inbox: React.FC<InboxProps> = ({ username }) => {
  const messages = useSelector((state: RootState) => state.messages);
  const dispatch = useDispatch<AppDispatch>();

  const [showSentMessages, setShowSentMessages] = useState(false);

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

  const sentMessages = messages.sentMessages;

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

  if (messages.messages || messages.sentMessages) {
    return (
      <Container
        data-testid="messages"
        style={{ backgroundColor: "white", margin: "25px", padding: "10px" }}
        fluid>
        {showSentMessages === true ? (
          <>
            <Button
              floated="right"
              size="tiny"
              color="blue"
              onClick={() => setShowSentMessages(false)}>
              Show Messages
            </Button>
            <Header as="h2">Sent Messages</Header>
            <Container data-testid="sent-messages">
              <List divided relaxed style={{ marginBottom: "5px" }}>
                {sentMessages &&
                  sentMessages.map((message: MessageData) => (
                    <List.Item
                      key={message.id}
                      as={Link}
                      to={`/messages/${message.id}`}>
                      <List.Content
                        style={{ color: "black", fontSize: "2em" }}
                        floated="left">
                        {message.subject}
                      </List.Content>
                      <List.Content>
                        {message.senderFirstName} {message.senderLastName}
                      </List.Content>
                      <List.Content floated="right">
                        {formatDate(message.createdAt)}
                      </List.Content>
                    </List.Item>
                  ))}
              </List>
            </Container>
            <Divider />
            <Container style={{ marginTop: "5px" }}>
              <Button
                color="green"
                floated="right"
                as={Link}
                to={`/messages/create-message`}>
                New Message
              </Button>
            </Container>
          </>
        ) : (
          <>
            <Button
              data-testid="sent-messages-button"
              floated="right"
              size="tiny"
              color="blue"
              onClick={() => setShowSentMessages(true)}>
              Show Sent Messages
            </Button>
            <Header as="h2">Messages</Header>
            <Container data-testid="received-messages">
              <List divided relaxed style={{ marginBottom: "5px" }}>
                {messages.messages &&
                  messages.messages.map((message: MessageData) => (
                    <List.Item
                      key={message.id}
                      as={Link}
                      to={`/messages/${message.id}`}>
                      <List.Content floated="left">
                        {message.subject}
                      </List.Content>
                      <List.Content>
                        {message.senderFirstName} {message.senderLastName}
                      </List.Content>
                      <List.Content floated="right">
                        {formatDate(message.createdAt)}
                      </List.Content>
                    </List.Item>
                  ))}
              </List>
            </Container>
            <Divider />
            <Container style={{ marginTop: "25px" }}>
              <Button
                style={{ marginTop: "25px" }}
                color="green"
                floated="right"
                as={Link}
                to={`/messages/create-message`}>
                New Message
              </Button>
            </Container>
          </>
        )}
      </Container>
    );
  }

  return null;
};

export default Inbox;
