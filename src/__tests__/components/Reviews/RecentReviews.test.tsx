/* eslint-disable testing-library/no-node-access */
import React from "react";
import RecentReviews from "../../../components/Reviews/RecentReviews";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import nock from "nock";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("test Recent Reviews", () => {
  const store = mockStore({
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
          replies: [],
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
  });
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RecentReviews />
        </BrowserRouter>
      </Provider>
    );
  });
  it("should match snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <RecentReviews />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should show reviews", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get("/ski-areas")
      .reply(200, [
        {
          slug: "vail",
          name: "Vail",
        },
        {
          slug: "arapahoe-basin",
          name: "Arapahoe Basin",
        },
      ]);
    nock("http://localhost:5000")
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get("/ski-areas/reviews")
      .reply(200, [
        {
          id: "review-1",
          header: "test review",
          skiAreaName: "test ski area",
          username: "testuser",
          stars: 5,
          createdAt: "12/11/22 12:22:22.00",
        },
        {
          id: "review-2",
          header: "test review 2",
          skiAreaName: "test ski area 2",
          username: "testuser2",
          stars: 1,
          createdAt: "12/12/22 12:22:22.00",
        },
      ]);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RecentReviews />
        </BrowserRouter>
      </Provider>
    );

    expect(nock.pendingMocks().length).toBe(2);

    await waitFor(() => {
      const review = screen.getAllByTestId("review");
      expect(review[0]).toBeInTheDocument();
    });

    await waitFor(() => {
      const review = screen.getAllByTestId("review");
      expect(review[1]).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(nock.isDone()).toBe(true);
    });
  });
});
