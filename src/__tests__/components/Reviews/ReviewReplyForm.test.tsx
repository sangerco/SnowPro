/* eslint-disable testing-library/no-node-access */
import React from "react";
import ReviewReplyForm from "../../../components/Reviews/ReviewReplyForm";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock, { pendingMocks } from "nock";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("test Review Reply Form", () => {
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
          <ReviewReplyForm
            reviewId={"review-1"}
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

  it("should render a form", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .post("/api/reviews/review-1/reply", {
        reviewId: "review-1",
      })
      .reply(201, {
        reply: {
          id: "review-reply-1",
          userId: "11",
          username: "testuser",
          reviewId: "review-1",
          skiAreaSlug: "ski-area-1",
          body: "test review reply body",
          createdAt: "fake created date",
        },
      });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewReplyForm
            reviewId={"review-1"}
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
    await waitFor(() => {
      const reviewReplyForm = screen.getByTestId("review-reply-form");
      expect(reviewReplyForm).toBeInTheDocument();
    });
    await waitFor(() => {
      const body = screen.getByPlaceholderText("Reply to this review");
      expect(body).toBeInTheDocument();
    });
    await waitFor(() => {
      const button = screen.getByTestId("submit-button");
      expect(button).toBeInTheDocument();
    });
  });

  it("should submit the form", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .post("/api/reviews/review-1/reply", {
        reviewId: "review-1",
      })
      .reply(201, {
        reply: {
          id: "review-reply-1",
          userId: "11",
          username: "testuser",
          reviewId: "review-1",
          skiAreaSlug: "ski-area-1",
          body: "test review reply body",
          createdAt: "fake created date",
        },
      });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewReplyForm
            reviewId={"review-1"}
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

    expect(nock.pendingMocks().length).toBe(1);

    await waitFor(() => {
      const button = screen.getByTestId("submit-button");
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.click(button);
    });
  });
});
