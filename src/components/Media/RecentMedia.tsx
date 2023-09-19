import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchRecentMedia } from "../../redux/slices/mediaSlices";
import {
  Button,
  Card,
  Dimmer,
  Divider,
  Grid,
  Header,
  Loader,
  Rating,
} from "semantic-ui-react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { fetchSkiAreas } from "../../redux/slices/skiAreaSlice";
import { fetchAllReviews } from "../../redux/slices/reviewSlice";
import VideoView from "./VideoView";
import PhotoView from "./PhotoView";

const RecentMedia: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchRecentMedia());
  }, [dispatch]);

  const media = useSelector((state: RootState) => state.media);
  const recentMedia = media.media;

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

  if (media.loading) {
    return (
      <Dimmer active>
        <Loader>Loading...</Loader>
      </Dimmer>
    );
  }

  if (media.error) {
    return (
      <Dimmer active>
        <Header as="h1">
          Error! Pics could not be retrieved! {media.error}
        </Header>
        <Button color="red" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Dimmer>
    );
  }

  if (recentMedia) {
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
                  {" "}
                  {/* max height overflow auto */}
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
            </Grid.Column>
            <Grid.Column width={8}>
              {/* {recentMedia.media.map((item) =>
                item.link.includes("youtube") ||
                item.link.includes("youtu.be") ? (
                  <VideoView key={item.id} id={item.id} />
                ) : (
                  <PhotoView key={item.id} id={item.id} />
                )
              )} */}
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
              ) : reviews && reviews.length > 0 ? (
                <>
                  {reviews.map((review) => (
                    <Card>
                      {" "}
                      {/* paginated */}
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
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }

  return null;
};

export default RecentMedia;
