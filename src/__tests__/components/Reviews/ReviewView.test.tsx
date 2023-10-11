/* eslint-disable testing-library/no-node-access */
import React from "react";
import ReviewView from "../../../components/Reviews/ReviewView";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";

const testReview = {
  id: "review1",
  userId: "11",
  username: "testuser",
  skiAreaSlug: "skiArea1",
  skiAreaName: "Test Ski Area",
  header: "Test Review",
  body: "Test Review Body",
  stars: 3,
  photos: [],
  createdAt: new Date(),
  replies: [],
};

describe("test Review View", () => {
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewView review={testReview} />
        </BrowserRouter>
      </Provider>
    );
  });
  it("should match snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewView review={testReview} />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should contain the correct data", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewView review={testReview} />
        </BrowserRouter>
      </Provider>
    );

    const header = screen.getByTestId("review-header");
    // @ts-ignore
    expect(header.textContent).toEqual("Test Review");
  });
});
