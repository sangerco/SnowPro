import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Dimmer,
  Loader,
  Rating,
  Header,
  Divider,
  Grid,
  Card,
  Segment,
} from "semantic-ui-react";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchAllReviews } from "../../redux/slices/reviewSlice";
import { fetchSkiAreas } from "../../redux/slices/skiAreaSlice";

const RecentReviews: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reviews = useSelector((state: RootState) => state.reviews);
  useEffect(() => {
    dispatch(fetchAllReviews());
  }, [dispatch]);

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

  if (Array.isArray(reviews)) {
    return <div>Error! Reviews cannot be retrieved!</div>;
  } else if (reviews) {
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
            <Card.Group>
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
                        <Card.Description>
                          By {review.username}
                        </Card.Description>
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
            </Card.Group>
          </Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return null;
};

export default RecentReviews;
