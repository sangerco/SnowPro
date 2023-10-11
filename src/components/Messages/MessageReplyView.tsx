import React, { useState } from "react";
import { Button, Card, Icon, Modal } from "semantic-ui-react";
import { deleteMessageReply } from "../../redux/slices/messageReplySlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { MessageReplyData } from "../../redux/slices/messageReplySlice";
import { Link } from "react-router-dom";

interface MessageReplyViewProps {
  messageReply: MessageReplyData;
}

const MessageReplyView: React.FC<MessageReplyViewProps> = ({
  messageReply,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteMessageReply = () => {
    if (messageReply.id) {
      dispatch(deleteMessageReply(messageReply.id));
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

  return (
    <div>
      <Card
        data-testid="message-reply"
        as={Link}
        to={`/messages/replies/${messageReply.id}`}
        style={{ width: "500px" }}>
        <Card.Header>{messageReply.subject}</Card.Header>
        <Card.Meta textAlign="right">
          {formatDate(messageReply.createdAt)}
        </Card.Meta>
        <Card.Meta>
          {messageReply.senderFirstName} {messageReply.senderLastName}
        </Card.Meta>
        <Card.Content data-testid="message-reply-body">
          {messageReply.body}
        </Card.Content>
        <Card.Content>
          <Button
            basic
            color="red"
            onClick={handleShowDeleteModal}
            data-testid="delete-button">
            <Icon name="trash" />
          </Button>
        </Card.Content>
      </Card>
      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        data-testid="delete-modal">
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
    </div>
  );
};

export default MessageReplyView;
