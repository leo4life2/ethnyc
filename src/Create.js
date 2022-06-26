import React, { Component } from "react";
import "./Create.css";
import logo from "./assets/img/Logo.svg"
import icon from "./assets/img/icon.png"

class Create extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <div className="logoBox">
            <img src={logo} alt="Logo"/>
            <img src={icon} className="icon"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
