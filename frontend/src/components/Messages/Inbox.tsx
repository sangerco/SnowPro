import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../redux/store";
import {
  fetchUserMessages,
  markMessageRead,
  markMessageUnread,
} from "../../redux/actions/messageActions";
import { UserMessages } from "../../redux/types/messageTypes";
import { Container, Header, Segment, List, Button } from "semantic-ui-react";
import MessageInboxItem from "./MessageInboxItem";

type PropsFromRedux = ConnectedProps<typeof connector>;

type InboxProps = PropsFromRedux & {
  messages: UserMessages[];
  fetchAllUsersMessagesData: (username: string) => void;
  markMessageRead: (id: string) => void;
  markMessageUnread: (id: string) => void;
};

const Inbox: React.FC<InboxProps> = ({
  messages,
  fetchAllUsersMessagesData,
  markMessageRead,
  markMessageUnread,
}) => {
  const { username } = useParams();

  useEffect(() => {
    fetchAllUsersMessagesData(username as string);
  }, [username, fetchAllUsersMessagesData]);

  const handleMarkAsRead = (id: string) => {
    markMessageRead(id);
  };

  const handleMarkAsUnread = (id: string) => {
    markMessageUnread(id);
  };

  return (
    <Container fluid>
      <Header as="h2">Messages</Header>
      <Segment>
        <List divided relaxed>
          {messages.map((message: UserMessages) => (
            <List.Item key={message.id}>
              <List.Content floated="right">
                {!message.isRead && (
                  <Button
                    onClick={() => handleMarkAsRead(message.id)}
                    color="blue"
                    size="mini">
                    Mark As Read?
                  </Button>
                )}
                {message.isRead && (
                  <Button
                    onClick={() => handleMarkAsUnread(message.id)}
                    color="blue"
                    size="mini">
                    Mark As Not Read?
                  </Button>
                )}
              </List.Content>
              <MessageInboxItem message={message} />
            </List.Item>
          ))}
        </List>
      </Segment>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  messages: state.message.data,
  error: state.message.error,
  loading: state.message.loading,
  userMessages: state.message.userMessages,
});

const mapDispatchToProps = {
  fetchUserMessages,
  markMessageRead,
  markMessageUnread,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Inbox);
