/* eslint-disable testing-library/no-node-access */
import React from "react";
import MessageReply from "../../../components/Messages/MessageReply";
import { screen, fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../redux/store";
import nock from "nock";

describe("test Message Reply", () => {
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MessageReply />
        </BrowserRouter>
      </Provider>
    );
  });

  it("should match the snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MessageReply />
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

describe("testing message reply view", () => {
  const id = "message-reply-1";
  const useParamsMock = jest.requireMock("react-router-dom")
    .useParams as jest.Mock;
  useParamsMock.mockReturnValue({ id });
  it("should show a message reply", async () => {
    nock("http://localhost:5000")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
      })
      .get(`/messages/replies/${id}`)
      .reply(200, {
        reply: {
          id: "message-reply-1",
          messageId: "message-1",
          senderId: "11",
          recipientId: "22",
          subject: "test message reply",
          body: "test message reply body",
          createdAt: "fake created date",
          isRead: "false",
          senderUsername: "testuser",
          senderFirstName: "Test",
          senderLastName: "User",
          recipientUsername: "testuser2",
          recipientFirstName: "Test",
          recipientLastName: "User2",
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
          <MessageReply />
        </BrowserRouter>
      </Provider>
    );

    expect(nock.pendingMocks().length).toEqual(2);

    await waitFor(() => {
      const message = screen.getByTestId("reply");
      expect(message).toBeInTheDocument();
    });

    await waitFor(() => {
      const deleteButton = screen.getByTestId("reply-body");
      expect(deleteButton).toBeInTheDocument();
    });

    await waitFor(() => {
      const replyButton = screen.getByTestId("delete-button");
      expect(replyButton).toBeInTheDocument();
    });
  });
});
