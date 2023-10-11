/* eslint-disable testing-library/no-node-access */
import React from "react";
import ReviewForm from "../../../components/Reviews/ReviewForm";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock, { pendingMocks } from "nock";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("test Review Form", () => {
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
          <ReviewForm />
        </BrowserRouter>
      </Provider>
    );
  });
  it("should match snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewForm />
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

describe("test create review", () => {
  const skiAreaSlug = "ski-area-1";
  const useParamsMock = jest.requireMock("react-router-dom")
    .useParams as jest.Mock;
  useParamsMock.mockReturnValue({ skiAreaSlug });
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
      .post(`/api/ski-areas/ski-area-1/review`, {
        skiAreaSlug: "ski-area-1",
      })
      .reply(201, {
        review: {
          id: "review-3",
          userId: "33",
          skiAreaSlug: "ski-area-1",
          header: "test review",
          body: "test review body",
          stars: 3,
          createdAt: "fake created date",
        },
      });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewForm />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const reviewForm = screen.getByTestId("review-form");
      expect(reviewForm).toBeInTheDocument();
    });

    await waitFor(() => {
      const reviewBody = screen.getByPlaceholderText("How was it?");
      expect(reviewBody).toBeInTheDocument();
    });

    await waitFor(() => {
      const submitButton = screen.getByTestId("review-button");
      expect(submitButton).toBeInTheDocument();
    });
  });

  it("should submit the form", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .post(`/api/ski-areas/ski-area-1/review`, {
        skiAreaSlug: "ski-area-1",
      })
      .reply(201, {
        review: {
          id: "review-3",
          userId: "33",
          skiAreaSlug: "ski-area-1",
          header: "test review",
          body: "test review body",
          stars: 3,
          createdAt: "fake created date",
        },
      });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ReviewForm />
        </BrowserRouter>
      </Provider>
    );

    expect(pendingMocks().length).toBe(2);

    const body = screen.getByPlaceholderText("How was it?");
    fireEvent.change(body, { target: { value: "test review" } });

    const reviewForm = await screen.findByTestId("review-form");
    fireEvent.submit(reviewForm);
  });
});
