import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import nock from "nock";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";

import Home from "../../../components/Home/Home";

describe("test home component", () => {
  it("should render", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders loader", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });
  it("should render ski area data and review data", async () => {
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
          <Home />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const skiAreaCard = screen.getByTestId("ski-area-card");
      expect(skiAreaCard).toBeInTheDocument();
    });

    await waitFor(() => {
      const reviewCard = screen.getByTestId("review-card");
      expect(reviewCard).toBeInTheDocument();
    });
  });
});
