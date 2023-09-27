import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

import Home from "../../../components/Home/Home";

describe("test home component", () => {
  it("should render", () => {
    render(<Home />);
  });
});
