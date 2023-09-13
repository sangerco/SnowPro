import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { Link, useParams } from "react-router-dom";
import { fetchReview } from "../../redux/slices/reviewSlice";
import {
  fetchReviewReply,
  deleteReviewReply,
} from "../../redux/slices/reviewReplySlice";
import { fetchSkiAreas } from "../../redux/slices/skiAreaSlice";
import {
  Container,
  Dimmer,
  Divider,
  Header,
  Loader,
  Icon,
  Modal,
  Button,
  Grid,
  Card,
  Segment,
  Rating,
} from "semantic-ui-react";

const ReviewReply: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const authId = auth.data?.id;
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchReviewReply(id));
    }
  }, [dispatch, id]);

  const reviewReplies = useSelector((state: RootState) => state.reviewReplies);
  const reviewReply = reviewReplies.reviewReply;

  const reviewId = reviewReply?.reviewId;

  useEffect(() => {
    if (reviewId) {
      dispatch(fetchReview(reviewId));
    }
  }, [dispatch, reviewId]);

  const reviews = useSelector((state: RootState) => state.reviews);
  const review = reviews.review;

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteReviewReply = () => {
    if (id) {
      dispatch(deleteReviewReply(id));
    }
  };

  useEffect(() => {
    dispatch(fetchSkiAreas());
  }, [dispatch]);

  const skiAreaState = useSelector((state: RootState) => state.skiAreas);
  const skiAreas = skiAreaState.skiAreas;

  const formatDate = (date: Date) => {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return newDate.toLocaleDateString("en-US", options);
  };

  if (reviewReplies.error) {
    return (
      <Dimmer active>
        <div>
          <p>
            Error! Review Reply cannot be retrieved! {`${reviewReplies.error}`}
          </p>
        </div>
      </Dimmer>
    );
  }

  if (reviewReplies.loading) {
    return (
      <Dimmer active>
        <Loader>Loading...</Loader>
      </Dimmer>
    );
  }

  if (Array.isArray(reviewReply) || Array.isArray(review)) {
    <Dimmer active>
      <p>Error! Review Reply cannot be retrieved!</p>
    </Dimmer>;
  } else if (reviewReply && review) {
    const date = formatDate(reviewReply.createdAt);
    const userId = reviewReply.userId;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            {skiAreaState.loading ? (
              <Dimmer active>
                <Loader>Loading...</Loader>
              </Dimmer>
            ) : skiAreaState.error ? (
              <Dimmer active>
                <Header as="h1">
                  Error! Ski Area Data cannot be retrieved! {skiAreaState.error}
                </Header>
              </Dimmer>
            ) : skiAreas && skiAreas.length > 0 ? (
              <Card style={{ marginTop: "10px", marginLeft: "20px" }}>
                {skiAreas.map((sa) => (
                  <Card.Content key={sa.slug}>
                    <Link to={`/ski-areas/${sa.slug}`}>{sa.name}</Link>
                  </Card.Content>
                ))}
              </Card>
            ) : null}
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <Container fluid>
                <Header as="h3">
                  Reply to{" "}
                  {
                    <Link to={`/ski-areas/reviews/${review.id}`}>
                      {review.header}
                    </Link>
                  }
                </Header>
                <Divider />
                <Header as="h4">By {reviewReply.username}</Header>
                <Header textAlign="right" as="h6">
                  {date}
                </Header>
                <Divider />
                <p>{reviewReply.body}</p>
                {authId && authId === userId ? (
                  <Container>
                    <Link
                      to={`/ski-areas/reviews/replies/${reviewReply.id}/update`}>
                      <Icon name="edit" style={{ cursor: "pointer" }} />
                    </Link>
                    <Icon
                      name="trash"
                      style={{ cursor: "pointer" }}
                      onClick={handleShowDeleteModal}
                    />
                  </Container>
                ) : null}
              </Container>
              <Modal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}>
                <Modal.Content>
                  Are You Sure You Want To Delete This Review?
                </Modal.Content>
                <Modal.Actions>
                  <Button negative onClick={handleDeleteReviewReply}>
                    Yes
                  </Button>
                  <Button onClick={() => setShowDeleteModal(false)}>
                    Cancel
                  </Button>
                </Modal.Actions>
              </Modal>
            </Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            {reviews.reviews && reviews.reviews.length > 0 ? (
              <>
                {reviews.reviews.map((review) => (
                  <Card>
                    <Card.Content key={review.id} id="review-card">
                      <Card.Header>
                        <Link to={`/ski-areas/reviews/${review.id}`}>
                          {review.header}
                        </Link>{" "}
                        <Divider />
                        {review.skiAreaName}
                      </Card.Header>
                      <Card.Description>By {review.username}</Card.Description>
                      <Card.Meta>
                        <Rating
                          icon="star"
                          defaultRating={review.stars}
                          maxRating={5}
                          disabled
                        />
                      </Card.Meta>
                      {formatDate(review.createdAt)}
                    </Card.Content>
                  </Card>
                ))}
              </>
            ) : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return null;
};

export default ReviewReply;
