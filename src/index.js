import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const firstPageData = {
    subtitle: "Protect the power of your votes from being stolen by fake voters.",
    text: "Browse all votes",
    title: "Trending Vote",
    voteForTheProtectionOfWildlife: "Vote for the protection of wildlife",
    loremIpsumDolorSi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, at volutpat arcu, ut odio montes. Sed integer lobortis massa nisi, posuere.",
    spanText1: <React.Fragment>Progress<br /></React.Fragment>,
    spanText2: "18939/25000",
    yes: "Yes",
    maybe: "Maybe",
    place: "No",
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App {...firstPageData}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
