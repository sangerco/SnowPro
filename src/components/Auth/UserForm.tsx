import React, { useEffect, useState } from "react";
import { createUser } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  Form,
  Button,
  Grid,
  Rail,
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
        first_name: formData.firstName,
        last_name: formData.lastName,
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
    <Grid centered columns={3}>
      <Grid.Column>
        <Segment>
          <Form onSubmit={handleSubmit}>
            <Form.Field required>
              <label>Username</label>
              <input
                placeholder="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field required>
              <label>Password</label>
              <input
                placeholder="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field required>
              <label>First Name</label>
              <input
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field required>
              <label>Last Name</label>
              <input
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field required>
              <label>Email</label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Field>
            <div className="ui two buttons">
              <Button color="green" type="submit">
                Register
              </Button>
              <Button color="red" onClick={() => navigate("/")}>
                Cancel
              </Button>
            </div>
          </Form>

          <Rail dividing position={"left"}>
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
          </Rail>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default UserForm;
