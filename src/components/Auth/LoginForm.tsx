import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { loginUser } from "../../redux/slices/authSlice";
import {
  Rail,
  Button,
  Form,
  Card,
  Dimmer,
  Loader,
  Header,
  Grid,
  Segment,
  Rating,
  Divider,
  Modal,
} from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { initialLoginState } from "../../helpers/helperStates";
import { fetchSkiAreas } from "../../redux/slices/skiAreaSlice";
import { fetchAllReviews } from "../../redux/slices/reviewSlice";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialLoginState);
  const [modalOpen, setModalOpen] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const isAuthenticated = auth.isAuthenticated;

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

  if (reviews) {
    console.log(reviews[0].createdAt);
  }

  const formatDate = (date: Date) => {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return newDate.toLocaleDateString("en-US", options);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginUser(formData));

    setFormData(initialLoginState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (reviewState.loading || skiAreaState.loading) {
    <Dimmer active>
      <Loader>Loading...</Loader>
    </Dimmer>;
  }

  if (reviewState.error || skiAreaState.error) {
    <Dimmer active>
      <Header as="h1">Error retrieving page!</Header>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </Dimmer>;
  }

  return (
    <>
      <Grid centered columns={3}>
        <Grid.Column>
          <Segment>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>
                  Username:
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </label>
              </Form.Field>
              <Form.Field></Form.Field>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>
              <Form.Field />
              <Button color="blue" type="submit">
                Login
              </Button>
            </Form>

            <Rail dividing position={"left"}>
              {skiAreaState.loading ? (
                <Dimmer active>
                  <Loader>Loading...</Loader>
                </Dimmer>
              ) : skiAreaState.error ? (
                <Dimmer active>
                  <Header as="h1">
                    Error! Ski Area Data cannot be retrieved!{" "}
                    {skiAreaState.error}
                  </Header>
                </Dimmer>
              ) : skiAreas && skiAreas.length > 0 ? (
                <Card>
                  {skiAreas.map((sa) => (
                    <Card.Content key={sa.slug}>
                      <Link to={`/ski-areas/${sa.slug}`}>{sa.name}</Link>
                    </Card.Content>
                  ))}
                </Card>
              ) : null}
            </Rail>

            <Rail dividing position={"right"}>
              {reviews && reviews.length > 0 ? (
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
            </Rail>
          </Segment>
        </Grid.Column>
      </Grid>
      <Modal open={modalOpen}>
        <Modal.Content>
          <Header as="h1">Login Failed!</Header>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default LoginForm;
