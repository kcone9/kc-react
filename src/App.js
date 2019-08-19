import React, { Component } from 'react';
import './App.css';
import routers from "./routes"
import { HashRouter as Router, Route, Link } from "react-router-dom"
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      domain:"http://127.0.0.1:5050"
    }
  }
  render() {
    return (<Router><div>
      {
        routers.map((route,key)=>{
          if(route.exact){
            return (<Route key={key} exact path={route.path}  render={props=>(<route.component {...props} domain={this.state.domain} routes={route.routes}/>)}/>)
          }else{
            return (<Route key={key} path={route.path}  render={props=>(<route.component {...props} domain={this.state.domain} routes={route.routes}/>)}/>)
          }
        })
      }
    </div></Router>
    )
  }

}
export default App;
