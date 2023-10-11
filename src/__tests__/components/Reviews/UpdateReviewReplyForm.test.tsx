/* eslint-disable testing-library/no-node-access */
import React from "react";
import UpdateReviewReplyForm from "../../../components/Reviews/UpdateReviewReplyForm";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock, { pendingMocks } from "nock";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("test Update Review Reply Form", () => {
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
          createdAt: "fake created Date",
          replies: [],
        },
        {
          id: "review-2",
          userId: "22",
          username: "testuser2",
          skiAreaSlug: "ski-area-2",
          skiAreaName: "Ski Area 2",
          header: "test review",
          body: "test review body",
          stars: 2,
          photos: [],
          createdAt: "fake created Date",
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
    skiAreas: {
      skiArea: {
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
          <UpdateReviewReplyForm />
        </BrowserRouter>
      </Provider>
    );
  });
  it("should match snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <UpdateReviewReplyForm />
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

describe("test updating review reply", () => {
  const reviewReplyId = "review-reply-1";
  const useParamsMock = jest.requireMock("react-router-dom")
    .useParams as jest.Mock;
  useParamsMock.mockReturnValue({ reviewReplyId });
  const initialState = {
    auth: {
      data: {
        id: "11",
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
        createdAt: "fake created Date",
        replies: [],
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
          createdAt: "fake created Date",
          replies: [],
        },
        {
          id: "review-2",
          userId: "22",
          username: "testuser2",
          skiAreaSlug: "ski-area-2",
          skiAreaName: "Ski Area 2",
          header: "test review",
          body: "test review body",
          stars: 2,
          photos: [],
          createdAt: "fake created Date",
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
    skiAreas: {
      skiArea: {
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
  it("should render the form", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .patch(`/api/reviews/reply/review-reply-1`, {
        id: "review-reply-1",
      })
      .reply(200, {
        reply: {
          id: "review-reply-1",
          reviewId: "review-1",
          userId: "22",
          username: "testuser2",
          body: "test review reply body update",
          slug: "ski-area-1",
          createdAt: "fake created date",
        },
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
          <UpdateReviewReplyForm />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const updateReviewReplyForm = screen.getByTestId(
        "update-review-reply-form"
      );
      expect(updateReviewReplyForm).toBeInTheDocument();
    });

    await waitFor(() => {
      const reviewReplyBody = screen.getAllByPlaceholderText(
        "Reply to this review"
      );
      expect(reviewReplyBody[0]).toBeInTheDocument();
    });

    await waitFor(() => {
      const submitButton = screen.getByTestId("submit-button");
      expect(submitButton).toBeInTheDocument();
    });
  });
  it("should submit the form", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .patch(`/api/reviews/reply/review-reply-1`, {
        id: "review-reply-1",
      })
      .reply(200, {
        reply: {
          id: "review-reply-1",
          reviewId: "review-1",
          userId: "22",
          username: "testuser2",
          body: "test review reply body update",
          slug: "ski-area-1",
          createdAt: "fake created date",
        },
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
          <UpdateReviewReplyForm />
        </BrowserRouter>
      </Provider>
    );

    expect(pendingMocks().length).toBe(3);

    await waitFor(() => {
      const form = screen.getByTestId("update-review-reply-form");
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.submit(form);
    });
  });
});
