/* eslint-disable testing-library/no-node-access */
import React from "react";
import UpdateUserForm from "../../../components/Users/UpdateUserForm";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("test Update User Form", () => {
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
    reviewReplies: {
      reviewReply: {
        id: "review-reply-1",
        reviewId: "review-1",
        userId: "22",
        username: "testuser2",
        body: "test review reply body",
        slug: "ski-area-1",
        createdAt: "fake created date",
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
    users: {
      user: {
        id: "11",
        username: "testuser",
        firstName: "Test",
        lastName: "User",
        email: "test@user.com",
        bio: "test user bio",
        avatar: "https://testdata.com/testavatar.jpg",
        isAdmin: false,
        videos: [],
        photos: [],
        favMountains: [],
      },
      users: [
        {
          id: "11",
          username: "testuser",
          firstName: "Test",
          lastName: "User",
          email: "test@user.com",
          bio: "test user bio",
          avatar: "https://testdata.com/testavatar.jpg",
          isAdmin: false,
        },
        {
          id: "22",
          username: "testuser2",
          firstName: "Test",
          lastName: "User2",
          email: "test@user2.com",
          bio: "test user bio",
          avatar: "https://testdata.com/testavatar2.jpg",
          isAdmin: true,
        },
      ],
    },
  };
  const store = mockStore(initialState);
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UpdateUserForm />
        </BrowserRouter>
      </Provider>
    );
  });
  it("should match snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <UpdateUserForm />
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

describe("test user form", () => {
  const username = "testuser";
  const useParamsMock = jest.requireMock("react-router-dom")
    .useParams as jest.Mock;
  useParamsMock.mockReturnValue({ username });

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
    reviewReplies: {
      reviewReply: {
        id: "review-reply-1",
        reviewId: "review-1",
        userId: "22",
        username: "testuser2",
        body: "test review reply body",
        slug: "ski-area-1",
        createdAt: "fake created date",
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
    users: {
      user: {
        id: "11",
        username: "testuser",
        firstName: "Test",
        lastName: "User",
        email: "test@user.com",
        bio: "test user bio",
        avatar: "https://testdata.com/testavatar.jpg",
        isAdmin: false,
        videos: [],
        photos: [],
        favMountains: [],
      },
      users: [
        {
          id: "11",
          username: "testuser",
          firstName: "Test",
          lastName: "User",
          email: "test@user.com",
          bio: "test user bio",
          avatar: "https://testdata.com/testavatar.jpg",
          isAdmin: false,
        },
        {
          id: "22",
          username: "testuser2",
          firstName: "Test",
          lastName: "User2",
          email: "test@user2.com",
          bio: "test user bio",
          avatar: "https://testdata.com/testavatar2.jpg",
          isAdmin: true,
        },
      ],
    },
  };
  const store = mockStore(initialState);

  it("should render a form", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get(`/users/${username}`)
      .reply(200, {
        id: "11",
        username: "testuser",
        firstName: "Test",
        lastName: "User",
        email: "test@user.com",
        password: "password",
        avatar: "https://testlinks.com/testavatar.jpg",
        bio: "test user bio",
        isAdmin: "false",
        videos: [],
        photos: [],
        favMountains: [],
      });
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get("/ski-areas")
      .reply(200, []);
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .patch("/api/users/testuser")
      .reply(200, {
        id: "11",
        username: "testuser",
        firstName: "Test",
        lastName: "User",
        email: "test@user.com",
        password: "password",
        avatar: "https://testlinks.com/testavatar.jpg",
        bio: "updated test user bio",
        isAdmin: "false",
        videos: [],
        photos: [],
        favMountains: [],
      });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UpdateUserForm />
        </BrowserRouter>
      </Provider>
    );

    const form = screen.getByTestId("update-user-form");
    expect(form).toBeInTheDocument();

    const usernameField = screen.getByPlaceholderText("testuser");
    expect(usernameField).toBeInTheDocument();

    const firstNameField = screen.getByPlaceholderText("Test");
    expect(firstNameField).toBeInTheDocument();

    const button = screen.getByTestId("submit-button");
    expect(button).toBeInTheDocument();
  });
});
