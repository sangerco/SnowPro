import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createMessageReply } from "../../redux/slices/messageReplySlice";
import { fetchMessage } from "../../redux/slices/messageSlice";
import { Button, Form } from "semantic-ui-react";
import { RootState, AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

const MessageReplyForm: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector((state: RootState) => state.messages);

  const messageId = id;

  useEffect(() => {
    if (messageId) {
      dispatch(fetchMessage(messageId));
    }
  }, [dispatch, messageId]);

  const message = messages.message;
  const senderId = message ? message.recipientId : "";
  const recipientId = message ? message.senderId : "";
  const subject = message ? `Re: ${message.subject}` : "";
  const body = message ? `>${message.body} \n\n` : "";

  console.log(body);

  const initialMessageReplyState = {
    messageId: messageId ? messageId : "",
    senderId: senderId,
    recipientId: recipientId,
    subject: subject,
    body: body,
  };

  const [formData, setFormData] = useState(initialMessageReplyState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createMessageReply(formData));

    setFormData(initialMessageReplyState);
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

export default MessageReplyForm;
