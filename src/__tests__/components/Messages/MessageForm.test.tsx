/* eslint-disable testing-library/no-node-access */
import React from "react";
import MessageForm from "../../../components/Messages/MessageForm";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock, { pendingMocks } from "nock";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("test Message Form", () => {
  const initialState = {
    auth: {
      data: {
        id: "11",
      },
    },
    message: {
      message: null,
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
          <MessageForm />
        </BrowserRouter>
      </Provider>
    );
  });
  it("should match snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MessageForm />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should submit the form", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .post("/api/new-message")
      .reply(201, {
        message: {
          id: "message-1",
          senderId: "testuser",
          recipientId: "testuser2",
          subject: "test message subject",
          body: "test message body",
          isRead: "false",
          createdAt: "fake created date",
        },
      });
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
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
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MessageForm />
        </BrowserRouter>
      </Provider>
    );

    expect(pendingMocks().length).toBe(2);

    const subject = screen.getByPlaceholderText("Whatcha talking about?");
    fireEvent.change(subject, { target: { value: "test subject" } });

    const body = screen.getByPlaceholderText("Message");
    fireEvent.change(body, { target: { value: "test message body" } });

    const messageForm = await screen.findByTestId("message-form");
    fireEvent.submit(messageForm);

    await waitFor(() => {
      expect(nock.isDone()).toBe(true);
    });
  });
});
