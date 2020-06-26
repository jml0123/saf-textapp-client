import React from "react";
import ReactDOM from "react-dom";
import PopUpModal from "./PopUpModal";

describe("PopUpModal Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<PopUpModal />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
