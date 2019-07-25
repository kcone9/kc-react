import React, { Component } from 'react';
import './App.css';
import Home from "./components/Home"
import House from "./components/House"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<Router><div>
      <Route exact path="/" component={Home}></Route>
      <Route path="/house" component={House}></Route>
      <Home />
      
    </div></Router>

    )
  }

}

export default App;
