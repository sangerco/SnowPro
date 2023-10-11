/* eslint-disable testing-library/no-node-access */
import React from "react";
import {
  render,
  fireEvent,
  screen,
  findByTestId,
  waitFor,
} from "@testing-library/react";
import nock from "nock";
import LoginForm from "../../../components/Auth/LoginForm";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";

describe("test LoginForm", () => {
  it("renders without crashing", () => {
    <Provider store={store}>
      <LoginForm />
    </Provider>;
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should contain a form", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );
    const username = screen.getByTestId("username-input");
    const password = screen.getByTestId("password-input");
    expect(username).toHaveTextContent("Username:");
    expect(password).toHaveTextContent("Password:");
  });

  it("should submit the form", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .post("/login")
      .reply(200, {
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
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get("/ski-areas/reviews")
      .reply(200, []);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    expect(nock.pendingMocks().length).toBe(3);

    const username = screen.getByPlaceholderText("Username");
    const password = screen.getByPlaceholderText("Password");

    fireEvent.change(username, { target: { value: "testuser" } });
    fireEvent.change(password, { target: { value: "testpassword" } });

    const loginForm = await screen.findByTestId("login-form");
    fireEvent.submit(loginForm);

    await waitFor(() => {
      expect(nock.isDone()).toBe(true);
    });
  });
});
