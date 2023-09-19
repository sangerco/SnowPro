import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchReviewReply,
  updateReviewReply,
  ReviewReplyData,
} from "../../redux/slices/reviewReplySlice";
import { RootState, AppDispatch } from "../../redux/store";
import { useParams, useNavigate } from "react-router";
import {
  Container,
  Button,
  Form,
  Dimmer,
  Loader,
  Header,
  Grid,
  Card,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { fetchSkiAreas } from "../../redux/slices/skiAreaSlice";

const UpdateReviewReplyForm: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.data?.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchReviewReply(id));
    }
  }, [dispatch, id]);

  const reviewReplies = useSelector((state: RootState) => state.reviewReplies);
  const reviewReply = reviewReplies.reviewReply;

  useEffect(() => {
    dispatch(fetchSkiAreas());
  }, [dispatch]);

  const skiAreaState = useSelector((state: RootState) => state.skiAreas);
  const skiAreas = skiAreaState.skiAreas;

  let initialUpdateReviewReplyState: ReviewReplyData;

  if (reviewReply) {
    initialUpdateReviewReplyState = {
      id: reviewReply.id,
      reviewId: reviewReply.reviewId,
      userId: reviewReply.userId,
      username: reviewReply.username,
      body: reviewReply.body,
      slug: reviewReply.slug,
      createdAt: reviewReply.createdAt,
    };
  } else {
    initialUpdateReviewReplyState = {
      id: id ?? "",
      reviewId: "",
      userId: userId ?? "",
      username: "",
      body: "",
      slug: "",
      createdAt: new Date(),
    };
  }

  const [formData, setFormData] = useState(initialUpdateReviewReplyState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateReviewReply(formData));

    setFormData(initialUpdateReviewReplyState);
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (reviewReplies.loading) {
    <Dimmer active>
      <Loader>Loading...</Loader>
    </Dimmer>;
  }

  if (reviewReplies.error) {
    <div>
      <Dimmer active>
        <Header as="h1">
          Error! Review Reply cannot be retrieved! {reviewReplies.error}
        </Header>
      </Dimmer>
      <Button color="red" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </div>;
  }

  if (reviewReply && reviewReply.userId !== userId) {
    <div>
      <Dimmer active>
        <Header as="h1">
          You are not authorized to edit this Review Reply!
        </Header>
      </Dimmer>
      <Button color="red" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </div>;
  }

  if (reviewReply) {
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
            {" "}
            <Container fluid>
              <Form onSubmit={handleSubmit}>
                <Form.TextArea
                  placeholder="Reply to this review"
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                />
                <Button size="small" color="green" type="submit">
                  Reply
                </Button>
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

export default UpdateReviewReplyForm;
