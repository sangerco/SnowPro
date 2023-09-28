/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LoginForm from "../../../components/Auth/LoginForm";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";
import { debug } from "console";

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

    const usernameInput = screen
      .getByTestId("username-input")
      .querySelector("input");
    // console.log(usernameInput);
    const passwordInput = screen
      .getByTestId("password-input")
      .querySelector("input");
    // console.log(passwordInput);
    const button = screen.getByText("Login");
    // console.log(button);
    // @ts-ignore
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    // @ts-ignore
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalled();
  });
});
