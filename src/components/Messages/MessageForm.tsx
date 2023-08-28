import React, { useEffect, useState } from "react";
import { createMessage } from "../../redux/slices/messageSlice";
import { fetchUserData } from "../../redux/slices/userSlice";
import { Button, DropdownItemProps, Form, Dropdown } from "semantic-ui-react";
import { RootState, AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

const MessageForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.data?.id;
  const senderId = userId ? userId : "";

  const initialMessageState = {
    sender_id: senderId,
    recipient_id: "",
    subject: "",
    body: "",
  };

  useEffect(() => {
    dispatch(fetchUserData);
  }, [dispatch]);

  const users = useSelector((state: RootState) => state.users.users);

  let userOptions:
    | { key: string; text: string; value: string }[]
    | DropdownItemProps[]
    | undefined;

  if (users) {
    userOptions = users.map((user) => ({
      key: user.id,
      text: user.username,
      value: user.id,
    }));
  } else {
    userOptions = [];
  }
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

  const handleDropdownChange = (
    e: React.SyntheticEvent<HTMLElement>,
    data: any
  ) => {
    setFormData({
      ...formData,
      recipient_id: data.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label>Who do you want to send this message to?</label>
      <Dropdown
        required
        clearable
        multiple
        options={userOptions}
        fluid
        selection
        onChange={handleDropdownChange}
      />
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
