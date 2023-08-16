import React, { useEffect } from "react";
import {
  fetchMessageDataById,
  deleteMessage,
} from "../../oldRedux/actions/messageActions";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Dimmer, Loader, Button, Icon, Card } from "semantic-ui-react";
import MessageReplyView from "./messageReplyView";
import { sendNewReplyData } from "../../oldRedux/actions/messageReplyActions";

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
  replies: ReplyData[];
}

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
}

interface MessageProps {
  message: MessageData | null;
  loading: boolean;
  error: string | null;
  fetchMessageDataById: (id: string) => void;
  deleteMessage: (id: string) => void;
}

const MessageView: React.FC<MessageProps> = ({
  message,
  loading,
  error,
  fetchMessageDataById,
  deleteMessage,
}) => {
  const { id } = useParams();

  useEffect(() => {
    fetchMessageDataById(id as string);
  }, [id, fetchMessageDataById]);

  const handleDelete = () => {
    if (message) {
      deleteMessage(message.id);
    }
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

  if (loading) {
    return (
      <div>
        <Dimmer active>
          <Loader>Loading...</Loader>
        </Dimmer>
      </div>
    );
  }

  if (error) {
    return <div>Error! {error}</div>;
  }

  if (message) {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>{message.subject}</Card.Header>
          <Card.Meta>
            {message.senderFirstName} {message.senderLastName}
          </Card.Meta>
          <Card.Meta textAlign="right">
            {formatDate(message.createdAt)}
          </Card.Meta>
          <Card.Description>{message.body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="red" onClick={handleDelete}>
              <Icon name="trash" />
            </Button>
            <Button basic color="blue">
              <Link to={`/messages/${message.id}/reply`}></Link>
            </Button>
          </div>
        </Card.Content>
        {message.replies.length > 0
          ? message.replies.map((reply) => (
              <MessageReplyView key={reply.id} reply={reply} />
            ))
          : null}
      </Card>
    );
  }

  return null;
};

const mapStateToProps = (state: any) => ({
  message: state.message.data,
  loading: state.message.loading,
  error: state.message.error,
});

const matchDispatchToProps = {
  fetchMessageDataById,
  deleteMessage,
};

export default connect(mapStateToProps, matchDispatchToProps)(MessageView);
