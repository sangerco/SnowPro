import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Dimmer, Loader, Icon, Card, Modal } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";
import {
  fetchMessageReply,
  deleteMessageReply,
} from "../../redux/slices/messageReplySlice";

const MessageReply: React.FC = () => {
  const { id } = useParams();
  const messageReplies = useSelector(
    (state: RootState) => state.messageReplies
  );
  const dispatch = useDispatch<AppDispatch>();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchMessageReply(id));
    }
  }, [dispatch, id]);

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteMessageReply = () => {
    if (id) {
      dispatch(deleteMessageReply(id));
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

  if (messageReplies.loading) {
    return (
      <div>
        <Dimmer active>
          <Loader>Loading...</Loader>
        </Dimmer>
      </div>
    );
  }

  if (messageReplies.error) {
    return <div>Error: {messageReplies.error}</div>;
  }

  if (Array.isArray(messageReplies.messageReply)) {
    return <div>Error! Message Reply cannot be displayed!</div>;
  } else if (messageReplies.messageReply) {
    const messageReply = messageReplies.messageReply;

    return (
      <div>
        <Card fluid>
          <Card.Content>
            <Card.Header>{messageReply.subject}</Card.Header>
            <Card.Meta>
              {messageReply.senderFirstName} {messageReply.senderLastName}
            </Card.Meta>
            <Card.Meta textAlign="right">
              {formatDate(messageReply.createdAt)}
            </Card.Meta>
            <Card.Description>{messageReply.body}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="red" onClick={handleShowDeleteModal}>
                <Icon name="trash" />
              </Button>
              <Button basic color="blue">
                <Link to={`/messages/${messageReply.messageId}/reply`}>
                  Reply
                </Link>
              </Button>
            </div>
          </Card.Content>
          <Modal
            open={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}>
            <Modal.Content>
              Are You Sure You Want To Delete This Message Reply?
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={handleDeleteMessageReply}>
                Yes
              </Button>
              <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            </Modal.Actions>
          </Modal>
        </Card>
      </div>
    );
  }

  return null;
};

export default MessageReply;
