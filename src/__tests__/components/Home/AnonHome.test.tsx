/* eslint-disable testing-library/no-node-access */
import React from "react";
import AnonHome from "../../../components/Home/AnonHome";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";

describe("test Anon Home", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AnonHome />
        </BrowserRouter>
      </Provider>
    );
  });

  it("should contain links", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AnonHome />
        </BrowserRouter>
      </Provider>
    );
    const loginLink = screen.getByTestId("loginLink");
    const registerLink = screen.getByTestId("registerLink");
    const skiAreasLink = screen.getByTestId("skiAreasLink");
    expect(loginLink).toHaveTextContent("Log In");
    expect(registerLink).toHaveTextContent("Sign Up");
    expect(skiAreasLink).toHaveTextContent("Find Ski Areas");
  });

  it("link should go to login screen", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AnonHome />
        </BrowserRouter>
      </Provider>
    );
    const loginLink = screen.getByTestId("loginLink");

    fireEvent.click(loginLink);

    expect(global.window.location.pathname).toContain("/login");
  });

  it("link should go to register screen", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AnonHome />
        </BrowserRouter>
      </Provider>
    );
    const registerLink = screen.getByTestId("registerLink");

    fireEvent.click(registerLink);

    expect(global.window.location.pathname).toContain("/register");
  });

  it("link should go to ski areas screen", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AnonHome />
        </BrowserRouter>
      </Provider>
    );
    const skiAreasLink = screen.getByTestId("skiAreasLink");

    fireEvent.click(skiAreasLink);

    expect(global.window.location.pathname).toContain("/ski-areas");
  });
});
