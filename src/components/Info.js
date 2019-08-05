import React,{Component} from "react"
import "../scss/info.scss"
import {Route,Link,Redirect} from "react-router-dom"
import Footer from "./son/Footer"
class Info extends React.Component {
    constructor(props){
        super(props)
        this.state={
            domain:"http://cdn.lou86.com",
            jump:false
        }
    }
    back=()=>{
        // this.props.history.go(-1)
        this.setState({jump:true})
    }
    render(){
        if(this.state.jump){
            return <Redirect to="/detail"/>
        }
        return (<div className="Info_main">
            <div className="info_header" onClick={this.back}>
                <img src="http://127.0.0.1:5050/house/icon/arr_left_gary.png"></img>
                <span>楼盘详情</span>
                <img src="http://127.0.0.1:5050/house/icon/arr_aside_gray.png"></img>
            </div>
            <div className="info_nav">
                <div><Link to="/info/">楼盘主页</Link></div>
                <div><Link to="/info/type">户型详情</Link></div>
                <div><Link to="/info/mating">周边配套</Link></div>
                <div><Link to="/info/answer">楼盘问答</Link></div>
            </div>
            {
                this.props.routes.map((route,key)=>{
                    if(route.exact){
                        return (<Route key={key} exact component={route.component} path={route.path}></Route>)
                    }else{
                        return (<Route key={key} component={route.component} path={route.path}></Route>)
                    }
                })
            }
            <Footer></Footer>
        </div>)
    }
}
export default Info




