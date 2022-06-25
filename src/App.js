import React, { Component } from "react";
import "./App.css";
import logo from "./assets/img/Logo.svg"
import bird from "./assets/img/bird.png"
import startvote from "./assets/img/startvote.svg"
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
    options: ["yes", "yes", "yes"]
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
    options: ["tom", "not", "tom"]
  },
]

class App extends Component {

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
      <div>
        <div className="navbar">
          <img src={logo} alt="Logo"/>
          <img src={startvote} alt="startvote"/>
        </div>

        <div className="content">
          <span className="devoted-to-dem"> Devoted to democracy. </span>
          <span className="subtitle"> Protect the power of your votes from being stolen by fake voters.</span>
          <img className="topButton" src={topButton} />
          <span className="trendingVote"> Trending Vote </span>

          <Votecard {...cardMockDatas[0]}/>

          <img src={page2} className="page2"/>

          <div className="page3">
            <div className="menu">
              <div className="menuItem">
                <span className="menuSelected"> Featured </span>
              </div>
              <div className="menuItem">
                <span className="menuUnselected"> Popular </span>
              </div>
              <div className="menuItem">
                <span className="menuUnselected"> Recent </span>
              </div>
              <div className="menuItem">
                <span className="menuUnselected"> Completed </span>
              </div>
            </div>

            {cardMockDatas.map(data => <Votecard {...data}/>)}

          </div>

        </div>


      </div>
    );
  }
}

export default App;
