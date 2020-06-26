import React from "react";
import ReactDOM from "react-dom";
import NavBarDash from "./NavBarDash";
import { BrowserRouter as Router } from "react-router-dom";

const testProps = {
  user: {
    profile_img_link: "testImg",
  },
};

describe("NavBarDash Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <NavBarDash user={testProps} />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
