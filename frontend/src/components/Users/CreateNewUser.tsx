import React, { useState } from "react";
import { connect } from "react-redux";
import { sendNewUserData } from "../../oldRedux/actions/userActions";
import { RootState } from "../../oldRedux/store";
import { Button, Input, Form, Message } from "semantic-ui-react";

interface NewUserData {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface NewUserProps {
  newUser: NewUserData | null;
  loading: boolean;
  error: string;
  sendNewUserData: (
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    email: string
  ) => Promise<void>;
}

const CreateUserForm: React.FC<NewUserProps> = ({
  newUser,
  loading,
  error,
  sendNewUserData,
}) => {
  const [formData, setFormData] = useState<NewUserData>({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await sendNewUserData(
      formData.username,
      formData.password,
      formData.first_name,
      formData.last_name,
      formData.email
    );

    setFormData({
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
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
        <label>First Name</label>
        <input
          placeholder="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input
          placeholder="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Username</label>
        <input
          placeholder="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Choose Password</label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Field>
      <Button type="submit">Submit</Button>
      {loading && <p>Loading...</p>}
      <Message error header={error} content={error} />
    </Form>
  );
};

const mapStateToProps = (state: RootState) => ({
  newUser: state.newUser.data,
  loading: state.newUser.loading,
  error: state.newUser.error,
});

export default connect(mapStateToProps, { sendNewUserData })(CreateUserForm);
