import React, { Component } from "react";
import { useState } from 'react';
import "./Votecard.css";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Votecard = (props) => {

  const [count, setCount] = useState(getRandomInt(10));

  // constructor(props) {
  //   super(props);
  //   this.image = props.image;
  //   this.title = props.title;
  //   this.subtitle = props.subtitle;
  //   this.count = props.count;
  //   this.options = props.options;
  //   this.targetCount = props.targetCount;
  //
  //   this.state = {
  //     count: props.count
  //   };
  //
  // }

  // render() {




    return (
        <div className="voteCard">
          <img src={props.image} className="topVoteImg"/>
          <div className="rightPart">

            <div className="topCard">
              <span className="cardTitle"> {props.title} </span>
              <span className="cardSubtitle"> {props.subtitle} </span>
            </div>

            <div className="bottomCard">
              <div className="progressBar">
                <span className="progressTitle"> Progress </span>
                <span className="progressCount"> {String(count) + "/" + String(props.targetCount)} </span>
                <div className="progressSection" style={{width: String(count/props.targetCount * 100) + "%"}}></div>
              </div>

              <div className="btnContainer">
                {props.options.map(opt => <div className="btn" key={props.title + opt} onClick={() => {setCount(count + 1); console.log(props.state);}}> <span className="btnText"> {opt} </span> </div>)}
              </div>
            </div>

          </div>
        </div>
    );
  // }
}

export default Votecard;
