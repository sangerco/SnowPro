import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchUserData, UserData } from "../../redux/slices/userSlice";
import {
  Button,
  Card,
  Image,
  Loader,
  Dimmer,
  Grid,
  Rating,
  Divider,
  Header,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { fetchSkiAreas } from "../../redux/slices/skiAreaSlice";
import { fetchAllReviews } from "../../redux/slices/reviewSlice";

const Users = () => {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

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

  if (users.loading) {
    <div>
      <Dimmer active>
        <Loader>Loading...</Loader>
      </Dimmer>
    </div>;
  }

  if (users.error) {
    <div>
      <Dimmer active>
        <div>{`Error! Users cannot be loaded! ${users.error}`}</div>
      </Dimmer>
    </div>;
  }

  if (users.users) {
    return (
      <div>
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
              {users.users.map((user: UserData) => (
                <Card.Group key={user.id}>
                  <Card>
                    <Card.Content>
                      {user.avatar ? (
                        <Image floated="right" wrapped src={user.avatar} />
                      ) : null}
                      <Card.Header>{user.username}</Card.Header>
                      <Card.Meta>
                        {user.firstName} {user.lastName}
                      </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                      <Button as={Link} to={`/users/${user.username}`}>
                        {`${user.username}'s Profile`}
                      </Button>
                    </Card.Content>
                  </Card>
                </Card.Group>
              ))}
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

export default Users;
