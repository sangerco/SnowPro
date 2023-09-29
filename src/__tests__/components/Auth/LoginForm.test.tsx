/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import LoginForm from "../../../components/Auth/LoginForm";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";

describe("test LoginForm", () => {
  it("renders without crashing", () => {
    const handleSubmit = jest.fn();
    <Provider store={store}>
      <LoginForm onSubmit={handleSubmit} />
    </Provider>;
  });

  it("matches snapshot", () => {
    const handleSubmit = jest.fn();
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm onSubmit={handleSubmit} />
        </BrowserRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should contain a form", () => {
    const handleSubmit = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm onSubmit={handleSubmit} />
        </BrowserRouter>
      </Provider>
    );
    const username = screen.getByTestId("username-input");
    const password = screen.getByTestId("password-input");
    expect(username).toHaveTextContent("Username:");
    expect(password).toHaveTextContent("Password:");
  });

  it("should submit the form", () => {
    const handleSubmit = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm onSubmit={handleSubmit} />
        </BrowserRouter>
      </Provider>
    );

    const username = screen.getByPlaceholderText("Username");
    // const usernameInput = username.children[0];
    const password = screen.getByPlaceholderText("Password");
    // const passwordInput = password.children[0];
    const button = screen.getByText("Login");

    // @ts-ignore
    fireEvent.change(username, { target: { value: "testuser" } });
    // @ts-ignore
    fireEvent.change(password, { target: { value: "testpassword" } });

    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalled();
  });
});
