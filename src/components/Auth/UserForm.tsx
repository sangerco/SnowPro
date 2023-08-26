import React, { useState } from "react";
import { createUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { Form, Button } from "semantic-ui-react";
import { useNavigate } from "react-router";

const UserForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      createUser({
        username: formData.username,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
      })
    );

    setFormData(initialState);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field required>
        <label>Username</label>
        <input
          placeholder="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field required>
        <label>Password</label>
        <input
          placeholder="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field required>
        <label>First Name</label>
        <input
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field required>
        <label>Last Name</label>
        <input
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field required>
        <label>Email</label>
        <input
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Field>
      <div className="ui two buttons">
        <Button color="green" type="submit">
          Register
        </Button>
        <Button color="red" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default UserForm;
