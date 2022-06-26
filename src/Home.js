import React, { Component } from "react";
import "./Home.css";
import logo from "./assets/img/Logo.svg"
import icon from "./assets/img/icon.png"
import bird from "./assets/img/bird.png"
import createvote from "./assets/img/createvote.svg"
import unverified from "./assets/img/unverified.svg"
import topButton from "./assets/img/topButton.svg"
import page2 from "./assets/img/page2.svg"
import Votecard from "./Votecard"

const cardMockDatas = [
  {
    image: bird,
    title: "Vote for the protection of wildlife",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, at volutpat arcu, ut odio montes. Sed integer lobortis massa nisi, posuere.",
    count: 23541,
    targetCount: 30000,
    options: ["yes", "no", "maybe"]
  },
  {
    image: bird,
    title: "Vote for the protection of kingston",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, at volutpat arcu, ut odio montes. Sed integer lobortis massa nisi, posuere.",
    count: 321551,
    targetCount: 351551,
    options: ["yes", "maybe", "no"]
  },
  {
    image: bird,
    title: "Vote for the protection of kavin",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, at volutpat arcu, ut odio montes. Sed integer lobortis massa nisi, posuere.",
    count: 35132,
    targetCount: 45132,
    options: ["hi", "hello", "yes"]
  },
  {
    image: bird,
    title: "Vote for the protection of not tom",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, at volutpat arcu, ut odio montes. Sed integer lobortis massa nisi, posuere.",
    count: 31314,
    targetCount: 51314,
    options: ["tom", "not", "tomtoo"]
  },
]

class Home extends Component {

  constructor(props) {
    super(props);
    const {
      subtitle,
      text,
      title,
      voteForTheProtectionOfWildlife,
      loremIpsumDolorSi,
      spanText1,
      spanText2,
      yes,
      maybe,
      place,
    } = props;
    this.state = {};
  }

  render() {
    return (
      <div className="snapper">
        <div className="navbar">
          <div className="logoBox">
            {/* <img src={logo} alt="Logo"/> */}
            <img src={icon} className="icon"/>
          </div>
          <div className="topright">
            <img src={createvote} alt="createvote"/>
            <img src={unverified} alt="unverified"/>
          </div>
        </div>

        <div className="content">
          <span className="devoted-to-dem"> Devoted to democracy. </span>
          <span className="subtitle"> Protect the power of your votes from being stolen by fake voters.</span>
          <a href="#browse" id="back">
            <img className="topButton" src={topButton} />
          </a>

          <img src={page2} className="page2"/>

          <div className="page3">

            <a id="browse"></a>
            <div className="menu">
              <div className="menuItem">
                <span className="menuSelected"> Followed Ongoing Votes </span>
              </div>
            </div>

            {cardMockDatas.map(data => <Votecard key={data.title} {...data}/>)}

          </div>

        </div>


      </div>
    );
  }
}

export default Home;
