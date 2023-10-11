/* eslint-disable testing-library/no-node-access */
import React from "react";
import VideoForm from "../../../components/Media/VideoForm";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import nock from "nock";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("test Video Form", () => {
  const initialState = {
    auth: {
      data: {
        id: "11",
      },
    },
    media: {
      photo: null,
      photos: [],
      video: null,
      videos: [],
      media: null,
      loading: false,
      error: null,
    },
  };
  const store = mockStore(initialState);
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
    const videoForm = screen.getByTestId("video-form");
    expect(videoLink).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(videoForm).toBeInTheDocument();
  });

  it("should submit the form", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .post("/api/videos")
      .reply(201, {
        video: {
          id: "video-1",
          userId: "testuser",
          link: "http://www.testlinks.com/video1.mp4",
          about: "test video about",
          createdAt: "fake created date",
        },
      });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <VideoForm />
        </BrowserRouter>
      </Provider>
    );
    expect(nock.pendingMocks().length).toBe(1);

    const videoLink = screen.getByLabelText(
      "Video Link - must be YouTube link"
    );
    const videoAbout = screen.getByLabelText("About");

    fireEvent.change(videoLink, {
      target: { value: "https://www.youtube.com/testvideo" },
    });
    fireEvent.change(videoAbout, { target: { value: "test video about" } });

    const videoForm = await screen.findByTestId("video-form");
    fireEvent.submit(videoForm);

    await waitFor(() => {
      expect(nock.isDone()).toBe(true);
    });
  });
});
