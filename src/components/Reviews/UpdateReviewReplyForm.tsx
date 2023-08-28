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
} from "semantic-ui-react";

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
    );
  }

  return null;
};

export default UpdateReviewReplyForm;
