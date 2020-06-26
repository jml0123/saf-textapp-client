import React, { Component } from "react";
import "./PopUpModal.css";

export default class PopUpModal extends Component {
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <>
        <div className="bg-dark-blur" />
        <div className="pop-up-wrapper">
          <div className="pop-up-container" ref={this.containerRef}>
            <button type="button" onClick={this.onClose} className="btn-cancel">
              X
            </button>
            <div className="content">{this.props.children}</div>
          </div>
        </div>
      </>
    );
  }
}
