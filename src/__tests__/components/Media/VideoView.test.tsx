/* eslint-disable testing-library/no-node-access */
import React from "react";
import VideoView from "../../../components/Media/VideoView";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";

const propId = "fakeVideoId";

describe("test Photo View", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <VideoView id={propId} />
        </BrowserRouter>
      </Provider>
    );
  });

  it("matches a snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <VideoView id={propId} />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
