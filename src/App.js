import React, { Component } from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./Home"
import Create from "./Create"
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/create' element={<Create/>}></Route>
      </Routes>
    );
  }
}

export default App;
