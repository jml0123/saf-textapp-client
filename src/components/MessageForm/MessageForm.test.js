import React from "react";
import ReactDOM from "react-dom";
import MessageForm from "./MessageForm";
import { BrowserRouter as Router } from "react-router-dom";

describe("MessageForm Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <MessageForm />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
