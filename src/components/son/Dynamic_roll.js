import React, { Component } from "react"
import "../son_scss/footer.scss"
import axios from "axios"
import { Redirect } from "react-router-dom"
class Dynamic_roll extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roll: [], top: 0, topnum: 0, toptrans: "all 5s", jump: false,
            remind_active: false
        }
    }
    componentWillMount() {
        axios.get("http://127.0.0.1:5050/details/house_data?label=house_news").then(res => {
            this.setState({ roll: res.data.reg })
        })
    }
    componentDidMount() {
        this.margin()
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    margin() {
        setInterval(() => {
            var n = this.state.roll.length
            var topnum = this.state.topnum
            if (topnum == 0) {
                var top = -1 * 2.8
                topnum = topnum + 1
                this.setState({ toptrans: "all 2s" })
            } else if (topnum < n - 1) {
                topnum = topnum + 1
                var top = -(topnum) * 2.8
            } else if (topnum == n - 1) {
                var top = 0
                topnum = 0
                this.setState({ toptrans: "none" })
            }
            this.setState({ top: top, topnum: topnum })
        }, 5000)
    }
    go_article() {
        this.setState({ jump: true })
    }
    remind(boolean) {
        if(boolean){
            this.setState({ remind_active: true })
        }else{
            this.setState({ remind_active: false })
        }
        // console.log("tixong")
        
    }
    render() {
        if (this.state.jump) {
            return (<Redirect to="/article"></Redirect>)
        }
        return (<div className="dynamic_roll">
            <div className="cher">
                <div onClick={this.go_article.bind(this)}><img src="http://m.lou86.com/public/static/phone/image/icons/libs.png"></img>
                    <img src="http://m.lou86.com/public/static/phone/image/icons/libs-lp.png"></img></div>
                <div className="walk">
                    <ul style={{ marginTop: this.state.top + "rem", transition: this.state.toptrans }}>
                        {
                            this.state.roll.map((value, key) => {
                                return (<li key={key}>{value}</li>)
                            })
                        }
                    </ul>
                </div>
                <button onClick={this.remind.bind(this,true)}>提醒动态</button>
            </div>
            <div className={this.state.remind_active ? "alert alert_active" : "alert"}>
                <div className="container">
                    <div className="title"><p></p>
                        <p>动态提醒</p><img onClick={this.remind.bind(this,false)} src="http://m.lou86.com/public/static/phone/img/icons/close3.png"></img>
                    </div>
                    <div className="des">全面保护您的隐私，关注后第一时间获取户型/朝向/优惠政策等信息。</div>
                    <input className="phone"></input>
                    <div className="verify">
                        <input className="left"></input>
                        <div className="right">获取验证码</div>
                    </div>
                    <div className="deta">
                        <span className="one">我已阅读并同意</span><span className="two">《用户服务协议》</span>
                    </div>
                    <button>确定</button>
                    <div className="call">
                        <img src="http://m.lou86.com/public/static/phone/img/icons/tel3.png"></img>
                        <span> 直拨购房团</span></div>
                </div>
            </div>
        </div>)
    }
}
export default Dynamic_roll
