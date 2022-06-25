import React from "react";
import "./App.css";
import logo from "./assets/img/Logo.svg"
import startvote from "./assets/img/startvote.svg"
import topButton from "./assets/img/topButton.svg"
import bird from "./assets/img/bird.png"
import page2 from "./assets/img/page2.svg"

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
        <span className="trendingVote"> Trending Vote </span>

        <div className="voteCard">
          <img src={bird} className="topVoteImg"/>
          <div className="rightPart">

            <div className="topCard">
              <span className="cardTitle"> Vote for protection of wildlife </span>
              <span className="cardSubtitle">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, at volutpat arcu, ut odio montes. Sed integer lobortis massa nisi, posuere.
              </span>
            </div>

            <div className="bottomCard">
              <div className="progressBar">
                <span className="progressTitle"> Unique Voters </span>
                <span className="progressCount"> 25000 </span>
                <div className="progressSection"></div>
              </div>

              <div className="btnContainer">
                <div className="btn">
                  <span className="btnText"> 1 </span>
                </div>
                <div className="btn">
                  <span className="btnText"> 2 </span>
                </div>
                <div className="btn">
                  <span className="btnText"> 3 </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <img src={page2} className="page2"/>

      </div>


    </div>
  );
}

export default App;
