/* eslint-disable testing-library/no-node-access */
import React from "react";
import MessageReplyForm from "../../../components/Messages/MessageReplyForm";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock, { pendingMocks } from "nock";
import { BrowserRouter } from "react-router-dom";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("test Message Reply Form", () => {
  const initialState = {
    auth: {
      data: {
        id: "11",
      },
    },
    messages: {
      message: {
        id: "message-1",
        senderId: "11",
        recipientId: "22",
        subject: "test message",
        body: "test message body",
        isRead: "false",
        createdAt: "fake created date",
        senderUsername: "testuser",
        senderFirstName: "Test",
        senderLastName: "User",
        recipientUsername: "testuser2",
        recipientFirstName: "Test",
        recipientLastName: "User2",
        replies: [],
      },
      messages: null,
      sentMessages: null,
      loading: false,
      error: null,
    },
    users: {
      users: [
        {
          userId: "22",
          username: "testuser2",
        },
        {
          userId: "33",
          username: "testuser3",
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
  };
  const store = mockStore(initialState);
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MessageReplyForm />
        </BrowserRouter>
      </Provider>
    );
  });
  it("should match snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MessageReplyForm />
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

describe("test create message reply", () => {
  const messageId = "message-1";
  const useParamsMock = jest.requireMock("react-router-dom")
    .useParams as jest.Mock;
  useParamsMock.mockReturnValue({ messageId });
  const initialState = {
    auth: {
      data: {
        id: "11",
      },
    },
    messages: {
      message: {
        id: "message-1",
        senderId: "11",
        recipientId: "22",
        subject: "test message",
        body: "test message body",
        isRead: "false",
        createdAt: "fake created date",
        senderUsername: "testuser",
        senderFirstName: "Test",
        senderLastName: "User",
        recipientUsername: "testuser2",
        recipientFirstName: "Test",
        recipientLastName: "User2",
        replies: [],
      },
      messages: null,
      sentMessages: null,
      loading: false,
      error: null,
    },
    users: {
      users: [
        {
          userId: "22",
          username: "testuser2",
        },
        {
          userId: "33",
          username: "testuser3",
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
  };
  const store = mockStore(initialState);
  it("should submit the form", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .post(`/api/messages/message-1/reply`, {
        messageId: "message-1",
      })
      .reply(201, {
        reply: {
          id: "message-reply-1",
          messageId: "message-1",
          senderId: "11",
          recipientId: "22",
          subject: "test message reply",
          body: "test message reply body",
          isRead: "false",
          createdAt: "fake created date",
        },
      });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MessageReplyForm />
        </BrowserRouter>
      </Provider>
    );

    expect(pendingMocks().length).toBe(1);

    const subject = screen.getByPlaceholderText("Whatcha talking about?");
    fireEvent.change(subject, { target: { value: "test subject" } });

    const body = screen.getByPlaceholderText("Message");
    fireEvent.change(body, { target: { value: "test message reply body" } });

    const messageReplyForm = await screen.findByTestId("message-reply-form");
    fireEvent.submit(messageReplyForm);
  });
});
