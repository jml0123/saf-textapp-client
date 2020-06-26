import React from "react";
import ReactDOM from "react-dom";
import EditMessage from "./EditMessage";
import { BrowserRouter as Router } from "react-router-dom";

const testProps = {
  state: {
    content: "Lorem ipsum",
    scheduled: "2020-06-20T03:54:32",
    activeUser: "user",
    demo: false,
  },
};
describe("EditMessage View", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <EditMessage location={testProps} />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});