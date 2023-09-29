/* eslint-disable testing-library/no-node-access */
import React from "react";
import MyPage from "../../../components/Home/MyPage";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";

describe("Test My Page", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MyPage />
        </BrowserRouter>
      </Provider>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MyPage />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
