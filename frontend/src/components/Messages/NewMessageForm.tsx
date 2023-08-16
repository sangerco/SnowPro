import React, { useState } from "react";
import { connect } from "react-redux";
import { useAuth } from "./../AuthProvider";
import { sendNewMessageData } from "../../oldRedux/actions/messageActions";
import { RootState } from "../../oldRedux/store";
import { Button, Form, Message } from "semantic-ui-react";

interface NewMessageData {
  sender_id: string;
  recipient_id: string;
  subject: string;
  body: string;
}

interface NewMessageProps {
  newMessage: NewMessageData | null;
  error: string;
  sendNewMessageData: (
    sender_id: string,
    recipient_id: string,
    subject: string,
    body: string
  ) => Promise<void>;
}

const NewMessageForm: React.FC<NewMessageProps> = ({
  newMessage,
  error,
  sendNewMessageData,
}) => {
  const { userId } = useAuth();
  const [formData, setFormData] = useState<NewMessageData>({
    sender_id: userId ?? "",
    recipient_id: "",
    subject: "",
    body: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await sendNewMessageData(
      formData.sender_id,
      formData.recipient_id,
      formData.subject,
      formData.body
    );

    setFormData({
      sender_id: userId ?? "",
      recipient_id: "",
      subject: "",
      body: "",
    });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Form onSubmit={handleSubmit} error>
      <Form.Field>
        <input
          placeholder="Who do you want to send this message to?"
          name="recipient_id"
          value={formData.recipient_id}
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
      <Form.TextArea>
        <input
          placeholder="Message"
          name="body"
          value={formData.body}
          onChange={handleChange}
        />
      </Form.TextArea>
      <Button type="submit">Send</Button>
      <Message error header={error} content={error} />
    </Form>
  );
};

const mapStateToProps = (state: RootState) => ({
  newMessage: state.newMessage.data,
  error: state.newMessage.error,
});

export default connect(mapStateToProps, { sendNewMessageData })(NewMessageForm);
