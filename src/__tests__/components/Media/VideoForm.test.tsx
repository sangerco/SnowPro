/* eslint-disable testing-library/no-node-access */
import React from "react";
import VideoForm from "../../../components/Media/VideoForm";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";

describe("test Video Form", () => {
  it("renders with crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <VideoForm />
        </BrowserRouter>
      </Provider>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <VideoForm />
        </BrowserRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render a form", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <VideoForm />
        </BrowserRouter>
      </Provider>
    );
    const videoLink = screen.getByLabelText(
      "Video Link - must be YouTube link"
    );
    const about = screen.getByLabelText("About");
    expect(videoLink).toBeInTheDocument();
    expect(about).toBeInTheDocument();
  });
});
