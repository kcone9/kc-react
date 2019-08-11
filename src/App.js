import React, { Component } from 'react';
import './App.css';
import routers from "./routes"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<Router><div >
      {
        routers.map((route,key)=>{
          if(route.exact){
            return (<Route key={key} exact path={route.path}  render={props=>(<route.component {...props} routes={route.routes}/>)}/>)
          }else{
            return (<Route key={key} path={route.path}  render={props=>(<route.component {...props} routes={route.routes}/>)}/>)
          }
        })
      }
    </div></Router>
    )
  }

}
export default App;
