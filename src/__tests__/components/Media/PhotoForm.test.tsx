/* eslint-disable testing-library/no-node-access */
import React from "react";
import PhotoForm from "../../../components/Media/PhotoForm";
import nock from "nock";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
describe("test Photo Form", () => {
  const initialState = {
    auth: {
      data: {
        id: "11",
      },
    },
    media: {
      photo: null,
      photos: [],
      video: null,
      videos: [],
      media: null,
      loading: false,
      error: null,
    },
  };
  const store = mockStore(initialState);
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

  it("should render a form", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PhotoForm />
        </BrowserRouter>
      </Provider>
    );
    const photoLink = screen.getByLabelText("Photo Link");
    const about = screen.getByLabelText("About");
    const photoForm = screen.getByTestId("photo-form");
    expect(photoLink).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(photoForm).toBeInTheDocument();
  });

  it("should submit the form", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .post("/api/photos")
      .reply(201, {
        photo: {
          id: "photo-1",
          userId: "testuser",
          link: "https://www.testlinks.com/image.jpg",
          about: "test photo about",
          createdAt: "test created date",
        },
      });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PhotoForm />
        </BrowserRouter>
      </Provider>
    );
    expect(nock.pendingMocks().length).toBe(1);

    const photoLink = screen.getByLabelText("Photo Link");
    const photoAbout = screen.getByLabelText("About");

    fireEvent.change(photoLink, {
      target: { value: "https://www.testlinks.com/image2.jpg" },
    });
    fireEvent.change(photoAbout, { target: { value: "test photo about" } });

    const photoForm = await screen.findByTestId("photo-form");
    fireEvent.submit(photoForm);

    await waitFor(() => {
      expect(nock.isDone()).toBe(true);
    });
  });
});
