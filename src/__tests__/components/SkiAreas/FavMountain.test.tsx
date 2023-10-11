/* eslint-disable testing-library/no-node-access */
import React from "react";
import FavMountain from "../../../components/SkiAreas/FavMountain";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock, { pendingMocks } from "nock";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("test FavMountain", () => {
  const initialState = {
    auth: {
      data: {
        id: "11",
        username: "testuser",
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
          <FavMountain slug={"ski-area-1"} username={"testuser"} />
        </BrowserRouter>
      </Provider>
    );
  });
  it("should match snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <FavMountain slug={"ski-area-1"} username={"testuser"} />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should show a favorite mountain", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FavMountain slug={"ski-area-1"} username={"testuser"} />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const header = screen.getByTestId("fm-header");
      expect(header).toBeInTheDocument();
    });
  });
  it("should show the delete modal", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FavMountain slug={"ski-area-1"} username={"testuser"} />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const button = screen.getByTestId("delete-button");
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.click(button);
    });

    await waitFor(() => {
      const modal = screen.getByTestId("delete-modal");
      expect(modal).toBeInTheDocument();
    });
  });
});
