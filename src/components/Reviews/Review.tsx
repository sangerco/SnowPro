import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Dimmer,
  Loader,
  Icon,
  Modal,
  Rating,
  Container,
  Header,
  Divider,
  Label,
  Image,
} from "semantic-ui-react";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchReview, deleteReview } from "../../redux/slices/reviewSlice";

const Review: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const authId = auth.data?.id;
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const reviews = useSelector((state: RootState) => state.reviews);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchReview(id));
    }
  }, [dispatch, id]);

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteReview = () => {
    if (id) {
      dispatch(deleteReview(id));
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

  if (reviews.error) {
    return (
      <Dimmer active>
        <div>
          <p>Error! Review cannot be retrieved! {`${reviews.error}`}</p>
        </div>
      </Dimmer>
    );
  }

  if (reviews.loading) {
    return (
      <Dimmer active>
        <Loader>Loading...</Loader>
      </Dimmer>
    );
  }

  if (Array.isArray(reviews.review)) {
    return <div>Error! Review cannot be retrieved!</div>;
  } else if (reviews.review) {
    const review = reviews.review;
    const date = formatDate(review.createdAt);
    const userId = review.userId;
    return (
      <div>
        <Container fluid>
          <Header as="h1">{review.header}</Header>
          <Divider />
          <Header as="h3">Review of {review.skiAreaName}</Header>
          <Divider />
          <Header as="h5">By {review.username}</Header>
          <Header as="h6" textAlign="right">
            {date}
          </Header>
          <Rating
            icon="star"
            defaultRating={review.stars}
            maxRating={5}
            disabled
          />
        </Container>
        {authId && authId === userId ? (
          <Container>
            <Link to={`/ski-areas/reviews/${review.id}/update`}>
              <Icon name="edit" style={{ cursor: "pointer" }} />
            </Link>
            <Icon
              name="trash"
              style={{ cursor: "pointer" }}
              onClick={handleShowDeleteModal}
            />
          </Container>
        ) : null}
        <Container text>
          <p>{review.body}</p>
          <Divider />
          {review.tags && review.tags.length > 0 ? (
            review.tags.map((tag) => (
              <div>
                <Label.Group green>
                  <Label as="a">{tag}</Label>
                </Label.Group>
              </div>
            ))
          ) : (
            <Divider />
          )}
          <Divider />
          {review.photos && review.photos.length > 0 ? (
            review.photos.map((photo) => (
              <div>
                <Image src={photo} fluid />
              </div>
            ))
          ) : (
            <p>No photos yet.</p>
          )}
        </Container>
        <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
          <Modal.Content>
            Are You Sure You Want To Delete This Review?
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={handleDeleteReview}>
              Yes
            </Button>
            <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          </Modal.Actions>
        </Modal>

        {review.replies && review.replies.length > 0 ? (
          review.replies.map((reply) => <p key={reply.id}>Reply goes here</p>)
        ) : (
          <p>No replies to this review yet.</p>
        )}
      </div>
    );
  }

  return null;
};

export default Review;
