import React, { useState } from "react";
import { createMessage } from "../../redux/slices/messageSlice";
import { Button, Form } from "semantic-ui-react";
import { RootState, AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

const MessageForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users);
  const user = users.user;
  const senderId = user ? user.id : "";

  const initialMessageState = {
    senderId: senderId,
    recipientId: "",
    subject: "",
    body: "",
  };

  const [formData, setFormData] = useState(initialMessageState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createMessage(formData));

    setFormData(initialMessageState);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBodyChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field required>
        <input
          placeholder="Who do you want to send this message to?"
          name="recipientId"
          value={formData.recipientId}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <input
          placeholder="Whatcha talking about?"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.TextArea
        placeholder="Message"
        name="body"
        value={formData.body}
        onChange={handleBodyChange}
      />
      <Button type="submit">Send</Button>
    </Form>
  );
};

export default MessageForm;
