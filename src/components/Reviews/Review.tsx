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
  Image,
  Grid,
  Segment,
  Card,
} from "semantic-ui-react";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchReview, deleteReview } from "../../redux/slices/reviewSlice";
import { fetchSkiAreas } from "../../redux/slices/skiAreaSlice";
import ReviewReplyForm from "./ReviewReplyForm";

const Review: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const authId = auth.data?.id;
  const isAuthenticated = auth.isAuthenticated;
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const reviews = useSelector((state: RootState) => state.reviews);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReviewReplyModal, setShowReviewReplyModal] = useState(false);

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

  const handleShowReviewReplyModal = () => {
    setShowReviewReplyModal(true);
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
              <Segment style={{ overflow: "auto", maxHeight: "75vh" }}>
                <Card id="ski-area-card">
                  {" "}
                  {/* max height overflow auto */}
                  {skiAreas.map((sa) => (
                    <Card.Content key={sa.slug}>
                      <Link to={`/ski-areas/${sa.slug}`}>{sa.name}</Link>
                    </Card.Content>
                  ))}
                </Card>
              </Segment>
            ) : null}
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
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
                {isAuthenticated && id ? (
                  <>
                    <Divider />
                    <Container>
                      <Button
                        color="green"
                        onClick={handleShowReviewReplyModal}>
                        Reply to this review?
                      </Button>
                    </Container>
                    <Divider />
                  </>
                ) : null}
                <Modal
                  open={showDeleteModal}
                  onClose={() => setShowDeleteModal(false)}>
                  <Modal.Content>
                    Are You Sure You Want To Delete This Review?
                  </Modal.Content>
                  <Modal.Actions>
                    <Button negative onClick={handleDeleteReview}>
                      Yes
                    </Button>
                    <Button onClick={() => setShowDeleteModal(false)}>
                      Cancel
                    </Button>
                  </Modal.Actions>
                </Modal>
                {id ? (
                  <Modal
                    open={showReviewReplyModal}
                    onClose={() => setShowReviewReplyModal(false)}>
                    <ReviewReplyForm
                      reviewId={id}
                      slug={review.skiAreaSlug}
                      username={review.username}
                      userId={review.userId}
                      closeModal={() => setShowReviewReplyModal(false)}
                    />
                  </Modal>
                ) : null}

                {review.replies && review.replies.length > 0 ? (
                  review.replies.map((reply) => (
                    <Container
                      as={Link}
                      to={`/ski-areas/reviews/replies/${reply.id}`}>
                      <Header as="h2">{reply.body}</Header>
                      <Header as="h6" textAlign="right">
                        {formatDate(reply.createdAt)}
                      </Header>
                    </Container>
                  ))
                ) : (
                  <p>No replies to this review yet.</p>
                )}
              </div>
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

export default Review;
