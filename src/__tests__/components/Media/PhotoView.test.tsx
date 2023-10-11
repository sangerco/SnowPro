/* eslint-disable testing-library/no-node-access */
import React from "react";
import PhotoView from "../../../components/Media/PhotoView";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";
import nock from "nock";

const propId = "fakePhotoId";

describe("test Photo View", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PhotoView id={propId} />
        </BrowserRouter>
      </Provider>
    );
  });

  it("matches a snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <PhotoView id={propId} />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders a photo", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get("/photo/photo-1")
      .reply(200, {
        photo: {
          id: "photo-1",
          userId: "testuser-1",
          username: "testuser",
          link: "https://www.testlinks.com/image1.jpg",
          about: "test image about",
          createdAt: "fake created date",
        },
      });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PhotoView id={"photo-1"} />
        </BrowserRouter>
      </Provider>
    );
    await waitFor(() => {
      const photo = screen.getByTestId("photo");
      expect(photo).toBeInTheDocument();
    });
    await waitFor(() => {
      const photoAbout = screen.getByTestId("photo-about");
      expect(photoAbout).toBeInTheDocument();
    });
  });
});
