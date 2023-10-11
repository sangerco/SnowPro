/* eslint-disable testing-library/no-node-access */
import React from "react";
import UserVideos from "../../../components/Media/UserVideos";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("test User Videos", () => {
  const store = mockStore({
    auth: {
      data: {
        id: "11",
      },
    },
    media: {
      videos: [
        {
          userId: "11",
          username: "testuser",
          id: "video-1",
          link: "https://www.youtube.com/v=fakevideo1",
          about: "test about video",
          createdAt: "fake created date",
        },
        {
          userId: "11",
          username: "testuser",
          id: "video-2",
          link: "https://www.youtube.com/v=fakevideo2",
          about: "test about video",
          createdAt: "fake created date",
        },
      ],
    },
  });
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserVideos />
        </BrowserRouter>
      </Provider>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <UserVideos />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("testing video views", () => {
  it(`show a user's videos`, async () => {
    const username = "testuser";
    const useParamsMock = jest.requireMock("react-router-dom")
      .useParams as jest.Mock;
    useParamsMock.mockReturnValue({ username });

    const store = mockStore({
      auth: {
        data: {
          id: "11",
        },
      },
      media: {
        videos: [
          {
            userId: "11",
            username: "testuser",
            id: "video-1",
            link: "https://www.youtube.com/v=fakevideo1",
            about: "test about video",
            createdAt: "fake created date",
          },
          {
            userId: "11",
            username: "testuser",
            id: "video-2",
            link: "https://www.youtube.com/v=fakevideo2",
            about: "test about video",
            createdAt: "fake created date",
          },
        ],
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserVideos />
        </BrowserRouter>
      </Provider>
    );

    // @ts-ignore
    const videos = store.getState((state) => state.media.videos);
    // @ts-ignore
    expect(videos.media.videos.length).toBe(2);
  });
});
