import React,{Component} from "react"
import "../scss/search.scss"
import {Redirect} from "react-router-dom"
class Search extends React.Component {
    constructor(props){
        super(props)
        this.state={
            jump:false
        }
    }
    back=()=>{
        this.setState({jump:true})
    }
    render(){
        if(this.state.jump){
            return <Redirect to="/"/>
        }
        return (<div className="search_total">
            <div className="header">
                <img src="http://127.0.0.1:5050/house/icon/arr_left_gary.png" onClick={this.back}></img>
                <span>切换城市</span>
                <p></p>
            </div>
            <div className="city">
                <div className="title">
                    <span>热门城市</span>
                </div>
                <div className="content">
                    <p>三亚</p><p>海口</p><p>昆明</p><p>大理</p>
                    <p>三亚</p><p>海口</p><p>昆明</p><p>大理</p>
                </div>
            </div>
            <div className="city">
                <div className="title">
                    <span>海南</span>
                </div>
                <div className="content">
                    <p>海口</p><p>三亚</p><p>文昌</p><p>陵水</p>
                    <p>万宁</p><p>澄迈</p><p>临高</p><p>五指山</p>
                </div>
            </div>
            <div className="city">
                <div className="title">
                    <span>广西</span>
                </div>
                <div className="content">
                    <p>防城巷</p><p>北海</p><p>南宁</p><p>桂林</p>
                    <p>崇左</p><p>柳州</p><p>梧州</p><p>玉林</p>
                </div>
            </div>
        </div>)
    }
}
export default Search







