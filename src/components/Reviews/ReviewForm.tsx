import React, { useEffect, useState } from "react";
import { createReview, NewReviewData } from "../../redux/slices/reviewSlice";
import { fetchAllTags } from "../../redux/slices/tagSlice";
import {
  Button,
  Container,
  Divider,
  Dropdown,
  DropdownItemProps,
  Form,
  Grid,
  Segment,
  Rail,
  Card,
  Rating,
  Dimmer,
  Loader,
  Header,
} from "semantic-ui-react";
import { RootState, AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import TagForm from "../Tags/TagForm";
import PhotoForm from "../Media/PhotoForm";
import { deletePhoto } from "../../redux/slices/mediaSlices";
import { fetchSkiAreas } from "../../redux/slices/skiAreaSlice";
import { Link } from "react-router-dom";

const ReviewForm: React.FC = () => {
  const { slug } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.data?.id;
  const username = auth.data?.username;
  const reviews = useSelector((state: RootState) => state.reviews);

  useEffect(() => {
    dispatch(fetchAllTags());
  }, [dispatch]);

  const tags = useSelector((state: RootState) => state.tags);

  let tagOptions:
    | { key: string; text: string; value: string }[]
    | DropdownItemProps[]
    | undefined;

  if (tags.tags) {
    tagOptions = tags.tags.map((tag) => ({
      key: tag.tagId,
      text: tag.tag,
      value: tag.tagId,
    }));
  } else {
    tagOptions = [];
  }

  const ratingOptions = [
    { key: 1, text: "1", value: 1 },
    { key: 2, text: "2", value: 2 },
    { key: 3, text: "3", value: 3 },
    { key: 4, text: "4", value: 4 },
    { key: 5, text: "5", value: 5 },
  ];

  const initialReviewState: NewReviewData = {
    userId: userId ?? "",
    username: username ?? "",
    skiAreaSlug: slug ?? "",
    header: "",
    body: "",
    stars: 0,
    photos: [],
    tags: [],
  };

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

  const [formData, setFormData] = useState(initialReviewState);
  const [photos, setPhotos] = useState(initialReviewState.photos);
  const [showCreateNewTagForm, setShowCreateNewTagForm] = useState(false);
  const [showPhotoForm, setShowPhotoForm] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createReview(formData));

    setFormData(initialReviewState);
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

  const handleRemovePhotoInput = (index: number) => {
    if (formData.photos) {
      const updatedPhotoLinks = [...formData.photos];
      updatedPhotoLinks.splice(index, 1);
      setPhotos(updatedPhotoLinks);
      dispatch(deletePhoto(formData.photos[index]));
    }
  };

  return (
    <Grid centered columns={3}>
      <Grid.Column>
        <Segment>
          <Container fluid>
            <Form onSubmit={handleSubmit}>
              <Form.Field required>
                <label>Header</label>
                <input
                  name="header"
                  value={formData.header}
                  onChange={handleInputChange}
                />
              </Form.Field>
              <Form.TextArea
                required={true}
                placeholder="How was it?"
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
                    <Button
                      icon="plus"
                      onClick={() => setShowPhotoForm(true)}
                    />
                  )}
                  {showPhotoForm && <PhotoForm />}
                  {index > 0 && (
                    <Button
                      icon="minus"
                      onClick={() => handleRemovePhotoInput(index)}
                    />
                  )}
                </Form.Field>
              ))}
              <Button type="submit">Send it!</Button>
              <Divider />
              <label>Tags</label>
              <Dropdown
                clearable
                options={tagOptions}
                multiple
                fluid
                selection
                value={formData.tags}
              />
              <Button
                onClick={() => setShowCreateNewTagForm(true)}
                size="small">
                Create New Tag?
              </Button>
              {showCreateNewTagForm && <TagForm />}
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
            </Form>
          </Container>

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

export default ReviewForm;
