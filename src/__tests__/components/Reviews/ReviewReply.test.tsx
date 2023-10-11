/* eslint-disable testing-library/no-node-access */
import React from "react";
import ReviewReply from "../../../components/Reviews/ReviewReply";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock, { pendingMocks } from "nock";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("test Review Reply", () => {
  const initialState = {
    auth: {
      data: {
        id: "11",
      },
    },
    reviews: {
      reviews: [
        {
          id: "review-1",
          userId: "11",
          username: "testuser",
          skiAreaSlug: "ski-area-1",
          skiAreaName: "Ski Area 1",
          header: "test review",
          body: "test review body",
          stars: 5,
          photos: [],
          createdAt: "fake created date",
          replies: ["review-reply-1"],
        },
        {
          id: "review-2",
          userId: "22",
          username: "testuser2",
          skiAreaSlug: "ski-area-2",
          skiAreaName: "Ski Area 2",
          header: "test review 2",
          body: "test review body 2",
          stars: 1,
          photos: [],
          createdAt: "fake created date",
          replies: [],
        },
      ],
    },
    reviewReplies: {
      reviewReply: {
        id: "review-reply-1",
        reviewId: "review-1",
        userId: "22",
        username: "testuser2",
        body: "test review reply body",
        slug: "ski-area-1",
        createdAt: "fake created date",
      },
    },
    users: {
      users: [
        {
          userId: "22",
          username: "testuser2",
        },
        {
          userId: "33",
          username: "testuser3",
        },
      ],
    },
    skiAreas: {
      skiAreas: [
        {
          slug: "ski-area-1",
          name: "Ski Area 1",
          country: "US",
          region: "CO",
          href: "www.fakehref.com",
          location: {
            latitude: 0,
            longitude: 0,
          },
          lifts: {},
          twitter: {},
        },
        {
          slug: "ski-area-1",
          name: "Ski Area 1",
          country: "US",
          region: "CO",
          href: "www.fakehref.com",
          location: {
            latitude: 0,
            longitude: 0,
          },
          lifts: {},
          twitter: {},
        },
      ],
    },
  };
  const store = mockStore(initialState);
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewReply />
        </BrowserRouter>
      </Provider>
    );
  });
  it("should match snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewReply />
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

describe("test review reply view", () => {
  const id = "review-reply-1";
  const useParamsMock = jest.requireMock("react-router-dom")
    .useParams as jest.Mock;
  useParamsMock.mockReturnValue({ id });
  const initialState = {
    auth: {
      data: {
        id: "22",
      },
    },
    reviews: {
      review: {
        id: "review-1",
        userId: "11",
        username: "testuser",
        skiAreaSlug: "ski-area-1",
        skiAreaName: "Ski Area 1",
        header: "test review",
        body: "test review body",
        stars: 5,
        photos: [],
        createdAt: "fake created date",
        replies: ["review-reply-1"],
      },
      reviews: [
        {
          id: "review-1",
          userId: "11",
          username: "testuser",
          skiAreaSlug: "ski-area-1",
          skiAreaName: "Ski Area 1",
          header: "test review",
          body: "test review body",
          stars: 5,
          photos: [],
          createdAt: "fake created date",
          replies: ["review-reply-1"],
        },
        {
          id: "review-2",
          userId: "22",
          username: "testuser2",
          skiAreaSlug: "ski-area-2",
          skiAreaName: "Ski Area 2",
          header: "test review 2",
          body: "test review body 2",
          stars: 1,
          photos: [],
          createdAt: "fake created date",
          replies: [],
        },
      ],
    },
    reviewReplies: {
      reviewReply: {
        id: "review-reply-1",
        reviewId: "review-1",
        userId: "22",
        username: "testuser2",
        body: "test review reply body",
        slug: "ski-area-1",
        createdAt: "fake created date",
      },
    },
    users: {
      users: [
        {
          userId: "22",
          username: "testuser2",
        },
        {
          userId: "33",
          username: "testuser3",
        },
      ],
    },
    skiAreas: {
      skiAreas: [
        {
          slug: "ski-area-1",
          name: "Ski Area 1",
          country: "US",
          region: "CO",
          href: "www.fakehref.com",
          location: {
            latitude: 0,
            longitude: 0,
          },
          lifts: {},
          twitter: {},
        },
        {
          slug: "ski-area-1",
          name: "Ski Area 1",
          country: "US",
          region: "CO",
          href: "www.fakehref.com",
          location: {
            latitude: 0,
            longitude: 0,
          },
          lifts: {},
          twitter: {},
        },
      ],
    },
  };
  const store = mockStore(initialState);
  it("should display a review reply", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get("/ski-areas/reviews/replies/review-reply-1")
      .reply(200, {
        id: "review-reply-1",
        reviewId: "review-1",
        userId: "22",
        username: "testuser2",
        body: "test review reply body",
        slug: "ski-area-1",
        createdAt: "fake created date",
      });
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get(`/ski-areas/reviews/review-1`)
      .reply(200, {
        id: "review-1",
        userId: "11",
        username: "testuser",
        skiAreaSlug: "ski-area-1",
        skiAreaName: "Ski Area 1",
        header: "test review",
        body: "test review body",
        stars: 5,
        photos: [],
        createdAt: "fake created date",
        replies: [],
      });
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get("/ski-areas")
      .reply(200, []);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewReply />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const reviewReply = screen.getByTestId("review-reply");
      expect(reviewReply).toBeInTheDocument();
    });

    await waitFor(() => {
      const buttons = screen.getByTestId("buttons");
      expect(buttons).toBeInTheDocument();
    });
  });

  it("should display a modal", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get("/ski-areas/reviews/replies/review-reply-1")
      .reply(200, {
        id: "review-reply-1",
        reviewId: "review-1",
        userId: "22",
        username: "testuser2",
        body: "test review reply body",
        slug: "ski-area-1",
        createdAt: "fake created date",
      });
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get(`/ski-areas/reviews/review-1`)
      .reply(200, {
        id: "review-1",
        userId: "11",
        username: "testuser",
        skiAreaSlug: "ski-area-1",
        skiAreaName: "Ski Area 1",
        header: "test review",
        body: "test review body",
        stars: 5,
        photos: [],
        createdAt: "fake created date",
        replies: [],
      });
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get("/ski-areas")
      .reply(200, []);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewReply />
        </BrowserRouter>
      </Provider>
    );

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const modal = screen.getByTestId("delete-modal");
      expect(modal).toBeInTheDocument();
    });
  });
});
