import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createReviewReply } from "../../redux/slices/reviewReplySlice";
import { Button, Container, Form, Header } from "semantic-ui-react";

interface ReviewReplyFormProps {
  reviewId: string;
  slug: string;
  username: string;
  userId: string;
  closeModal: () => void;
}

const ReviewReplyForm: React.FC<ReviewReplyFormProps> = ({
  reviewId,
  slug,
  username,
  userId,
  closeModal,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const id = reviewId;

  const initialReviewReplyState = {
    userId: userId!,
    username: username!,
    reviewId: id,
    slug: slug,
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
    <Container
      fluid
      style={{ margin: "20px", padding: "20px" }}
      data-testid="review-reply-form">
      <Header as="h3">Reply to {`${username}`}'s review:</Header>
      <Form onSubmit={handleSubmit}>
        <Form.TextArea
          placeholder="Reply to this review"
          name="body"
          value={formData.body}
          onChange={handleChange}
        />
        <Button
          size="small"
          color="green"
          type="submit"
          data-testid="submit-button">
          Reply
        </Button>
        <Button size="small" color="red" onClick={closeModal}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default ReviewReplyForm;
