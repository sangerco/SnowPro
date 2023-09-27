import React from "react";
import { render, fireEvent, screen, getByText } from "@testing-library/react";
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

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const button = screen.getByText("Login");

    fireEvent.submit(button);
    expect(handleSubmit).toHaveBeenCalled();
  });
});
