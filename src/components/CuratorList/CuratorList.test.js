import React from "react";
import ReactDOM from "react-dom";
import CuratorList from "./CuratorList";

describe("CuratorList Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<CuratorList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
