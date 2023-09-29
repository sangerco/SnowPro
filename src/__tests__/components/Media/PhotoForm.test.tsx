/* eslint-disable testing-library/no-node-access */
import React from "react";
import PhotoForm from "../../../components/Media/PhotoForm";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";

describe("test Photo Form", () => {
  it("renders with crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PhotoForm />
        </BrowserRouter>
      </Provider>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <PhotoForm />
        </BrowserRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render a form", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PhotoForm />
        </BrowserRouter>
      </Provider>
    );
    const photoLink = screen.getByLabelText("Photo Link");
    const about = screen.getByLabelText("About");
    expect(photoLink).toBeInTheDocument();
    expect(about).toBeInTheDocument();
  });
});
