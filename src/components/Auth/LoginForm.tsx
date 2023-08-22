import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { loginUser } from "../../redux/slices/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const initialState = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginUser(formData));

    setFormData(initialState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
