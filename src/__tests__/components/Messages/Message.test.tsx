/* eslint-disable testing-library/no-node-access */
import React from "react";
import Message from "../../../components/Messages/Message";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";
import nock from "nock";

describe("test Message", () => {
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Message />
        </BrowserRouter>
      </Provider>
    );
  });

  it("matches a snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Message />
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

describe("testing message view", () => {
  const id = "message-1";
  const useParamsMock = jest.requireMock("react-router-dom")
    .useParams as jest.Mock;
  useParamsMock.mockReturnValue({ id });
  it("should show a message", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get(`/messages/${id}`)
      .reply(200, {
        message: {
          id: "message-1",
          senderId: "testuser",
          recipientId: "testuser2",
          subject: "test message",
          body: "test message body",
          createdAt: new Date(),
          isRead: false,
          senderUsername: "testuser",
          senderFirstName: "Test",
          senderLastName: "User",
          recipientUsername: "testuser2",
          recipientFirstName: "Test",
          recipientLastName: "User2",
          replies: [],
        },
      });
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get("/ski-areas")
      .reply(200, []);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Message />
        </BrowserRouter>
      </Provider>
    );

    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();

    expect(nock.pendingMocks().length).toEqual(2);

    await waitFor(() => {
      const message = screen.getByTestId("message");
      expect(message).toBeInTheDocument();
    });

    await waitFor(() => {
      const deleteButton = screen.getByTestId("delete-button");
      expect(deleteButton).toBeInTheDocument();
    });

    await waitFor(() => {
      const replyButton = screen.getByTestId("reply-button");
      expect(replyButton).toBeInTheDocument();
    });
  });

  it("should display the delete modal", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get(`/messages/${id}`)
      .reply(200, {
        message: {
          id: "message-1",
          senderId: "testuser",
          recipientId: "testuser2",
          subject: "test message",
          body: "test message body",
          createdAt: new Date(),
          isRead: false,
          senderUsername: "testuser",
          senderFirstName: "Test",
          senderLastName: "User",
          recipientUsername: "testuser2",
          recipientFirstName: "Test",
          recipientLastName: "User2",
          replies: [],
        },
      });
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get("/ski-areas")
      .reply(200, []);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Message />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const deleteButton = screen.getByTestId("delete-button");
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      const deleteModal = screen.getByTestId("delete-modal");
      expect(deleteModal).toBeInTheDocument();
    });
  });
});
