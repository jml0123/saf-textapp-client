import React from "react";
import ReactDOM from "react-dom";
import ProfileView from "./ProfileView";
import { BrowserRouter as Router } from "react-router-dom";

const testProp = {
  params: {
    id: 1,
  },
};
describe("ProfileView Page", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <ProfileView match={testProp} />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
