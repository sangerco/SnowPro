import React, { useEffect } from "react";
import MyPage from "./MyPage";
import { fetchSkiAreas } from "../../redux/slices/skiAreaSlice";
import { fetchAllReviews } from "../../redux/slices/reviewSlice";
import AnonHome from "./AnonHome";
import "./Home.css";
import {
  Card,
  Dimmer,
  Divider,
  Grid,
  Header,
  Loader,
  Rating,
  Segment,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import Inbox from "../Messages/Inbox";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const username = useSelector((state: RootState) => state.auth.data?.username);

  useEffect(() => {
    dispatch(fetchSkiAreas());
  }, [dispatch]);

  const skiAreaState = useSelector((state: RootState) => state.skiAreas);
  const skiAreas = skiAreaState.skiAreas;

  useEffect(() => {
    dispatch(fetchAllReviews());
  }, [dispatch]);

  const reviewState = useSelector((state: RootState) => state.reviews);
  const reviews = reviewState.reviews;

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
    <div id="background-container">
      <Grid>
        <Grid.Row>
          <Grid.Column widescreen={4}>
            {skiAreaState.loading ? (
              <Dimmer active>
                <Loader>Loading...</Loader>
              </Dimmer>
            ) : skiAreas && skiAreas.length > 0 ? (
              <Card id="ski-area-card">
                {skiAreas.map((sa) => (
                  <Card.Content key={sa.slug}>
                    <Link to={`/ski-areas/${sa.slug}`}>{sa.name}</Link>
                  </Card.Content>
                ))}
              </Card>
            ) : skiAreaState.error ? (
              <Dimmer active>
                <Header as="h1">
                  Error! Ski Area Data cannot be retrieved! {skiAreaState.error}
                </Header>
              </Dimmer>
            ) : null}
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>{isAuthenticated ? <MyPage /> : <AnonHome />}</Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            {reviewState.loading ? (
              <Dimmer active>
                <Loader>Loading...</Loader>
              </Dimmer>
            ) : reviewState.error ? (
              <Dimmer active>
                <Header as="h1">
                  Error! Review Data cannot be retrieved! {reviewState.error}
                </Header>
              </Dimmer>
            ) : isAuthenticated && username ? (
              <div id="inbox-div">
                <Inbox username={username} />
              </div>
            ) : reviews && reviews.length > 0 ? (
              <>
                {reviews.map((review) => (
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
    </div>
  );
};

export default Home;
