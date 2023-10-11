/* eslint-disable testing-library/no-node-access */
import React from "react";
import UserPage from "../../../components/Users/UserPage";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("test User Page", () => {
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
          <UserPage />
        </BrowserRouter>
      </Provider>
    );
  });
  it("should match snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <UserPage />
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

describe("test show user", () => {
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

  it("should display a user", async () => {
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
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserPage />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const username = screen.getByTestId("user-header");
      expect(username).toBeInTheDocument();
    });

    await waitFor(() => {
      const name = screen.getByTestId("user-name");
      expect(name).toBeInTheDocument();
    });
  });

  it("should delete button and delete modal", async () => {
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
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserPage />
        </BrowserRouter>
      </Provider>
    );

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const modal = screen.getByTestId("delete-modal");
      expect(modal).toBeInTheDocument();
    });
  });
});
