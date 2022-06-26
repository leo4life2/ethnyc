import React, { Component } from "react";
import "./Create.css";
import logo from "./assets/img/Logo.svg";
import icon from "./assets/img/icon.png";
import plus from "./assets/img/Plus.svg";
import create from "./assets/img/createButton.svg"

class Create extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <div className="navbar">
          <a href="/">
            <div className="logoBox">
              <img src={logo} alt="Logo"/>
              <img src={icon} className="icon"/>
            </div>
          </a>
        </div>

        <div className="container">

          <div className="left">
            <div className="textContainer">
              <span className="textTitle"> Submit a new vote </span>
              <span className="textSubtitle"> Describe the purpose of your vote </span>
            </div>

            <div className="uploadBox">
              <img src={plus}/>
              <span className="uploadText"> Upload image </span>
            </div>
          </div>

          <div className="right">
            <div className="inputContainer">

              <div className="inputBox">
                <span className="inputTitle"> Title </span>
                <input type="text" id="title" className="textFieldBox"/>
              </div>

              <div className="inputBox">
                <span className="inputTitle"> Desired number of votes </span>
                <input type="text" id="number" className="textFieldBox"/>
              </div>

              <div className="descriptionInputBox">
                <span className="inputTitle"> Description </span>
                <input type="text" id="number" className="descriptionBox"/>
              </div>

            </div>

            <img src={create} className="createButton"/>

          </div>

        </div>


      </div>
    );
  }
}

export default Create;
