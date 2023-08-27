import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router";
import { createReviewReply } from "../../redux/slices/reviewReplySlice";
import { fetchReview } from "../../redux/slices/reviewSlice";
import { Button, Container, Form } from "semantic-ui-react";

const ReviewReplyForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.data?.id;
  const username = auth.data?.username;

  useEffect(() => {
    if (id) {
      dispatch(fetchReview(id));
    }
  }, [dispatch, id]);

  const review = useSelector((state: RootState) => state.reviews.review);
  const skiAreaSlug = review?.skiAreaSlug;

  const initialReviewReplyState = {
    userId: userId ?? "",
    username: username ?? "",
    reviewId: id ?? "",
    slug: skiAreaSlug ?? "",
    body: "",
  };

  const [formData, setFormData] = useState(initialReviewReplyState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createReviewReply(formData));

    setFormData(initialReviewReplyState);
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
};

export default ReviewReplyForm;
