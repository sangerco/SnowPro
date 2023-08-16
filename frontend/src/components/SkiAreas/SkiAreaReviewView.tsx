import React from "react";
import { Header, Image, Label, Button, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ReviewViewData } from "../../interfaces/skiAreaInterfaces";

interface ReviewProps {
  review: ReviewViewData | null;
}

const Review: React.FC<ReviewProps> = ({ review }) => {
  const formatDate = (date: Date) => {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return newDate.toLocaleDateString("en-US", options);
  };
  if (review) {
    const date = formatDate(review.createdAt);

    return (
      <Card fluid>
        <Card.Content textAlign="left">
          <Link to={`/ski-areas/${review.skiAreaSlug}/reviews/${review.id}`}>
            <Header as="h2">{review.header}</Header>
          </Link>
          <Card.Meta textAlign="left">
            <Header as="h6">By {review.username}</Header>
          </Card.Meta>
          <Card.Meta textAlign="right">
            <i>{date}</i>
          </Card.Meta>
          <Card.Description>
            <p>{review.body}</p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {review.tags && review.tags.length > 0 && (
            <Label.Group>
              {review.tags.map((tag, index) => (
                <Label as="a" key={index}>
                  {tag}
                </Label>
              ))}
            </Label.Group>
          )}
          {review.photos && review.photos.length > 0 ? (
            review.photos.map((photo, index) => (
              <Image key={index} src={photo} fluid />
            ))
          ) : (
            <p>No photos yet.</p>
          )}
          <Button
            as="a"
            href={`/ski-areas/${review.skiAreaSlug}/reviews/${review.id}/reply`}
            size="small"
            color="blue">
            Reply to this review?
          </Button>
        </Card.Content>
      </Card>
    );
  }

  return null;
};

export default Review;
