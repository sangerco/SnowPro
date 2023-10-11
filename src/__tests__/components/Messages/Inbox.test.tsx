/* eslint-disable testing-library/no-node-access */
import React from "react";
import Inbox from "../../../components/Messages/Inbox";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";
import nock from "nock";

describe("test Inbox", () => {
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Inbox username={"test1"} />
        </BrowserRouter>
      </Provider>
    );
  });

  it("matches a snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Inbox username={"test1"} />
        </BrowserRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("shows messages", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({ "access-control-allow-headers": "*" })
      .get("/messages/users/testuser")
      .reply(200, {
        messages: [
          {
            id: "message-1",
            senderId: "testuser2",
            recipientId: "testuser",
            subject: "test message",
            body: "test message body",
            createdAt: "fake created date",
            isRead: true,
            senderUserName: "testuser2",
            senderFirstName: "Test",
            senderLastName: "User2",
            recipientUsername: "testuser",
            recipientFirstName: "Test",
            recipientLastName: "User",
          },
          {
            id: "message-2",
            senderId: "testuser2",
            recipientId: "testuser",
            subject: "test message 2",
            body: "test message body 2",
            createdAt: "fake created date",
            isRead: false,
            senderUserName: "testuser2",
            senderFirstName: "Test",
            senderLastName: "User2",
            recipientUsername: "testuser",
            recipientFirstName: "Test",
            recipientLastName: "User",
          },
        ],
      });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Inbox username={"testuser"} />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const messages = screen.getByTestId("messages");
      expect(messages).toBeInTheDocument();
    });

    await waitFor(() => {
      const recMessages = screen.getByTestId("received-messages");
      expect(recMessages).toBeInTheDocument();
    });
  });

  it("should show sent messages", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({ "access-control-allow-headers": "*" })
      .get("/messages/users/testuser/sent")
      .reply(200, {
        messages: [
          {
            id: "message-3",
            senderId: "testuser",
            recipientId: "testuser2",
            subject: "test message 3",
            body: "test message body 3",
            createdAt: "fake created date",
            isRead: true,
            senderUserName: "testuser",
            senderFirstName: "Test",
            senderLastName: "User",
            recipientUsername: "testuser2",
            recipientFirstName: "Test",
            recipientLastName: "User2",
          },
          {
            id: "message-4",
            senderId: "testuser",
            recipientId: "testuser2",
            subject: "test message 4",
            body: "test message body 4",
            createdAt: "fake created date",
            isRead: false,
            senderUserName: "testuser",
            senderFirstName: "Test",
            senderLastName: "User",
            recipientUsername: "testuser2",
            recipientFirstName: "Test",
            recipientLastName: "User2",
          },
        ],
      });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Inbox username={"testuser"} />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const sentMessagesButton = screen.getByTestId("sent-messages-button");
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.click(sentMessagesButton);
    });

    await waitFor(() => {
      const messages = screen.getByTestId("messages");
      expect(messages).toBeInTheDocument();
    });

    await waitFor(() => {
      const sentMessages = screen.getByTestId("sent-messages");
      expect(sentMessages).toBeInTheDocument();
    });
  });
});
