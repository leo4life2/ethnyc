import React, { Component } from "react";
import "./Votecard.css";

class Votecard extends Component {

  constructor(props) {
    super(props);
    this.image = props.image;
    this.title = props.title;
    this.subtitle = props.subtitle;
    this.count = props.count;
    this.options = props.options;
    this.targetCount = props.targetCount;
    this.state = {};
  }

  render() {
    return (
        <div className="voteCard">
          <img src={this.image} className="topVoteImg"/>
          <div className="rightPart">

            <div className="topCard">
              <span className="cardTitle"> {this.title} </span>
              <span className="cardSubtitle"> {this.subtitle} </span>
            </div>

            <div className="bottomCard">
              <div className="progressBar">
                <span className="progressTitle"> Unique Voters </span>
                <span className="progressCount"> {String(this.count) + "/" + String(this.targetCount)} </span>
                <div className="progressSection" style={{width: String(this.count/this.targetCount * 100) + "%"}}></div>
              </div>

              <div className="btnContainer">
                {this.options.map(opt => <div className="btn" key={this.title + opt}> <span className="btnText"> {opt} </span> </div>)}
              </div>
            </div>

          </div>
        </div>
    );
  }
}

export default Votecard;
