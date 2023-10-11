/* eslint-disable testing-library/no-node-access */
import React from "react";
import MessageReplyView from "../../../components/Messages/MessageReplyView";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";

const messageReplyData = {
  id: "testId",
  messageId: "messageTestId",
  senderId: "11",
  recipientId: "22",
  subject: "test message reply",
  createdAt: new Date(),
  senderUsername: "testuser",
  senderFirstName: "Test",
  senderLastName: "User",
  body: " message reply test",
  recipientUsername: "testuser2",
  recipientFirstName: "Test",
  recipientLastName: "Name2",
};

describe("test Message Reply View", () => {
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MessageReplyView messageReply={messageReplyData} />
        </BrowserRouter>
      </Provider>
    );
  });

  it("should match snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MessageReplyView messageReply={messageReplyData} />
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should show a message reply view", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MessageReplyView messageReply={messageReplyData} />
        </BrowserRouter>
      </Provider>
    );

    const messageReply = screen.getByTestId("message-reply");
    expect(messageReply).toBeInTheDocument();

    const messageReplyBody = screen.getByTestId("message-reply-body");
    expect(messageReplyBody).toBeInTheDocument();

    const deleteButton = screen.getByTestId("delete-button");
    expect(deleteButton).toBeInTheDocument();
  });

  it("should display the delete modal", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MessageReplyView messageReply={messageReplyData} />
        </BrowserRouter>
      </Provider>
    );

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const deleteModal = screen.getByTestId("delete-modal");
      expect(deleteModal).toBeInTheDocument();
    });
  });
});
