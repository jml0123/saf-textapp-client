import React from "react";

import UnsubscribeForm from "../../components/UnsubscribeForm/UnsubscribeForm";
import GithubLogo from "../../assets/GithubLogo.png";

import "./Footer.css";

export default function Footer(props) {
  return (
    <footer>
      <div className="border-gradient">
        <a
          href="https://github.com/jml0123"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="content-row">
            <p>made with caffeine</p>
            <img src={GithubLogo} alt="github logo" className="icon" />
          </div>
        </a>
      </div>
      <div className="footer-container">
        <UnsubscribeForm />
      </div>
    </footer>
  );
}
