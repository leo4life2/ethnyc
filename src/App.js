import React from "react";
import "./App.css";
import logo from "./assets/img/Logo.svg"
import startvote from "./assets/img/startvote.svg"
import topButton from "./assets/img/topButton.svg"

function App(props) {
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
      </div>
      <span className="trendingVote"> Trending Vote </span>
      
    </div>
  );
}

export default App;
