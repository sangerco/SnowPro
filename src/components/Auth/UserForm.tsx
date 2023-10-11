import React, { useEffect, useState } from "react";
import { createUser } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  Form,
  Button,
  Grid,
  Segment,
  Card,
  Dimmer,
  Loader,
  Header,
  Divider,
  Rating,
} from "semantic-ui-react";
import { useNavigate } from "react-router";
import { fetchSkiAreas } from "../../redux/slices/skiAreaSlice";
import { Link } from "react-router-dom";

const UserForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const reviews = useSelector((state: RootState) => state.reviews);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSkiAreas());
  }, [dispatch]);

  const skiAreaState = useSelector((state: RootState) => state.skiAreas);
  const skiAreas = skiAreaState.skiAreas;

  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      createUser({
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      })
    );

    setFormData(initialState);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
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
          <Segment raised>
            <Form onSubmit={handleSubmit} data-testid="user-form">
              <Form.Field required>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  placeholder="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field required>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  placeholder="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field required>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field required>
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field required>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Field>
              <div className="ui two buttons">
                <Button
                  data-testid="registerButton"
                  color="green"
                  type="submit">
                  Register
                </Button>
                <Button
                  data-testid="cancelButton"
                  color="red"
                  onClick={() => navigate("/")}>
                  Cancel
                </Button>
              </div>
            </Form>
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
};

export default UserForm;
