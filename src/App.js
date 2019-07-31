import React, { Component } from 'react';
import './App.css';
import routers from "./routes"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<Router><div>
      {
        routers.map((route,key)=>{
          if(route.exact){
            return (<Route key={key} exact path={route.path} component={route.component} ></Route>)
          }else{
            return (<Route key={key} path={route.path} component={route.component} ></Route>)
          }
        })
      }
    </div></Router>
    )
  }

}
export default App;
