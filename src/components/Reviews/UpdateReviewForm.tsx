import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchReview,
  updateReview,
  ReviewData,
} from "../../redux/slices/reviewSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { useParams, useNavigate } from "react-router";
import {
  Container,
  Button,
  Dimmer,
  Loader,
  Form,
  Divider,
  Dropdown,
  DropdownItemProps,
  Header,
  Grid,
  Card,
  Segment,
} from "semantic-ui-react";
import { fetchSkiAreas } from "../../redux/slices/skiAreaSlice";
import { Link } from "react-router-dom";

const UpdateReviewForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.data?.id;
  const username = auth.data?.username;
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchReview(id));
    }
  }, [dispatch, id]);

  const reviews = useSelector((state: RootState) => state.reviews);
  const review = reviews.review;

  useEffect(() => {
    dispatch(fetchSkiAreas());
  }, [dispatch]);

  const skiAreaState = useSelector((state: RootState) => state.skiAreas);
  const skiAreas = skiAreaState.skiAreas;

  const ratingOptions = [
    { key: 1, text: "1", value: 1 },
    { key: 2, text: "2", value: 2 },
    { key: 3, text: "3", value: 3 },
    { key: 4, text: "4", value: 4 },
    { key: 5, text: "5", value: 5 },
  ];

  let initialUpdateReviewState: ReviewData;

  if (review) {
    initialUpdateReviewState = {
      id: review.id,
      userId: review.userId,
      username: review.username,
      skiAreaSlug: review.skiAreaSlug,
      skiAreaName: review.skiAreaName,
      header: review.header,
      body: review.body,
      stars: review.stars,
      photos: review.photos || [],
      createdAt: review.createdAt,
    };
  } else {
    initialUpdateReviewState = {
      id: "",
      userId: userId || "",
      username: username || "",
      skiAreaSlug: "",
      skiAreaName: "",
      header: "",
      body: "",
      stars: 0,
      photos: [],
      createdAt: new Date(),
    };
  }

  const [formData, setFormData] = useState(initialUpdateReviewState);
  const [photos, setPhotos] = useState(initialUpdateReviewState.photos);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateReview(formData));

    setFormData(initialUpdateReviewState);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (index: number, value: string) => {
    if (formData.photos) {
      const updatedPhotoLinks = [...formData.photos];
      updatedPhotoLinks[index] = value;
      setPhotos(updatedPhotoLinks);
    }
  };

  const handleAddPhotoInput = () => {
    if (formData.photos) {
      setPhotos([...formData.photos, ""]);
    }
  };

  const handleRemovePhotoInput = (index: number) => {
    if (formData.photos) {
      const updatedPhotoLinks = [...formData.photos];
      updatedPhotoLinks.splice(index, 1);
      setPhotos(updatedPhotoLinks);
    }
  };

  if (reviews.loading) {
    <Dimmer active>
      <Loader>Loading...</Loader>
    </Dimmer>;
  }

  if (reviews.error) {
    <Dimmer active>
      <Header as="h1">
        Error! Review cannot be retrieved! {reviews.error}
      </Header>
      <Button color="red" onClick={() => navigate(-1)}>
        Go Back.
      </Button>
    </Dimmer>;
  }

  if (review && userId !== review.userId) {
    return (
      <div>
        <Dimmer active>
          <Header as="h1">You are not authorized to edit this review.</Header>
          <Button color="red" onClick={() => navigate(-1)}>
            Go Back.
          </Button>
        </Dimmer>
      </div>
    );
  }

  if (review) {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            {skiAreaState.loading ? (
              <Dimmer active>
                <Loader>Loading...</Loader>
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
            ) : skiAreaState.error ? (
              <Dimmer active>
                <Header as="h1">
                  Error! Ski Area Data cannot be retrieved! {skiAreaState.error}
                </Header>
              </Dimmer>
            ) : null}
          </Grid.Column>
          <Grid.Column width={8}>
            <Container fluid>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <input
                    placeholder={formData.body}
                    name="header"
                    value={formData.header}
                    onChange={handleInputChange}
                  />
                </Form.Field>
                <Form.TextArea
                  placeholder={formData.body}
                  name="body"
                  value={formData.body}
                  onChange={handleTextAreaChange}
                />
                {photos.map((photo, index) => (
                  <Form.Field key={index}>
                    <label>Photo Links</label>
                    <input
                      type="text"
                      value={photo}
                      onChange={(e) => handlePhotoChange(index, e.target.value)}
                    />
                    {index === photos.length - 1 && (
                      <Button icon="plus" onClick={handleAddPhotoInput} />
                    )}
                    {index > 0 && (
                      <Button
                        icon="minus"
                        onClick={() => handleRemovePhotoInput(index)}
                      />
                    )}
                  </Form.Field>
                ))}
                <Divider />
                <label>How would you rate your experience?</label>
                <Dropdown
                  clearable
                  options={ratingOptions}
                  selection
                  fluid
                  value={formData.stars}
                />
                <Divider />
                <Button type="submit">Send it!</Button>
              </Form>
            </Container>
          </Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return null;
};

export default UpdateReviewForm;
