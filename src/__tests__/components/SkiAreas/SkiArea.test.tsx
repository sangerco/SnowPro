/* eslint-disable testing-library/no-node-access */
import React from "react";
import SkiArea from "../../../components/SkiAreas/SkiArea";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";

describe("test Ski Area", () => {
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SkiArea
            slug={"ski-area-1"}
            name={"Test Ski Area"}
            country={"US"}
            region={"US"}
            lat={0}
            long={0}
            url={"https://testskiarea.com"}
          />
        </BrowserRouter>
      </Provider>
    );
  });
  it("should match snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SkiArea
            slug={"ski-area-1"}
            name={"Test Ski Area"}
            country={"US"}
            region={"US"}
            lat={0}
            long={0}
            url={"https://testskiarea.com"}
          />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
