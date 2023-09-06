import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Dimmer,
  Loader,
  Icon,
  Card,
  Modal,
  Grid,
  Segment,
  Rail,
  Header,
} from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchMessage, deleteMessage } from "../../redux/slices/messageSlice";
import MessageReplyView from "./MessageReplyView";
import { fetchSkiAreas } from "../../redux/slices/skiAreaSlice";

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

  useEffect(() => {
    dispatch(fetchSkiAreas());
  }, [dispatch]);

  const skiAreaState = useSelector((state: RootState) => state.skiAreas);
  const skiAreas = skiAreaState.skiAreas;

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
        <Grid centered columns={3}>
          <Grid.Column>
            <Segment>
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
              {message.replies && message.replies.length > 0
                ? message.replies.map((reply) => (
                    <MessageReplyView key={reply.id} messageReply={reply} />
                  ))
                : null}
              <Modal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}>
                <Modal.Content>
                  Are You Sure You Want To Delete This Message?
                </Modal.Content>
                <Modal.Actions>
                  <Button negative onClick={handleDeleteMessage}>
                    Yes
                  </Button>
                  <Button onClick={() => setShowDeleteModal(false)}>
                    Cancel
                  </Button>
                </Modal.Actions>
              </Modal>
              <Rail dividing position={"left"}>
                {skiAreaState.loading ? (
                  <Dimmer active>
                    <Loader>Loading...</Loader>
                  </Dimmer>
                ) : skiAreas && skiAreas.length > 0 ? (
                  <Card>
                    {skiAreas.map((sa) => (
                      <Card.Content key={sa.slug}>
                        <Link to={`/ski-areas/${sa.slug}`}>{sa.name}</Link>
                      </Card.Content>
                    ))}
                  </Card>
                ) : skiAreaState.error ? (
                  <Dimmer active>
                    <Header as="h1">
                      Error! Ski Area Data cannot be retrieved!{" "}
                      {skiAreaState.error}
                    </Header>
                  </Dimmer>
                ) : null}
              </Rail>

              <Rail dividing position={"right"}></Rail>
            </Segment>
          </Grid.Column>
        </Grid>
      </>
    );
  }

  return null;
};

export default Message;
