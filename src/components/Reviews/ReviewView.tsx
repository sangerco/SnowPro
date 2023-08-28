import React from "react";
import { Container, Header, Rating } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ReviewData } from "../../redux/slices/reviewSlice";

interface ReviewViewProps {
  review: ReviewData;
}

const ReviewView: React.FC<ReviewViewProps> = ({ review }) => {
  const formatDate = (date: Date) => {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return newDate.toLocaleDateString("en-US", options);
  };

  const date = formatDate(review.createdAt);

  return (
    <Container as={Link} to={`/ski-areas/reviews/${review.id}`}>
      <Header as="h2">{review.header}</Header>
      <Rating icon="star" defaultRating={review.stars} maxRating={5} disabled />
      <Header as="h6" textAlign="right">
        {date}
      </Header>
    </Container>
  );
};

export default ReviewView;
