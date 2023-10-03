/* eslint-disable testing-library/no-node-access */
import React from "react";
import User from "../../../components/Users/User";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";

describe("test User", () => {
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <User
            user={{
              id: "11",
              username: "testuser",
              firstName: "Test",
              lastName: "User",
              email: "test@user.com",
              bio: "test user bio",
              avatar: "https://testdata.com/testavatar.jpg",
              isAdmin: false,
            }}
          />
        </BrowserRouter>
      </Provider>
    );
  });
  it("should match snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <User
            user={{
              id: "11",
              username: "testuser",
              firstName: "Test",
              lastName: "User",
              email: "test@user.com",
              bio: "test user bio",
              avatar: "https://testdata.com/testavatar.jpg",
              isAdmin: false,
            }}
          />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
