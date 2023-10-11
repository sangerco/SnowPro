/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import UserForm from "../../../components/Auth/UserForm";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";
import nock from "nock";

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
  it("should submit the form", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .post("/api/new-user")
      .reply(201, {
        token: "faketoken",
        user: {
          username: "testuser",
          password: "password",
          firstName: "Test",
          lastName: "User",
          email: "test@user.com",
        },
      });
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get("/ski-areas")
      .reply(200, []);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserForm />
        </BrowserRouter>
      </Provider>
    );
    expect(nock.pendingMocks().length).toBe(2);

    const username = screen.getByLabelText("Username");
    const password = screen.getByLabelText("Password");
    const firstName = screen.getByLabelText("First Name");
    const lastName = screen.getByLabelText("Last Name");
    const email = screen.getByLabelText("Email");

    fireEvent.change(username, { target: { value: "testuser" } });
    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.change(firstName, { target: { value: "Test" } });
    fireEvent.change(lastName, { target: { value: "User" } });
    fireEvent.change(email, { target: { value: "test@user.com" } });

    const userForm = await screen.findByTestId("user-form");
    fireEvent.submit(userForm);

    await waitFor(() => {
      expect(nock.isDone()).toBe(true);
    });
  });
});
