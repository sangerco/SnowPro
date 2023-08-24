import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Dimmer, Loader, Icon, Card, Modal } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchMessage, deleteMessage } from "../../redux/slices/messageSlice";

const Message: React.FC = () => {
  const { id } = useParams();
  const messages = useSelector((state: RootState) => state.messages);
  const dispatch = useDispatch<AppDispatch>();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchMessage(id));
    }
  }, [dispatch, id]);

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteMessage = () => {
    if (id) {
      dispatch(deleteMessage(id));
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

  if (messages.loading) {
    return (
      <div>
        <Dimmer active>
          <Loader>Loading...</Loader>
        </Dimmer>
      </div>
    );
  }

  if (messages.error) {
    return <div>Error: {messages.error}</div>;
  }

  if (Array.isArray(messages.message)) {
    return <div>Error: Message cannot be loaded!</div>;
  } else if (messages.message) {
    const message = messages.message;

    return (
      <>
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
              <Button basic color="red" onClick={handleShowDeleteModal}>
                <Icon name="trash" />
              </Button>
              <Button basic color="blue">
                <Link to={`/messages/${message.id}/reply`}>Reply</Link>
              </Button>
            </div>
          </Card.Content>
        </Card>
        {/* {message.replies && message.replies.length > 0
          ? message.replies.map((reply) => (
              <MessageReply key={reply.id} reply={reply} />
            ))
          : null} */}
        <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
          <Modal.Content>
            Are You Sure You Want To Delete This Message?
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={handleDeleteMessage}>
              Yes
            </Button>
            <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }

  return null;
};

export default Message;
