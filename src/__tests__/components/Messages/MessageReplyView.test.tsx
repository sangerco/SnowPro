/* eslint-disable testing-library/no-node-access */
import React from "react";
import MessageReplyView from "../../../components/Messages/MessageReplyView";
import { render, screen, fireEvent } from "@testing-library/react";
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
});
