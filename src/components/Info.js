import React,{Component} from "react"
import "../scss/info.scss"
import {Route,Link} from "react-router-dom"
import Main from "./son/info_house/Main"
import Mating from "./son/info_house/Mating"
import Type from "./son/info_house/Type"
import Answer from "./son/info_house/Answer"
class Info extends React.Component {
    constructor(props){
        super(props)
        this.state={
            domain:"http://cdn.lou86.com"
        }
    }
    render(){
        return (<div className="Info_main">
            <div className="info_header">
                <img src="http://127.0.0.1:5050/house/icon/arr_left_gary.png"></img>
                <span>楼盘详情</span>
                <img src="http://127.0.0.1:5050/house/icon/arr_aside_gray.png"></img>
            </div>
            <div className="info_nav">
                <div>楼盘主页</div>
                <div>户型详情</div>
                <div>周边配套</div>
                <div>楼盘问答</div>
            </div>
            <Route exact path="/info/" component={Main}></Route>
            <Route path="/info/type" component={Type}></Route>
            <Route path="/info/mating" component={Mating}></Route>
            <Route path="/info/answer" component={Answer}></Route>
        </div>)
    }
}
export default Info




