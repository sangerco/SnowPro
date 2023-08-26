import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { Link, useParams } from "react-router-dom";
import { fetchReview } from "../../redux/slices/reviewSlice";
import {
  fetchReviewReply,
  deleteReviewReply,
} from "../../redux/slices/reviewReplySlice";
import { Container, Dimmer, Divider, Header, Loader } from "semantic-ui-react";

const ReviewReply: React.FC = () => {
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

  const handleDeleteReview = () => {
    if (id) {
      dispatch(deleteReviewReply(id));
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

    return (
      <Container fluid>
        <Header as="h3">
          Reply to{" "}
          {<Link to={`/ski-areas/reviews/${review.id}`}>{review.header}</Link>}
        </Header>
        <Divider />
        <Header as="h4">By {reviewReply.username}</Header>
        <Header textAlign="right" as="h6">
          {date}
        </Header>
        <Divider />
        <p>{reviewReply.body}</p>
      </Container>
    );
  }
};
