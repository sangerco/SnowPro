/* eslint-disable testing-library/no-node-access */
import React from "react";
import UserPhotos from "../../../components/Media/UserPhotos";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("test User Photos", () => {
  const store = mockStore({
    auth: {
      data: {
        id: "11",
      },
    },
    media: {
      photos: [
        {
          userId: "11",
          username: "testuser",
          id: "photo-1",
          link: "https://www.testlinks.com/image-1.jpg",
          about: "test about photo",
          createdAt: "fake created date",
        },
        {
          userId: "11",
          username: "testuser",
          id: "photo-2",
          link: "https://www.testlinks.com/image-2.jpg",
          about: "test about photo",
          createdAt: "fake created date",
        },
      ],
    },
  });
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserPhotos />
        </BrowserRouter>
      </Provider>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <UserPhotos />
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

describe("testing photo views", () => {
  it(`show a user's photos`, async () => {
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
        photos: [
          {
            userId: "11",
            username: "testuser",
            id: "photo-1",
            link: "https://www.testlinks.com/image-1.jpg",
            about: "test about photo",
            createdAt: "fake created date",
          },
          {
            userId: "11",
            username: "testuser",
            id: "photo-2",
            link: "https://www.testlinks.com/image-2.jpg",
            about: "test about photo",
            createdAt: "fake created date",
          },
        ],
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserPhotos />
        </BrowserRouter>
      </Provider>
    );

    // @ts-ignore
    const photos = store.getState((state) => state.media.photos);
    // @ts-ignore
    expect(photos.media.photos.length).toBe(2);
  });
});
