import React, { useEffect, useState } from "react";
import { createMessage } from "../../redux/slices/messageSlice";
import { fetchUserData } from "../../redux/slices/userSlice";
import {
  Button,
  DropdownItemProps,
  Form,
  Dropdown,
  Grid,
  Segment,
  Rail,
  Loader,
  Dimmer,
  Card,
  Header,
} from "semantic-ui-react";
import { RootState, AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkiAreas } from "../../redux/slices/skiAreaSlice";
import { Link, useNavigate } from "react-router-dom";

const MessageForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.data?.id;
  const senderId = userId ? userId : "";

  const initialMessageState = {
    sender_id: senderId,
    recipient_id: "",
    subject: "",
    body: "",
  };

  console.log(initialMessageState);

  useEffect(() => {
    dispatch(fetchUserData);
  }, [dispatch]);

  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    dispatch(fetchSkiAreas());
  }, [dispatch]);

  const skiAreaState = useSelector((state: RootState) => state.skiAreas);
  const skiAreas = skiAreaState.skiAreas;

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

    navigate(-1);

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

  console.log(formData);

  return (
    <div id="background-container">
      <Grid centered columns={3}>
        <Grid.Column>
          <Segment>
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

            <Rail dividing position={"left"}>
              {skiAreaState.loading ? (
                <Dimmer active>
                  <Loader>Loading...</Loader>
                </Dimmer>
              ) : skiAreas && skiAreas.length > 0 ? (
                <Card>
                  {skiAreas.map((sa) => (
                    <Card.Content key={sa.slug}>
                      <Link to={`/ski-areas/${sa.slug}`}>{sa.name}</Link>
                    </Card.Content>
                  ))}
                </Card>
              ) : skiAreaState.error ? (
                <Dimmer active>
                  <Header as="h1">
                    Error! Ski Area Data cannot be retrieved!{" "}
                    {skiAreaState.error}
                  </Header>
                </Dimmer>
              ) : null}
            </Rail>

            <Rail dividing position={"right"}></Rail>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default MessageForm;
