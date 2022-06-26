import React, { Component } from "react";
import "./Create.css";
import logo from "./assets/img/Logo.svg";
import icon from "./assets/img/icon.png";
import plus from "./assets/img/Plus.svg";
import create from "./assets/img/createButton.svg"
import { FeedDAC, IdentityDAC, ProfileDAC, SocialDAC } from 'skynet-dacs-library';

const createPost = async ({
  image,
  title,
  subtitle,
  targetCount
}) => {

  const feedDAC = new FeedDAC();

  const post = {
    title,
    subtitle,
    ext: {
      count: "0",
      target: String(targetCount)
    }
  };

  console.log(post);

  let result;
  try {
    result = await feedDAC.createPost(post);
    console.log('Result: ', result);
  } catch (error) {
    console.error({ error });
  }
};

class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      title: "",
      subtitle: "",
      count: 0,
      targetCount: 0,
    }
  }

  _submitPost() {
    let image = this.state.image;
    let title = this.state.title;
    let subtitle = this.state.subtitle;
    let count = this.state.count;
    let targetCount = this.state.targetCount;
    createPost({
      image,
      title,
      subtitle,
      count,
      targetCount
    }).then(result =>{
      console.log("submit post done");
      console.log(result);
    });
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

            <input
              type="file"
              name="myImage"
              className="uploadBox"
              onChange={(event) => {
                console.log(event.target.files[0]);
                this.state.image = event.target.files[0];
              }}
            />
          </div>

          <form>

            <div className="right">
                <div className="inputContainer">
                  <div className="inputBox">
                    <span className="inputTitle"> Title </span>
                    <input type="text" id="title" className="textFieldBox" onChange={(event) => this.state.title = (event.target.value)}/>
                  </div>

                  <div className="inputBox">
                    <span className="inputTitle"> Desired number of votes </span>
                    <input type="text" id="number" className="textFieldBox" onChange={(event) => this.state.targetCount = (event.target.value)}/>
                  </div>

                  <div className="descriptionInputBox">
                    <span className="inputTitle"> Description </span>
                    <input type="text" id="number" className="descriptionBox" onChange={(event) => this.state.subtitle = (event.target.value)}/>
                  </div>

                </div>

              <input type="button" onClick={() => {console.log(this.state);this._submitPost()}} className="createButton"/>
            </div>
          </form>

        </div>


      </div>
    );
  }
}

export default Create;
