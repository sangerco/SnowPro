/* eslint-disable testing-library/no-node-access */
import React from "react";
import VideoView from "../../../components/Media/VideoView";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";
import nock from "nock";

const propId = "fakeVideoId";

describe("test Video View", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <VideoView id={propId} />
        </BrowserRouter>
      </Provider>
    );
  });

  it("matches a snapshot", async () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <VideoView id={propId} />
        </BrowserRouter>
      </Provider>
    );
    await expect(asFragment()).toMatchSnapshot();
  });
  it("renders a video", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get("/video/video-1")
      .reply(200, {
        video: {
          id: "video-1",
          userId: "testuser-1",
          username: "testuser",
          link: "https://www.youtube.com/v=fakevideo",
          about: "test video about",
          createdAt: "fake created date",
        },
      });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <VideoView id={"video-1"} />
        </BrowserRouter>
      </Provider>
    );

    expect(nock.pendingMocks().length).toBe(1);

    await waitFor(() => {
      const video = screen.getByTestId("video");
      expect(video).toBeInTheDocument();
    });
    await waitFor(() => {
      const videoAbout = screen.getByTestId("video-about");
      expect(videoAbout).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(nock.isDone()).toBe(true);
    });
  });
});
