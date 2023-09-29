/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import UserForm from "../../../components/Auth/UserForm";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";

describe("test UserForm", () => {
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserForm />
        </BrowserRouter>
      </Provider>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <UserForm />
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
          <UserForm />
        </BrowserRouter>
      </Provider>
    );
    const username = screen.getByLabelText("Username");
    const password = screen.getByLabelText("Password");
    const firstName = screen.getByLabelText("First Name");
    const lastName = screen.getByLabelText("Last Name");
    const email = screen.getByLabelText("Email");
    const registerButton = screen.getByTestId("registerButton");
    const cancelButton = screen.getByTestId("cancelButton");
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(registerButton).toHaveTextContent("Register");
    expect(cancelButton).toHaveTextContent("Cancel");
  });
});
