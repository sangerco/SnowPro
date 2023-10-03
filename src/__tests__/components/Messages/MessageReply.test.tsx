/* eslint-disable testing-library/no-node-access */
import React from "react";
import MessageReply from "../../../components/Messages/MessageReply";
import { screen, fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../redux/store";

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
