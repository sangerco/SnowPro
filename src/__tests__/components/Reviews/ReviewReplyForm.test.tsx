/* eslint-disable testing-library/no-node-access */
import React from "react";
import ReviewReplyForm from "../../../components/Reviews/ReviewReplyForm";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";

describe("test Review Reply Form", () => {
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewReplyForm
            reviewId={"review1"}
            slug={"ski-area-1"}
            username={"testuser"}
            userId={"11"}
            closeModal={function (): void {
              throw new Error("Function not implemented.");
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
          <ReviewReplyForm
            reviewId={"review1"}
            slug={"ski-area-1"}
            username={"testuser"}
            userId={"11"}
            closeModal={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
